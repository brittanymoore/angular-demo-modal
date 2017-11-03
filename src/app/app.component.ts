import { Component, ViewEncapsulation } from '@angular/core';

import { ModalService } from './modal/modal.service';
import { ModalContent1Component } from './modal/content-1/modal-content.component';
import { ModalContent2Component } from './modal/content-2/modal-content.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    constructor(private modalService: ModalService) { }

    public openModal1() {
        this.modalService.create<ModalContent1Component>(ModalContent1Component, {});
    }

    public openModal2() {
        this.modalService.create<ModalContent2Component>(ModalContent2Component, {});
    }

}
