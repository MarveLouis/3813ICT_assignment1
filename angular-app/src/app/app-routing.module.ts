import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent} from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {path:'home', component:LoginComponent},
  {path:'', component:LoginComponent},
  {path:'chat', component:ChatComponent},
  {path:'admin', component:AdminComponent},
  {path:'group', component:GroupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
