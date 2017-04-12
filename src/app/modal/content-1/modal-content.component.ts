import { Component } from '@angular/core';

import { ModalService } from './../modal.service';

@Component({
    selector: 'modal-content',
    templateUrl: './modal-content.component.html',
    styleUrls: ['./modal-content.component.less']
})
export class ModalContentComponent1 {

    constructor(private modalService: ModalService) { }

    public onClose() {
        this.modalService.clear();
    }

}
