cmake_minimum_required(VERSION 3.13)

project("llama-deno" C CXX)

if (MSVC)
  # add_compile_options(/EHsc)
else()
  add_compile_options(-fexceptions)
endif()

set(CMAKE_POSITION_INDEPENDENT_CODE ON)

add_subdirectory("llama.cpp")
include_directories("llama.cpp")
include_directories("./llama.cpp/common")

file(GLOB SOURCE_FILES "binding.cpp")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".so")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
target_link_libraries(${PROJECT_NAME} "llama")
target_link_libraries(${PROJECT_NAME} "common")

