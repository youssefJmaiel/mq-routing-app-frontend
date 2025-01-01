import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../../../../services/partner.service';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.scss']
})
export class PartnerDetailsComponent implements OnInit {
  partner: any;

  constructor(
    public dialogRef: MatDialogRef<PartnerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    if (this.data.partner) {
      this.partner = this.data.partner;
    } else if (this.data.id) {
      this.loadPartnerDetails(this.data.id);
    }
  }

  loadPartnerDetails(id: string): void {
    this.partnerService.getPartnerById(id).subscribe({
      next: (data) => {
        this.partner = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails du partenaire:', err);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
