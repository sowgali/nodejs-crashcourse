// import fs from "fs";

import fs from "fs/promises";

// fs.readFile("./test.txt", "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// const data = fs.readFileSync("./test.txt", "utf-8");
// console.log(data);

// Promise - then()
// fs.readFile("./test.txt", "utf-8")
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.error(err);
// });

// readFile() - async/await
const readFile = async () => {
    try {
        const data = await fs.readFile("./test.txt", "utf-8");
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

// writeFile()
const writeFile = async () => {
    try {
        await fs.writeFile("./test.txt", "Hello World, I am writing to this file.");
    } catch (err) {
        console.error(err);
    }
}


const appendFile = async () => {
    try {
        await fs.appendFile("./test.txt", "\nThis is a appended text.");
        console.log("File appended successfully.");
    } catch (err) {
        console.error(err);
    }
}


writeFile();
appendFile();
readFile();