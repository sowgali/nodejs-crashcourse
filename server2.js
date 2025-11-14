import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

const jsonMiddleWare = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

const getUserHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

const getUserByIdHandler = (req, res) => {
  const id = parseInt(req.url.split("/")[3]);
  const user = users.find((u) => u.id === id);
  if (user) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(user));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "User Not Found" }));
  }
  res.end();
};

const createUserHandler = (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(newUser));
      res.end();
    });
}

const notFoundHandler = (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message: "Not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleWare(req, res, () => {
      if (req.method === "GET" && req.url === "/api/users") {
        getUserHandler(req, res);
      } else if (req.method === "GET" && req.url.match(/^\/api\/users\/\d+$/)) {
        getUserByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
