import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [AppComponent, AComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeModule,
    CardModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
