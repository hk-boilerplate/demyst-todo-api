import express, { Express } from "express";

export async function createServer(): Promise<Express> {
  const server = await express();
    return server;
}
