import { App } from "./app";
import { DiagramExtension } from "./DiagramExtension";

export class Point {
    public x:number;
    public y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}

export class Size {
    public width:number;
    public height:number;

    constructor(width:number, height:number) {
        this.width = width;
        this.height = height;
    }
}

export class Rect {
    public location:Point;
    public size:Size;

    constructor(x: number, y:number, width: number, height:number) {
        this.location = new Point(x, y);
        this.size = new Size(width, height);
    }

    public get x() { return this.location.x; }
    public get y() { return this.location.y; }
    public get width() { return this.size.width; }
    public get height() { return this.size.height; }
    public get right() { return this.x + this.width; }
    public get bottom() { return this.y + this.height; }
}

export class SelectionHandler extends DiagramExtension {
    private app:App;

    private isSelecting: Boolean = false;
    private mouseDownPoint:Point;
    private mouseMovePoint:Point;

    private currentSelectionRect:Rect;

    private remoteSelectionRect:Rect;

    private rect: Rect;

    constructor() { super(); }

    setup(app: App):void {
        this.app = app;
        // app.canvas2.addEventListener("mousedown", e => this.mousedown(e));
        // app.canvas2.addEventListener("mousemove", e => this.mousemove(e));
        // app.canvas2.addEventListener("mouseup", e => this.mouseup(e));

        this.app.comm.connection.on('selectionChanged', rectString => {
            let rect = JSON.parse(rectString);
            this.remoteSelect(
                new Rect(rect.location.x, rect.location.y, rect.size.width, rect.size.height))
        });
        this.app.comm.connection.on('selectionFinished', () => this.remoteSelectFinished());
    }

    invalidate(rect: Rect): void {
        if (!rect) return;
        this.app.ctx2.clearRect(rect.x, rect.y, rect.width, rect.height);
    }

    pointerdown(event:PointerEvent):boolean {
        // this.app.container.requestPointerLock();
        this.app.container.setPointerCapture(event.pointerId);
        this.isSelecting = true;
        this.mouseDownPoint = this.mouseMovePoint = new Point(event.x, event.y);
        return true;
    }

    public nextRect() {
        const x = Math.floor(Math.min(this.mouseDownPoint.x, this.mouseMovePoint.x));
        const y = Math.floor(Math.min(this.mouseDownPoint.y, this.mouseMovePoint.y));
        const width = Math.ceil(Math.max(this.mouseDownPoint.x, this.mouseMovePoint.x) - x);
        const height = Math.ceil(Math.max(this.mouseDownPoint.y, this.mouseMovePoint.y) - y);
        return new Rect(x, y, width, height);
    }

    public enclosingRect(r1:Rect, r2:Rect) {
        const x = Math.min(r1.x , r2.x);
        const y = Math.min(r1.y, r2.y);
        const width = Math.max(r1.right, r2.right);
        const height = Math.max(r1.bottom, r2.bottom);
        return new Rect(x, y, width, height);
    }

    public remoteSelect(r:Rect) {
        // your implementation here
    }

    public remoteSelectFinished() {
        // your implementation here
    }

    pointermove(event:PointerEvent):boolean {
        if(!this.isSelecting) return false;
        this.mouseMovePoint = new Point(event.x, event.y);
        const nextRect = this.nextRect();
        this.renderSelection(this.currentSelectionRect, nextRect, "#0000FF88");
        this.currentSelectionRect = nextRect;

        this.app.comm.sendMessage('selectionChanged', this.currentSelectionRect);
        return true;
    }

    private renderSelection(currentRect: Rect, nextRect: Rect, color:string) {
        const invalidRect = currentRect ? this.enclosingRect(nextRect, currentRect) : nextRect;
        this.invalidate(invalidRect);
        this.app.ctx2.fillStyle = color;
        this.app.ctx2.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
    }

    pointerup(event:PointerEvent):boolean {
        this.app.comm.sendMessage('selectionFinished');
        this.app.container.releasePointerCapture(event.pointerId);
        // document.exitPointerLock();
        this.isSelecting = false;
        this.invalidate(this.currentSelectionRect);
        return true;
    }
}