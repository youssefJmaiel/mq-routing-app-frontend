import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../../../../services/message-service.service';
import { Message } from '../../../../model/message.model';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MessageDetailsComponent } from '../message-details/message-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageAddComponent } from '../message-add/message-add.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, HttpClientModule,MatCardModule,MatTableModule,MatButtonModule,MatCardTitle], 
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(
      (data) => {
        console.log('Messages reçus:', data);
        this.messages = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    );
  }
  
  openMessageDetails(message: any): void {
    this.dialog.open(MessageDetailsComponent, {
      width: '500px',
      data: { message: message } // Passe l'objet message au composant de détails
    });
  }
  openAddMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageAddComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Traitez le résultat après la fermeture du dialogue, comme ajouter le message à la liste
        this.messages.push(result);
      }
    });
  }
  loadMessages() {
    this.messageService.getMessages().subscribe(
      (response) => {
        this.messages = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des messages', error);
      }
    );
  }
  // Supprimer un message
  deleteMessage(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      this.messageService.deleteMessage(id).subscribe(
        (response) => {
          console.log('Message supprimé avec succès', response);
          this.loadMessages(); // Actualiser la liste après la suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du message', error);
        }
      );
    }
  }
  
}
