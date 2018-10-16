import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DemoComponent } from './components/demo/demo.component'

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
