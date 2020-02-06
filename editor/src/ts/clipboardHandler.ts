import { App } from "./app";
import { DiagramExtension } from "./DiagramExtension";

export class ClipboardHandler extends DiagramExtension {
    private app:App;
    constructor() { super(); }

    setup(app: App):void {
        this.app = app;
    }
   
    paste(event: ClipboardEvent):boolean {
        let clipData = event.clipboardData;
        for(let i = 0; i < clipData.types.length; i++) {
            let item = clipData.items[i];
            if(item.type.indexOf('image') >= 0) {
                let file = item.getAsFile();
                let source = window.URL.createObjectURL(file);
                this.doPaste(source);
                // event.preventDefault();
                // event.cancelBubble = true;
                return true;
            }
        }
    };

    public doPaste(source:string):void {
        var img = new Image();
        img.onload = x => {
            var width = img.width;
            var height = img.height;
            this.app.ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
        }
        img.src = source;
    }

}