import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalPlaceholderComponent } from './placeholder/modal-placeholder.component';
import { ModalContentComponent1 } from './content-1/modal-content.component';
import { ModalContentComponent2 } from './content-2/modal-content.component';
import { ModalService } from './modal.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        ModalPlaceholderComponent,
        ModalContentComponent1,
        ModalContentComponent2
    ],
    exports: [
        ModalPlaceholderComponent
    ],
    // anything loaded dynamically into the modal must be included in entryComponents
    entryComponents: [
        ModalContentComponent1,
        ModalContentComponent2
    ],
    providers: [ ModalService ]
})
export class ModalModule { }