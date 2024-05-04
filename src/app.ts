import cors, { CorsOptions } from "cors";
import express, { Express } from "express";
import bodyParser from "body-parser"

export async function createServer(): Promise<Express> {

  // cors config
  const corsOption: CorsOptions = {
    origin: [/http:\/\/localhost:*/],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  const server = await express();

  // setting up cors
  server.use(cors(corsOption));

  // setting up body parser
  server.use(bodyParser.json());
  
  return server;
}
