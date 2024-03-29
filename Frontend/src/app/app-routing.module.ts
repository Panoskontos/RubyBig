import { EventCreateComponent } from './event/event-create/event-create.component';
import { TicketViewComponent } from './ticket/ticket-view/ticket-view.component';
import { TicketIndexComponent } from './ticket/ticket-index/ticket-index.component';
import { LogoutComponent } from './logout/logout.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './theatre/view/view.component';
import { EventViewComponent } from './event/event-view/event-view.component';
import { CreateTheatreComponent } from './theatre/create-theatre/create-theatre.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"logout", component:LogoutComponent},
  { path: 'theatre/:theatreId/view', component: ViewComponent },
  { path: 'event/:eventId/view', component: EventViewComponent },
  {path: 'tickets/:eventId', component:TicketIndexComponent},
  { path: 'ticket/:ticketId/view', component: TicketViewComponent },
  { path: 'newEvent/:theatreId', component: EventCreateComponent },
  { path: 'new_theatre', component: CreateTheatreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
