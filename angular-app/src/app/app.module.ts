import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { GroupComponent } from './group/group.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    AdminComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
