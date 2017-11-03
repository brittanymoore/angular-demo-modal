import {
    Injectable, ViewContainerRef, Injector, ReflectiveInjector, ComponentFactoryResolver, Type, ComponentRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

    private vcRef: ViewContainerRef;
    private injector: Injector;
    private activeInstances: number = 0;

    public activeInstances$: Subject<number> = new Subject();
    public allowBackdropClose$: Subject<boolean> = new Subject();

    constructor(
        private resolver: ComponentFactoryResolver
    ) { }

    public registerViewContainerRef(vcRef: ViewContainerRef): void {
        if (this.vcRef) {
            // multiples doesn't break it, since the service will only keep the first view
            // container it sees. But with the overlay it will look weird.
            console.warn(`Warning: Multiple instances of modal-placeholder detected. ` +
                `This can cause unexpected behavior.`);
        } else {
            this.vcRef = vcRef;
            this.injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
        }
    }

    public clear() {
        this.vcRef.clear();
    }

    public create<T>(component: Type<{}>, parameters: Object, allowBackdropClose?: boolean): Observable<ComponentRef<T>> {

        if (allowBackdropClose === undefined || allowBackdropClose === null) {
            allowBackdropClose = true;
        }

        // broadcast new allow backdrop close value
        this.allowBackdropClose$.next(allowBackdropClose);

        // empty the container
        this.clear();

        const componentRef$ = new ReplaySubject();

        // generate an instance of the provided component.
        const factory = this.resolver.resolveComponentFactory(component);
        const componentRef: any = factory.create(this.injector);

        // insert the component into the view container and pass in parameters
        this.vcRef.insert(componentRef.hostView);
        Object.assign(componentRef.instance, parameters);

        // increment and broadcast active instances
        this.activeInstances++;
        this.activeInstances$.next(this.activeInstances);

        // set component index and onDestroy function to work with active instances.
        componentRef.instance['componentIndex'] = this.activeInstances;
        componentRef.onDestroy(() => {
            this.activeInstances--;
            this.activeInstances = Math.max(this.activeInstances, 0);
            this.activeInstances$.next(this.activeInstances);
        });

        return <Observable<ComponentRef<T>>>componentRef$.asObservable();

    }

}
