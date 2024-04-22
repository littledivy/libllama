import { load, predict } from "./libllama_ffi.ts";
import type { ModelOptions, PredictOptions } from "./libllama_ffi.ts";

/** Llama context options */
export type LlamaOptions = ModelOptions & {
  /** Path to the model file */
  model: string;
};

export class Llama {
  model: Deno.PointerValue;

  /**
   * Initialize llama.cpp engine.
   *
   * ```ts
   * const llama = new Llama({
   *   model: "./models/llama-2-7b-chat.Q2_K.gguf",
   *   seed: -1,
   * });
   * ```
   */
  constructor(options: LlamaOptions) {
    this.model = load(options.model, options);
  }

  /**
   * Start completion prediction.
   *
   * ```ts
   * llama.predict("What is the meaning of life?", {
   *   tokenCallback: (token) => {
   *     console.log(token);
   *     return true;
   *   },
   * });
   * ```
   */
  predict(text: string, options?: PredictOptions) {
    predict(this.model, text, options);
  }
}

export type { ModelOptions, PredictOptions };
