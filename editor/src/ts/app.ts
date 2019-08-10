import { ClipboardHandler } from "./clipboardHandler";
import { SelectionHandler } from "./selectionHandler";
import { DiagramExtension, DiagramExtensionEventTypeMap } from "./DiagramExtension";
import { Comm } from "./comm";

declare var require: any;
require('../css/main.css');

export class App {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    
    canvas2: HTMLCanvasElement;
    ctx2: CanvasRenderingContext2D;

    comm: Comm;

	private height: number = window.innerHeight;
    private width: number = window.innerWidth;
    
    private plugins:DiagramExtension[] = [];
    // private plugins:Map<string, DiagramExtension>;

    constructor() {}

    setup(): void {
        let container = this.container = <HTMLElement>document.getElementById('container');
        const [width, height] = [container.offsetWidth, container.offsetHeight];
        
        const canvas = this.canvas = document.createElement('canvas');
        this.setCanvasProps(canvas, width, height);
        const canvas2 = this.canvas2 = document.createElement('canvas');
        this.setCanvasProps(canvas2, width, height);
        container.append(canvas, canvas2);

		this.ctx = canvas.getContext("2d");
		this.ctx2 = canvas2.getContext("2d");

        container.addEventListener('resize', x => {
            const [width, height] = [container.offsetWidth, container.offsetHeight];
            this.setCanvasProps(canvas, width, height);
            this.setCanvasProps(canvas2, width, height);
        });

        container.addEventListener('pointerdown', e => this.routeEvent('pointerdown', e));
        container.addEventListener('pointermove', e => this.routeEvent('pointermove', e));
        container.addEventListener('pointerup', e => this.routeEvent('pointerup', e));
        container.addEventListener('paste', e => this.routeEvent('paste', e));
        
        this.comm = new Comm();
        this.plugins.push(this.comm, new ClipboardHandler(), new SelectionHandler());
        for(const plugin of this.plugins) plugin.setup(this);

        this.initSignalR();
    }

    private initSignalR() {
    
    }

    private setCanvasProps(canvas: HTMLCanvasElement, width: number, height: number) {
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        canvas.width = width;
        canvas.height = height;
    }

    postEvent(callbackFn: (plugin: DiagramExtension) => boolean) {
        for(const plugin of this.plugins) {
            if(callbackFn(plugin)) return;
        }
    }

    routeEvent<T extends keyof DiagramExtensionEventTypeMap>(eventName: T, event: DiagramExtensionEventTypeMap[T]): boolean {
        for(const plugin of this.plugins) {
            var eventFn = plugin[eventName];
            if(eventFn && eventFn(<any>event)) return;
        }
    }
}

window.onload = () => {
    let app = new App();
    app.setup();
}