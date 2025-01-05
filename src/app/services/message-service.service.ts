import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:8080/api'; // Remplacez par l'URL réelle de votre API

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  }

  getMessageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/message/${id}`);
  }
  createMessage(message: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/message`, message);  // Envoi des données au back-end
  }
  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/message/${id}`);
  }
  // updateMessage(id: number, message: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/message/${id}`, message);
  // }
  updateMessage(id: number, message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/message/${id}`, message);
  }
}
