import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalPlaceholderComponent } from './placeholder/modal-placeholder.component';
import { ModalContent1Component } from './content-1/modal-content.component';
import { ModalContent2Component } from './content-2/modal-content.component';
import { ModalService } from './modal.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ModalPlaceholderComponent,
        ModalContent1Component,
        ModalContent2Component
    ],
    exports: [
        ModalPlaceholderComponent
    ],
    // anything loaded dynamically into the modal must be included in entryComponents
    entryComponents: [
        ModalContent1Component,
        ModalContent2Component
    ],
    providers: [ ModalService ]
})
export class ModalModule { }
