import { App } from "./app";

export interface DiagramExtensionEventTypeMap {
    'paste' : ClipboardEvent;
    'pointerdown': PointerEvent;
    'pointermove' : PointerEvent;
    'pointerup': PointerEvent;
    'keydown' : KeyboardEvent
}

export abstract class DiagramExtension {
    abstract setup(app:App):void;

    // public apply<T extends keyof DiagramExtensionEventTypeMap>(eventName: T, event: DiagramExtensionEventTypeMap[T]): boolean {
    //     // need to switch to any here because casing of types like this is not supported.
    //     // var eventFn = <((DiagramExtensionEventTypeMap[T]) => boolean)>(this[eventName]);
    //     var eventFn = <any>this[eventName];
    //     return eventFn && eventFn(event);
    // }

    pointerdown?(event:DiagramExtensionEventTypeMap['pointerdown']):boolean;
    pointermove?(event:DiagramExtensionEventTypeMap['pointermove']):boolean;
    pointerup?(event:DiagramExtensionEventTypeMap['pointerup']):boolean;

    paste?(event: DiagramExtensionEventTypeMap['paste']): boolean;
    keydown?(event: DiagramExtensionEventTypeMap['keydown']): boolean;
}