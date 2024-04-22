c2ffi_output.json:
	c2ffi/build/bin/c2ffi llama.cpp/llama.h > c2ffi_output.json

gen: c2ffi_output.json
	deno run -A generate_bindings.ts

build-llama:
		mkdir -p build && \
		cd build && \
		cmake .. && \
		make

clean:
	rm -f c2ffi_output.json
