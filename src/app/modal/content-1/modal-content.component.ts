import { Component } from '@angular/core';

import { ModalService } from './../modal.service';

@Component({
    selector: 'app-modal-content-1',
    templateUrl: './modal-content.component.html',
    styleUrls: ['./modal-content.component.less']
})
export class ModalContent1Component {

    constructor(private modalService: ModalService) { }

    public onClose() {
        this.modalService.clear();
    }

}
