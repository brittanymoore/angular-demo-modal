import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ModalService } from './modal/modal.service';
import { ModalContentComponent1 } from './modal/content-1/modal-content.component';
import { ModalContentComponent2 } from './modal/content-2/modal-content.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
    encapsulation: ViewEncapsulation.None // apply styles globally
})
export class AppComponent {
    
    constructor(private modalService: ModalService) { }

    public openModal1() {
        this.modalService.create<ModalContentComponent1>(ModalContentComponent1, {});
    }

    public openModal2() {
        this.modalService.create<ModalContentComponent2>(ModalContentComponent2, {});
    }

}