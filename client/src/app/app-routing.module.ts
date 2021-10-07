import { BuyTicketComponent } from './features/tickets/buy-ticket/buy-ticket.component';
import { AdminAreaComponent } from './features/auth/admin-area/admin-area.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/errors/server-error/server-error.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserProfileComponent } from './features/auth/user-profile/user-profile.component';
import { EditMediaComponent } from './features/media/edit-media/edit-media.component';
import { DisplayMediaComponent } from './features/media/display-media/display-media.component';
const routes: Routes = [
  { path: '', component: DisplayMediaComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminArea/media/edit/:id', component: EditMediaComponent , canActivate: [AuthGuard]},
  { path: 'adminArea', component: AdminAreaComponent, canActivate: [AuthGuard] },
  { path: 'ticket/buy', component: BuyTicketComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: DisplayMediaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
