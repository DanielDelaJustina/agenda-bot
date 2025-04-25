import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSort } from '@angular/material/sort';
import { Agenda } from '../../../models/agenda';
import { AgendaService } from '../../../services/agenda.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
})
export class ListagemComponent implements OnInit {
  dataSource = new MatTableDataSource<Agenda>();
  displayedColumns: string[] = ['cliente', 'servico', 'dataHora'];
  isLoading = true;
  dataFiltro: Date = new Date();
  dataControl = new FormControl(new Date());

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    this.carregarAgendas();
  }

  carregarAgendas(): void {
    this.isLoading = true;
    this.agendaService.getAgendas().subscribe({
      next: (agendas) => {
        this.dataSource.data = agendas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.aplicarFiltroDataAtual()
        }, 100)
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar agendas:', error);
        this.isLoading = false;
      }
    });
  }

  
  aplicarFiltroDataAtual(): void {
    // Formata a data atual para DD/MM/YYYY
    const dia = this.dataFiltro.getDate().toString().padStart(2, '0');
    const mes = (this.dataFiltro.getMonth() + 1).toString().padStart(2, '0');
    const ano = this.dataFiltro.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    this.dataSource.filterPredicate = (data: Agenda, filter: string) => {
      // Formata a data do registro para comparação
      const dataAgenda = new Date(data.dataHora);
      const diaAgenda = dataAgenda.getDate().toString().padStart(2, '0');
      const mesAgenda = (dataAgenda.getMonth() + 1).toString().padStart(2, '0');
      const anoAgenda = dataAgenda.getFullYear();
      const dataAgendaFormatada = `${diaAgenda}/${mesAgenda}/${anoAgenda}`;
      
      return dataAgendaFormatada.includes(filter);
    };
    
    this.dataSource.filter = dataFormatada;
  }

  filtrarPorData(event: MatDatepickerInputEvent<Date>): void {
    if (!event.value) {
      this.dataSource.filter = '';
      return;
    }
    
    this.dataFiltro = event.value;
    this.aplicarFiltroDataAtual();
  }

  aplicarFiltroGeral(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarAgenda(agenda: Agenda): void {
    // Implemente a lógica de edição
    console.log('Editar:', agenda);
  }

  removerAgenda(agenda: Agenda): void {
    // Implemente a lógica de remoção
    console.log('Remover:', agenda);
  }
}