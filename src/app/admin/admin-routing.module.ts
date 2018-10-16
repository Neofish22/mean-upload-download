import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminComponent } from './components/admin/admin.component'
import { MediaComponent } from './components/media/media.component'

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [],
    children: [
      {
        path: 'media',
        component: MediaComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
