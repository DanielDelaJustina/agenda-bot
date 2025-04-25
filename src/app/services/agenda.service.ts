// src/app/services/agenda.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agenda } from '../models/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agendas: Agenda[] = [
    { id: 1, cliente: 'João', servico: 'Corte de cabelo', dataHora: new Date() },
    { id: 2, cliente: 'Maria', servico: 'Manicure', dataHora: new Date() },
    { id: 3, cliente: 'Pedro', servico: 'Barba', dataHora: new Date(new Date().setDate(new Date().getDate() + 1))  }
  ];

  getAgendas(): Observable<Agenda[]> {
    return of(this.agendas);
  }
}
