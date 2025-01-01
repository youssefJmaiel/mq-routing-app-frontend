import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartnerService } from '../../../../services/partner.service';
import { PartnerDetailsComponent } from '../partner-details/partner-details.component';


@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
  partners: any[] = [];

  constructor(private dialog: MatDialog, private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.partners = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des partenaires:', err);
      }
    });
  }

  openPartnerDetails(partner: any): void {
    this.dialog.open(PartnerDetailsComponent, {
      width: '500px',
      data: { partner: partner }
    });
  }
  // deletePartner(id: number): void {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
  //     this.partnerService.deletePartner(id).subscribe(() => {
  //       this.loadPartners(); // Recharger la liste des partenaires après suppression
  //     });
  //   }
  // }
  deletePartner(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      this.partnerService.deletePartner(id).subscribe({
        next: () => {
          this.loadPartners(); // Recharger la liste des partenaires après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du partenaire:', err);
        }
      });
    }
  }
  
}
