import { Component } from '@angular/core';

import { ModalService } from './../modal.service';

@Component({
    selector: 'app-modal-content-2',
    templateUrl: './modal-content.component.html',
    styleUrls: ['./modal-content.component.less']
})
export class ModalContent2Component {

    constructor(private modalService: ModalService) { }

    public onClose() {
        this.modalService.clear();
    }

}
