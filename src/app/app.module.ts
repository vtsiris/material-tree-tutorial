import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MaterialModule } from './service/material-module';
import { AddNodeComponent, NewNodeDialog } from './theme/add-node/add-node.component';


@NgModule({
  entryComponents: [
    NewNodeDialog
  ],
  declarations: [
    AppComponent,
    AddNodeComponent,
    NewNodeDialog
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
