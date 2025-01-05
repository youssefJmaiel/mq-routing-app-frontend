import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  messageId: string | null = null;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router // Injecting Router service
  ) {}

  ngOnInit(): void {
    // Retrieve the ID from the URL
    this.messageId = this.route.snapshot.paramMap.get('id');

    if (!this.messageId) {
      console.error("L'ID est manquant dans l'URL");
    } else {
      console.log("ID récupéré :", this.messageId);
      // Load message data here using the ID
      this.getMessageDetails(Number(this.messageId)); // Convert string to number
    }

    // Initialize the form
    this.messageForm = new FormGroup({
      sender: new FormControl('', Validators.required),
      receiver: new FormControl('', Validators.required),
      timestamp: new FormControl('', Validators.required),
      processed: new FormControl(false),
      content: new FormControl('', Validators.required),
    });
  }

  getMessageDetails(id: number): void {
    this.messageService.getMessageById(id).subscribe((message: Message) => {
      if (message) {
        this.messageForm.patchValue({
          sender: message.sender,
          receiver: message.receiver,
          timestamp: message.timestamp,
          processed: message.processed,
          content: message.content,
        });
      } else {
        console.error('Message non trouvé');
      }
    });
  }

  onSubmit(): void {
    if (this.messageForm.valid && this.messageId) {
      const updatedMessage = { ...this.messageForm.value, id: Number(this.messageId) };

      this.messageService.updateMessage(Number(this.messageId), updatedMessage).subscribe(
        response => {
          console.log('Message mis à jour avec succès', response);

          // Navigate to the message list after update
          this.router.navigate(['/messages']);
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
