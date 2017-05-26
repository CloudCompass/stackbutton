import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guards/auth.guard'; // For preventing un-authorized access to pages
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StatusBoardComponent } from '../status-board/status-board.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ListViewComponent } from '../list-view/list-view.component';
import { TabViewComponent } from '../tab-view/tab-view.component';
import {DownloadComponent} from '../download/download.component';
import { DefaultPageComponent } from '../default-page/default-page.component';
import { SplashPageComponent } from '../splash-page/splash-page.component';
import { InternalPageComponent } from '../internal-page/internal-page.component';

const appRoutes: Routes = [
  // Default page. TODO: Replace with page that simply checks for login token and directs from there
  { path: '', component: SplashPageComponent },
  { path: '**', redirectTo: '' },
  { path: 'download',
    component: DownloadComponent,
    pathMatch: 'full'
  },
  {
    path: 'splash-page',
    component: SplashPageComponent,
    children: [
      {
        path: 'download',
        component: DownloadComponent,
        outlet: 'splash'
      },
      {
        path: 'login',
        component: LoginComponent,
        outlet: 'splash'
      },
      {
        path: 'registration',
        component: RegistrationComponent,
        outlet: 'splash'
      },
    ]
  },
  {
    path: 'internal-page',
    component: InternalPageComponent
  },

  // { path: 'login', component: LoginComponent, outlet: 'jumbotron'},
  // // Application pages
  // { path: 'landing', component: SplashPageComponent},
  //
  // { path: 'empty-state', component: EmptyStateComponent, canActivate: [AuthGuard]},
  // { path: 'dashboard' , component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'status-board' , component: StatusBoardComponent, canActivate: [AuthGuard] },
  // { path: 'tab-view', component: TabViewComponent},
  // { path: 'list-view', component: ListViewComponent },

  // Redirect invalid paths to default page
];

export const routing = RouterModule.forRoot(appRoutes);
