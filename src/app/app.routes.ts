import { Routes } from "@angular/router";
import { MessageDetailsComponent } from "./features/features/message/message-details/message-details.component";
import { MessageListComponent } from "./features/features/message/message-list/message-list.component";
import { PartnerListComponent } from "./features/features/partner/partner-list/partner-list.component";
import { PartnerAddComponent } from "./features/features/partners/partner-add/partner-add.component";

export const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessageListComponent },
  { path: 'partners', component: PartnerListComponent },
  { path: 'message/:id', component: MessageDetailsComponent},
  { path: 'add-partner', component: PartnerAddComponent },
];
