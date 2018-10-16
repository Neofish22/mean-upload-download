import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module'

import { AdminComponent } from './components/admin/admin.component'
import { MediaComponent } from './components/media/media.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    MediaComponent
  ],
  providers: [
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
