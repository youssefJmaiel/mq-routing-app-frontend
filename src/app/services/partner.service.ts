import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = 'http://localhost:8080/api/partners';

  constructor(private http: HttpClient) {}

  getPartners(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPartnerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  addPartner(partner: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, partner);
  }
  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
