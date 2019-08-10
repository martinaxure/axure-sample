# Axure Sample

Note: this sample works on macOS, Windows or Linux.

## Prerequisites

* .NET Core 2.2 SDK
* Node.js LTS

## Background

This sample has a ASP.NET Core 2.2-based backend in the `svc` folder and a HTML/Typescript frontend in the `editor` folder.

### Building and running the backend

From the command-line in the `svc` folder:

```bash
dotnet dev-certs https --trust
dotnet run -p svc
```

### Building and running the frontend

From the command-line in the `editor` folder:

```bash
npm install
npm run dev
```

## Questions

Please answer the following questions:

### Question 1

Visit http://localhost:8080/. When you mouse over the window there are javascript errors and the application isn't working. What needs to be done to fix it.

### Question 2

Open two browser tabs to http://localhost:8080/, provide an implementation of `remoteSelect` and `remoteSelectFinished` in `selectionHandler.ts` so selecting (mouse down and then move your mouse with the left mouse button still depressed) will render in both browser tabs. (See included file `axure-sample.mov` for a sample of what the completed application should do.)
