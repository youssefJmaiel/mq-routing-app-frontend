import { Component } from '@angular/core';
import { PartnerService } from '../../../../services/partner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent {
  
  partner = {
    alias: '',
    type: '',
    direction: '',
    application: '',
    processedFlowType: '',
    description: ''
  };

  constructor(private partnerService: PartnerService, private router: Router) {}

  addPartner(): void {
    this.partnerService.addPartner(this.partner).subscribe({
      next: (data) => {
        console.log('Partenaire ajouté avec succès:', data);
        this.router.navigate(['/partners']); // Redirige vers la liste des partenaires après ajout
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du partenaire:', err);
      }
    });
  }
}
