# libllama

Run `llama.cpp` from Deno

```typescript
import { Llama } from "jsr:@divy/libllama";
import process from "node:process";

const engine = new Llama({
  model:  process.argv[2] || "llama-2-7b-chat.Q2_K.gguf",
});

const text = process.argv[3];
engine.predict(text);
```
