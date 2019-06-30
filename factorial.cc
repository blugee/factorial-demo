#include <node.h>

double factorial(long long int n) {
  if (n == 0)
    return 1;
  return n * factorial(n - 1);
}

void factorial(const v8::FunctionCallbackInfo<v8::Value>& info) {
  info
    .GetReturnValue()
    .Set(v8::Number::New(
      info.GetIsolate(),
      factorial(info[0]->NumberValue())
    ));
}

void Init(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "factorial", factorial);
}

NODE_MODULE(addon, Init)
