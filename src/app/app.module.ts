import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDetailsComponent } from './features/features/message/message-details/message-details.component';
import { PartnerListComponent } from './features/features/partner/partner-list/partner-list.component';
import { PartnerDetailsComponent } from './features/features/partner/partner-details/partner-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PartnerAddComponent } from './features/features/partners/partner-add/partner-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // MatInputModule for matInput
import { MessageAddComponent } from './features/features/message/message-add/message-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PartnerUpdateComponent } from './features/partner/partner-update/partner-update.component';
import { MessageUpdateComponent } from './features/features/message/message/message-update/message-update.component';
@NgModule({
  declarations: [
    AppComponent,
    MessageDetailsComponent,
    PartnerListComponent,
    PartnerDetailsComponent,
    PartnerAddComponent,
    MessageAddComponent,
    PartnerUpdateComponent,
    MessageUpdateComponent
     // Composant déclaré ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    RouterModule.forRoot(routes), // Configuration des routes
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    FormsModule, // Import FormsModule
    ReactiveFormsModule, // Import ReactiveFormsModule if using reactive forms
    MatInputModule, // Import MatInputModule
    MatFormFieldModule, // Import MatFormFieldModule
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
