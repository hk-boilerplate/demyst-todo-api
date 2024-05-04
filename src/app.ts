import cors, { CorsOptions } from "cors";
import express, { Express } from "express";
import bodyParser from "body-parser";
import spec from "@hk-boilerplate/demyst-todo-spec/dist/spec";
import YAML from "yamljs";
import { summarise } from "swagger-routes-express";

export async function createServer(): Promise<Express> {
  // cors config
  const corsOption: CorsOptions = {
    origin: [/http:\/\/localhost:*/],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  // reading yaml file from private npm package - api contract
  const yamlSpecFile = require("path").resolve(
    __dirname,
    "../node_modules/@hk-boilerplate/demyst-todo-spec/dist/spec.yaml"
  );
  const apiDef = YAML.load(yamlSpecFile);
  console.log(apiDef);
  const apiSummary = summarise(spec);
  console.info(apiSummary);

  const server = await express();

  // setting up cors
  server.use(cors(corsOption));

  // setting up body parser
  server.use(bodyParser.json());

  return server;
}
