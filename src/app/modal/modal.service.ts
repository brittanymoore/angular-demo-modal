import { 
    Injectable, ViewContainerRef, Injector, Compiler, 
    ReflectiveInjector, ComponentRef, ComponentFactory, 
    ComponentFactoryResolver, Type 
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ModalService {

    private vcRef: ViewContainerRef;
    private modalRef: ComponentRef<any>[] = [];
    private activeInstances: number = 0;

    public activeInstances$: Subject<number> = new Subject();

    constructor(
        private compiler: Compiler, 
        private _resolver: ComponentFactoryResolver
    ) { }

    public registerViewContainerRef(vcRef: ViewContainerRef): void {
        if (this.vcRef) {
            // multiples doesn't break it, since the service will only keep the first view 
            // container it sees. But with the overlay it will look weird.
            console.warn(`Warning: Multiple instances of modal-placeholder detected. 
                This can cause unexpected behavior.`);
        } else {
            this.vcRef = vcRef;
        }
    }

    public clear() {
        this.vcRef.clear();
    }

    public create<T>(component: Type<{}>, parameters?: Object): Observable<ComponentRef<T>> {

        let componentRef$ = new ReplaySubject();

        // generate an instance of the provided component.
        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);    
        const factory = this._resolver.resolveComponentFactory(component);
        const componentRef: any = factory.create(injector);

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

        // broadcast and complete componentRef
        componentRef$.next(componentRef);
        componentRef$.complete();
        return <Observable<ComponentRef<T>>>componentRef$.asObservable();

    }

}