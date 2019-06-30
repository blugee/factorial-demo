#include <node.h>
#include <string>

using namespace std;
#define MAX 500
int multiply(int x, int res[], int res_size);

// double factorial(double n) {
//   if (n == 0)
//     return 1;
//   return n * factorial(n - 1);
// }

void findfactorial(int n)
{
    int res[MAX];
    string mystring = '';

    res[0] = 1;
    int res_size = 1;

    for (int x=2; x<=n; x++)
    {
        res_size = multiply(x, res, res_size);
    }

    for (int i=res_size-1; i>=0; i--)
        mystring =mystring + res[i];

    return mystring;
}

int multiply(int x, int res[], int res_size)
{
    int carry = 0;

    for (int i=0; i<res_size; i++)
    {
        int prod = res[i] * x + carry;
        res[i] = prod % 10;  
        carry  = prod/10;    
    }

    while (carry)
    {
        res[res_size] = carry%10;
        carry = carry/10;
        res_size++;
    }
    return res_size;
}

void factorial(const v8::FunctionCallbackInfo<v8::Value>& info) {
  info
    .GetReturnValue()
    .Set(v8::String::New(
      info.GetIsolate(),
      findfactorial(info[0]->NumberValue())
    ));
}

void Init(v8::Local<v8::Object> exports) {
  NODE_SET_METHOD(exports, "factorial", factorial);
}

NODE_MODULE(addon, Init)
