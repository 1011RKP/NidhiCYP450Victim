import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SelectcompoundComponent } from "./select-compound/select-compound.module";
import { DeleterecordComponent } from "./DeleteRecord/deleterecord.component";
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { OrderByPipe } from './customPipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectcompoundComponent,
    DeleterecordComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AppService, OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
