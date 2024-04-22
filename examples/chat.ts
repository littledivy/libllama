import { Llama } from "../libllama.ts";
import process from "node:process";

const engine = new Llama({
  model: process.argv[2] || "llama-2-7b-chat.Q2_K.gguf",
});

const opts = {
    tokenCallback: (token) => {
      process.stdout.write(token);
      return true;
    },
};

engine.predict("You are AI and I am human. I will ask you questions and you will answer them. human: Say hello. AI:", opts);

for(;;) {
  const text = prompt();
  if (!text || text === "exit") {
    break;
  }

  engine.predict(`human: ${text} AI:`, opts);
}

