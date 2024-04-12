import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { userResolver } from './resolvers/user.resolver';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'edit', component: UserFormComponent, resolve: { editUser: userResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
