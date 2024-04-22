import { load, predict } from "./libllama_ffi.ts";
import type { ModelOptions, PredictOptions } from "./libllama_ffi.ts";

type LlamaOptions = ModelOptions & {
  model: string;
}

export class Llama {
  model: Deno.PointerValue;

  constructor(options: LlamaOptions) {
    this.model = load(options.model, options);
  }

  predict(text: string, options?: PredictOptions) {
    predict(this.model, text, options);
  }
}

