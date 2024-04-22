const { symbols } = Deno.dlopen(
  "./build/llama-deno.so",
{
    load_model: {
      parameters: [
        /* const *char fname */ "buffer",
        /* int n_ctx */ "i32",
        /* int n_seed */ "i32",
        /* bool memory_f16 */ "bool",
        /* bool mlock */ "bool",
        /* bool embeddings */ "bool",
        /* bool mmap */ "bool",
        /* bool low_vram */ "bool",
        /* int n_gpu */ "i32",
        /* int n_batch */ "i32",
        /* const char *maingpu */ "buffer",
        /* const char *tensorsplit */ "buffer",
        /* bool numa */ "bool",
        /* float rope_freq_base */ "f32",
        /* float rope_freq_scale */ "f32",
        /* bool mul_mat_q */ "bool",
        /* const char *lora */ "buffer",
        /* const char *lora_base */ "buffer",
        /* bool perplexity */ "bool",
      ],
      /* void* */
      result: "pointer",
    },

    /* int load_state(void *ctx, char *statefile, char*modes); */
    load_state: {
      parameters: [
        /* void *ctx */ "pointer",
        /* const char *statefile */ "buffer",
        /* const char *modes */ "buffer",
      ],
      result: "i32",
    },

    /* int eval(void* params_ptr, void *ctx, char*text); */
    eval: {
      parameters: [
        /* void *params_ptr */ "pointer",
        /* void *ctx */ "pointer",
        /* const char *text */ "buffer",
      ],
      result: "i32",
    },

    /* void save_state(void *ctx, char *dst, char*modes); */
    save_state: {
      parameters: [
        /* void *ctx */ "pointer",
        /* const char *dst */ "buffer",
        /* const char *modes */ "buffer",
      ],
      result: "void",
    },

    /* int get_embeddings(void* params_ptr, void* state_pr, float * res_embeddings); */
    get_embeddings: {
      parameters: [
        /* void *params_ptr */ "pointer",
        /* void *state_ptr */ "pointer",
        /* float *res_embeddings */ "pointer",
      ],
      result: "i32",
    },

    /* int get_token_embeddings(void* params_ptr, void* state_pr,  int *tokens, int tokenSize, float * res_embeddings); */
    get_token_embeddings: {
      parameters: [
        /* void *params_ptr */ "pointer",
        /* void *state_ptr */ "pointer",
        /* int *tokens */ "pointer",
        /* int tokenSize */ "i32",
        /* float *res_embeddings */ "pointer",
      ],
      result: "i32",
    },

    /* void* llama_allocate_params(const char *prompt, int seed, int threads, int tokens,
     *                           int top_k, float top_p, float temp, float repeat_penalty,
     *                           int repeat_last_n, bool ignore_eos, bool memory_f16,
     *                           int n_batch, int n_keep, const char** antiprompt, int antiprompt_count,
     *                           float tfs_z, float typical_p, float frequency_penalty, float presence_penalty, int mirostat, float mirostat_eta, float mirostat_tau, bool penalize_nl, const char *logit_bias, const char *session_file, bool prompt_cache_all, bool mlock, bool mmap, const char *maingpu, const char *tensorsplit ,
     *                           bool prompt_cache_ro, const char *grammar, float rope_freq_base, float rope_freq_scale, float negative_prompt_scale, const char* negative_prompt,
     *                           int n_draft);
     *                           */
    llama_allocate_params: {
      parameters: [
        "buffer", // const char *prompt
        "i32", // int seed
        "i32", // int threads
        "i32", // int tokens
        "i32", // int top_k
        "f32", // float top_p
        "f32", // float temp
        "f32", // float repeat_penalty
        "i32", // int repeat_last_n
        "bool", // bool ignore_eos
        "bool", // bool memory_f16
          
        "i32", // int n_batch
        "i32", // int n_keep
        "buffer", // const char** antiprompt
        "i32", // int antiprompt_count
        "f32", // float tfs_z
        "f32", // float typical_p
        "f32", // float frequency_penalty
        "f32", // float presence_penalty
        "i32", // int mirostat
        "f32", // float mirostat_eta
        "f32", // float mirostat_tau
        "bool", // bool penalize_nl
        "buffer", // const char *logit_bias
        "buffer", // const char *session_file
        "bool", // bool prompt_cache_all
        "bool", // bool mlock
        "bool", // bool mmap
        "buffer", // const char *maingpu
        "buffer", // const char *tensorsplit
        "bool", // bool prompt_cache_ro
        "buffer", // const char *grammar
        "f32", // float rope_freq_base
        "f32", // float rope_freq_scale
        "f32", // float negative_prompt_scale
        "buffer", // const char* negative_prompt
        "i32", // int n_draft
      ],
      result: "pointer",
    },

    /* int speculative_sampling(void* params_ptr, void* target_model, void* draft_model, char* result, bool debug); */
    speculative_sampling: {
      parameters: [
        /* void* params_ptr */ "pointer",
        /* void* target_model */ "pointer",
        /* void* draft_model */ "pointer",
        /* char* result */ "buffer",
        /* bool debug */ "bool",
      ],
      result: "i32",
    },

    /* void llama_free_params(void* params_ptr); */
    llama_free_params: {
      parameters: [
        /* void* params_ptr */ "pointer",
      ],
      result: "void",
    },

    /* void llama_binding_free_model(void* state); */
    llama_binding_free_model: {
      parameters: [
        /* void* state */ "pointer",
      ],
      result: "void",
    },

    /* int llama_tokenize_string(void* params_ptr, void* state_pr, int* result); */
    llama_tokenize_string: {
      parameters: [
        /* void* params_ptr */ "pointer",
        /* void* state_pr */ "pointer",
        /* int* result */ "pointer",
      ],
      result: "i32",
    },

    /* int llama_predict(void* params_ptr, void* state_pr, char* result, bool debug); */
    llama_predict: {
      parameters: [
        /* void* params_ptr */ "pointer",
        /* void* state_pr */ "pointer",
        /* char* result */ "buffer",
        /* bool debug */ "bool",
      ],
      result: "i32",
    },
  }
);

export default symbols;
