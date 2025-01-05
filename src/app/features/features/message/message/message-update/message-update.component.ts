import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../../../../services/message-service.service';
import { Message } from '../../../../../model/message.model';

@Component({
  selector: 'app-message-update',
  templateUrl: './message-update.component.html',
  styleUrls: ['./message-update.component.css']
})
export class MessageUpdateComponent implements OnInit {
  messageForm!: FormGroup;
  messageId: number | null = null;  // id should be a number

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<MessageUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: Message }  // Inject data passed through dialog
  ) {}

  ngOnInit(): void {
    if (this.data?.message) {
      this.messageId = this.data.message.id;  // Set the message ID from the passed data
      this.messageForm = new FormGroup({
        sender: new FormControl(this.data.message.sender, Validators.required),
        receiver: new FormControl(this.data.message.receiver, Validators.required),
        timestamp: new FormControl(this.data.message.timestamp, Validators.required),
        processed: new FormControl(this.data.message.processed),
        content: new FormControl(this.data.message.content, Validators.required),
      });
    } else {
      console.error("Message data is missing");
    }
  }

  onSubmit(): void {
    if (this.messageForm.valid && this.messageId !== null) {
      const updatedMessage = { ...this.messageForm.value, id: this.messageId };

      this.messageService.updateMessage(this.messageId, updatedMessage).subscribe(
        response => {
          console.log('Message mis à jour avec succès', response);
          this.dialogRef.close(true); // Close dialog and return true to reload the message list
        },
        error => {
          console.error('Erreur lors de la mise à jour du message', error);
        }
      );
    } else {
      console.error("Formulaire invalide ou ID manquant");
    }
  }
}
