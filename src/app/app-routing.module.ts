import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // Set the default route to redirect to '/users'
  { path: '', redirectTo: '/users', pathMatch: 'full' },

  // Route for user details
  { path: 'user/:id', component: UserDetailsComponent },

  // Route for users list
  { path: 'users', component: UsersComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
