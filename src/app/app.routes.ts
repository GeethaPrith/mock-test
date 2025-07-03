import { Routes } from '@angular/router';
import { TestListComponent } from './test-list/test-list.component';
import { TestInstructionComponent } from './test-instruction/test-instruction.component';
import { TestLiveComponent } from './test-live/test-live.component';
import { TestResultComponent } from './test-result/test-result.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'test-list', pathMatch: 'full' },
  { path: 'test-list', component: TestListComponent },
  { path: 'test-instruction', component: TestInstructionComponent },
  { path: 'test-live/:id', component: TestLiveComponent },
  { path: 'test-result', component: TestResultComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'test-list' }
];