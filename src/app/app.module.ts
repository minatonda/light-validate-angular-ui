import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiLightValidateModule } from 'light-validate-angular-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    UiLightValidateModule.forRoot({
      label: (exception) => {
        return `${exception.code} ${exception.property}`;
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
