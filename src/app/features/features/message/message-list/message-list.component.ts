import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../../../../services/message-service.service';
import { Message } from '../../../../model/message.model';
import { MessageDetailsComponent } from '../message-details/message-details.component';
import { MessageAddComponent } from '../message-add/message-add.component';
import { MessageUpdateComponent } from '../message/message-update/message-update.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCardTitle,
    RouterModule, // Add RouterModule here
  ],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService, public dialog: MatDialog) {}

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
      data: { message: message }, // Pass the message object to the details component
    });
  }

  openAddMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageAddComponent, { width: '500px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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

  deleteMessage(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      this.messageService.deleteMessage(id).subscribe(
        () => {
          console.log('Message supprimé avec succès');
          this.loadMessages(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Erreur lors de la suppression du message', error);
        }
      );
    }
  }

  openMessageUpdate(message: any): void {
    const dialogRef = this.dialog.open(MessageUpdateComponent, {
      width: '500px',
      data: { message: message }, // Pass the message to be updated
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMessages(); // Reload the list after update
      }
    });
  }
}
