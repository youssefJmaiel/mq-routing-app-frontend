import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from '../../../../services/message-service.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss']
})
export class MessageDetailsComponent implements OnInit {
  message: any;

  constructor(
    public dialogRef: MatDialogRef<MessageDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const messageId = this.data.message.id;

    this.messageService.getMessageById(messageId).subscribe(
      (response: any) => {
        this.message = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du message:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
