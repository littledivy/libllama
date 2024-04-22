import { Llama } from "../libllama.ts";
import process from "node:process";

const engine = new Llama({
  model: process.argv[2] || "llama-2-7b-chat.Q2_K.gguf",
});

const text = process.argv[3];

engine.predict(text, {
  tokenCallback: (token) => {
    process.stdout.write(token);
    return true;
  },
});
