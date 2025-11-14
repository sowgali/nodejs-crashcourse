import {EventEmitter} from "events";

const myEmitter = new EventEmitter();

const greetHandler = (name) => {
    console.log(`Hello, ${name}`);
}

const goodbyeHandler = (name) => {
    console.log(`Goodbye, ${name}`);
}

myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

myEmitter.emit("greet", "John");
myEmitter.emit("goodbye", "John");

myEmitter.on("error", (err) => {
    console.error(err);
});

myEmitter.emit("error", new Error("Something went wrong"));