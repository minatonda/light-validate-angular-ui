import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiLightValidateModule } from 'light-validate-angular-ui';
import { UserLightMapping } from 'src/light-validate/user.light-mapping';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    UiLightValidateModule.forRoot({
      resolver: {
        label: (exception) => {
          return `${exception.code} ${exception.property}`;
        }
      },
      mappings: [
        UserLightMapping
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
