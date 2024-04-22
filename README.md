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

## Building

Make sure to clone the repository with submodules and install prerequisites for building `llama.cpp`.

Build `deno-llama` using `cmake`:
```
mkdir build
cd build
cmake ..
make
```

Run the example:
```
deno run --allow-ffi example.ts ./models/llama-2-7b-chat.Q2_K.gguf "What is the meaning of life?"
```

## License

This project is licensed under the MIT License.

## Thanks

Thanks to the authors of `llama.cpp` and `go-llama`. A lot of the code in this repository is based on their work.
