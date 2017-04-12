import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModalModule } from './modal/modal.module';

@NgModule({
    imports: [
        BrowserModule,
        ModalModule // this must be loaded in app module to get entryComponents
    ],
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }