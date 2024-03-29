import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { IndexComponent } from './theatre/index/index.component';
import { ViewComponent } from './theatre/view/view.component';
import { EventIndexComponent } from './event/event-index/event-index.component';
import { EventViewComponent } from './event/event-view/event-view.component';
import { TicketIndexComponent } from './ticket/ticket-index/ticket-index.component';
import { TicketCreateComponent } from './ticket/ticket-create/ticket-create.component';
import { TicketViewComponent } from './ticket/ticket-view/ticket-view.component';
import { ModeComponent } from './mode/mode.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { CreateTheatreComponent } from './theatre/create-theatre/create-theatre.component';
import { TicketChartLayoutComponent } from './ticket/ticket-chart-layout/ticket-chart-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    LogoutComponent,
    IndexComponent,
    ViewComponent,
    EventIndexComponent,
    EventViewComponent,
    TicketIndexComponent,
    TicketCreateComponent,
    TicketViewComponent,
    ModeComponent,
    EventCreateComponent,
    CreateTheatreComponent,
    TicketChartLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('728210969097580')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// 728210969097580