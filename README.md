# Axure Sample

Note: this sample works on macOS, Windows or Linux.

## Prerequisites

* .NET Core 3.1 SDK
* Node.js LTS

## Background

This sample has a ASP.NET Core 2.2-based backend in the `svc` folder and a HTML/Typescript frontend in the `editor` folder.

### Building and running the backend

From the command-line:

```bash
dotnet dev-certs https --trust
dotnet run -p svc
```

If you're already in the `svc` folder, you only need to run `dotnet run`.

### Building and running the frontend

From the command-line in the `editor` folder:

```bash
npm install
npm run dev
```

## Questions

Please answer the following questions:

### Question 1

Open two browser tabs to http://localhost:8080/, provide an implementation of `remoteSelect` and `remoteSelectFinished` in `selectionHandler.ts` so selecting (mouse down and then move your mouse with the left mouse button still depressed) will render in both browser tabs. (See included file `axure-sample.mov` for a sample of what the completed application should do.)

### Question 2

If you copy an image to your clipboard and type `Ctrl-V/⌘V` to paste, that image will appear on the canvas. Implement an event handler on `clipboardHandler.ts` so when you press the "delete" key, the pasted image is removed from the canvas. Use the capabilities of `DiagramExtension` (which `selectionHandler` implements) to set up the event handler.