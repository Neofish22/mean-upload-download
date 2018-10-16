import { NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './components/app/app.component';
import { DemoComponent } from './components/demo/demo.component'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    Title
  ],
  declarations: [
    AppComponent,
    DemoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
