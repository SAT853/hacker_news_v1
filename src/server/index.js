import express from "express";
import cors from "cors";
import exphs from "express-handlebars";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "../client/App";
const app = express();

// Body Prase Middeleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Handlebars Middleware
app.engine("handlebars", exphs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set static Folder
app.use(express.static("build/public"));

app.get("*", (req, res) => {
  // This context object contains the results of the render
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  res.render("index", {
    html,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
