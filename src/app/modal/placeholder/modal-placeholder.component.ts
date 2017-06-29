import { Component, OnInit, ViewChild, ViewContainerRef, Injector, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from './../modal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'modal-placeholder',
    templateUrl: './modal-placeholder.component.html',
    styleUrls: ['./modal-placeholder.component.less'],
    animations: [
        trigger('toggleState', [
            state('active', style({ zIndex: 100 })),
            state('inactive', style({ zIndex: -1 })),
            transition('active => inactive', animate('0ms 400ms')),
            transition('inactive => active', animate('0s'))
        ])
    ],
    encapsulation: ViewEncapsulation.None // apply styles globally
})
export class ModalPlaceholderComponent implements OnInit, OnDestroy {

    private contentSubscription: Subscription;
    private allowBackdropCloseSubscription: Subscription;
    public modalActive: boolean = false;
    public allowBackdropClose: boolean = true;
    public modalState: string = 'inactive';

    @ViewChild('modalplaceholder', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    constructor(
        private modalService: ModalService,
        private injector: Injector
    ) {}

    private closeModal(): void {
        this.modalService.clear();
    }

    public onOverlayClick(): void {
        if (this.allowBackdropClose) {
            this.closeModal();
        }
    }

    public onClose(event: Event): void {
        this.closeModal();
    }

    public onContentClick(event: Event): void {
        event.stopPropagation();
    }

    public ngOnInit(): void {

        this.modalService.registerViewContainerRef(this.viewContainerRef);

        this.contentSubscription = this.modalService.activeInstances$.subscribe(
            (instances: number) => {
                this.modalActive = instances > 0;
                if (this.modalActive) {
                    this.modalState = 'active';
                    document.body.classList.add('modal-active');
                } else {
                    this.modalState = 'inactive';
                    document.body.classList.remove('modal-active');
                }
            }
        );

        this.allowBackdropCloseSubscription = this.modalService.allowBackdropClose$.subscribe(
            (allowBackdropClose: boolean) => {
                this.allowBackdropClose = allowBackdropClose;
            }
        );

    }

    public ngOnDestroy(): void {
        this.contentSubscription.unsubscribe();
        this.allowBackdropCloseSubscription.unsubscribe();
    }

}
