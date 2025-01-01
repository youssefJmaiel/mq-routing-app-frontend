import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../../services/message-service.service';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.css']
})
export class MessageAddComponent {
  messageForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.messageForm = this.fb.group({
      sender: ['', Validators.required],
      receiver: ['', Validators.required],
      content: ['', Validators.required],
      timestamp: ['', Validators.required],
      processed: [false]
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const message = this.messageForm.value;
      message.timestamp = new Date(message.timestamp).toISOString(); // Format ISO 8601
      this.messageService.createMessage(message).subscribe(
        (response) => {
          console.log('Message added successfully', response);
          window.location.reload(); // Recharger la page
        },
        (error) => {
          console.error('Error adding message', error);
        }
      );
    }
  }
}
