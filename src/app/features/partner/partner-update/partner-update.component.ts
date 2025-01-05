import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../../../services/partner.service';

@Component({
  selector: 'app-partner-update',
  templateUrl: './partner-update.component.html',
  styleUrls: ['./partner-update.component.scss']
})
export class PartnerUpdateComponent implements OnInit {
  partnerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private partnerService: PartnerService,
    private dialogRef: MatDialogRef<PartnerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.partnerForm = this.fb.group({
      alias: [data.partner?.alias || '', Validators.required],
      type: [data.partner?.PartnerType || '', Validators.required],
      direction: [data.partner?.direction || '', Validators.required],
      application: [data.partner?.application || '', Validators.required],
      processedFlowType: [data.partner?.processedFlowType || '', Validators.required],
      description: [data.partner?.description || '']
    });
  }

  ngOnInit(): void {}

  updatePartner(): void {
    if (this.partnerForm.valid) {
      this.partnerService.updatePartner(this.data.partner.id, this.partnerForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error updating partner:', err)
      });
    }
    console.log(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
