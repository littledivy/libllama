import C from "./libllama.ts";

const enc = new TextEncoder();
const cstr = (str: string) => enc.encode(`${str}\0`);

type ModelOptions = {
  contextSize: number;
  seed: number;
  nBatch: number;
  f16Memory: boolean;
  mlock: boolean;
  mmap: boolean;
  lowVram: boolean;
  embeddings: boolean;
  numa: boolean;
  nGpuLayers: number;
  mainGpu: string;
  tensorSplit: string;
  ropeFreqBase: number;
  ropeFreqScale: number;
  mulMatQ: boolean;
  loraBase: string;
  loraAdapter: string;
  perplexity: boolean;
}

const defaultOptions: ModelOptions = {
  contextSize: 128,
  seed: 0,
  nBatch: 512,
  f16Memory: true,
  mlock: false,
  mmap: true,
  lowVram: false,
  embeddings: true,
  numa: false,
  nGpuLayers: 0,
  mainGpu: "",
  tensorSplit: "",
  ropeFreqBase: 10000,
  ropeFreqScale: 1.0,
  mulMatQ: true,
  loraBase: "",
  loraAdapter: "",
  perplexity: false,
}

function load(modal: string, options?: ModelOptions) {
  const modelPath = cstr(modal);
  const opts = {
    ...defaultOptions,
    ...options,
  };
  
  const result = C.load_model(
    modelPath,
    opts.contextSize,
    opts.seed,
    opts.f16Memory,
    opts.mlock,
    opts.embeddings,
    opts.mmap,
    opts.lowVram,
    opts.nGpuLayers,
    opts.nBatch,
    cstr(opts.mainGpu),
    cstr(opts.tensorSplit),
    opts.numa,
    opts.ropeFreqBase,
    opts.ropeFreqScale,
    opts.mulMatQ,
    cstr(opts.loraBase),
    cstr(opts.loraAdapter),
    opts.perplexity,
  );

  return result;
}

type PredictOptions = {
  seed: number;
  threads: number;
  tokens: number;
  topK: number;
  repeat: number;
  batch: number;
  nKeep: number;
  topP: number;
  temperature: number;
  penalty: number;
  nDraft: number;
  f16Kv: boolean;
  debugMode: boolean;
  stopPrompts: string[];
  ignoreEos: boolean;

  tailFreeSamplingZ: number;
  typicalP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  microstat: number;
  microstatETA: number;
  microstatTAU: number;
  penalizeNL: boolean;
  logitBias: string;
  tokenCallback: (token: string) => boolean;

  pathPromptCache: string;
  mlock: boolean;
  mmap: boolean;
  promptCacheAll: boolean;
  promptCacheRO: boolean;
  grammar: string;
  mainGpu: string;
  tensorSplit: string;

  ropeFreqBase: number;
  ropeFreqScale: number;

  negativePromptScale: number;
  negativePrompt: string;
}

const defaultPredictOptions: PredictOptions = {
  seed: -1,
  threads: 8,
  tokens: 512,
  topK: 90,
  topP: 0.86,
  penalty: 1.1,
  repeat: 64,
  ignoreEos: false,
  f16Kv: false,
  batch: 512,
  nKeep: 64,
  tailFreeSamplingZ: 1.0,
  typicalP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  microstat: 0,
  microstatETA: 0.1,
  microstatTAU: 5.0,
  penalizeNL: false,
  logitBias: "",
  temperature: 0.8,

  nDraft: 0,
  debugMode: false,
  stopPrompts: [],

  tokenCallback: (_) => true,

  pathPromptCache: "",
  mlock: false,
  mmap: true,
  promptCacheAll: false,
  promptCacheRO: false,
  grammar: "",
  mainGpu: "",
  tensorSplit: "",

  ropeFreqBase: 10000,
  ropeFreqScale: 1.0,

  negativePromptScale: 0.0,
  negativePrompt: "",
}

function predict(text: string, predictOptions?: PredictOptions) {
  const prompt = cstr(text);
  const opts = {
    ...defaultPredictOptions,
    ...predictOptions,
  };

  const pass = Deno.UnsafePointer.value(Deno.UnsafePointer.of(cstr("human:")));
  const passPtr = new BigInt64Array([BigInt(pass)]);

  const params = C.llama_allocate_params(
    prompt,
    opts.seed,
    opts.threads,
    opts.tokens,
    opts.topK,
    opts.topP,
    opts.temperature,
    opts.penalty,
    opts.repeat,
    opts.ignoreEos,
    opts.f16Kv,
    opts.batch,
    opts.nKeep,
    passPtr,
    1,
    opts.tailFreeSamplingZ,
    opts.typicalP,
    opts.frequencyPenalty,
    opts.presencePenalty,
    opts.microstat,
    opts.microstatETA,
    opts.microstatTAU,
    opts.penalizeNL,
    cstr(opts.logitBias),
    cstr(opts.pathPromptCache),
    opts.promptCacheAll,
    opts.mlock,
    opts.mmap,
    cstr(opts.mainGpu),
    cstr(opts.tensorSplit),
    opts.promptCacheRO,
    cstr(opts.grammar),
    opts.ropeFreqBase,
    opts.ropeFreqScale,
    opts.negativePromptScale,
    cstr(opts.negativePrompt),
    opts.nDraft,
  );

  const out = new Uint8Array(opts.tokens || 99999999);
  const result = C.llama_predict(
    params,
    model,
    out,
    opts.debugMode,
  );

  if (result != 0) {
    console.error("Prediction failed");
    return;
  }

  const decoder = new TextDecoder();
  const output = decoder.decode(out);

  C.llama_free_params(params);

  return output;
}

const model = load(Deno.args[0]);
const text = Deno.args[1];

predict(text);

