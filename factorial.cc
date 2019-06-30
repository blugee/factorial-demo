#include <node.h>

/*double factorial(double n) {
  if (n == 0)
    return 1;
  return n * factorial(n - 1);
}*/
using namespace std;
 
int multiply(int x,int a[],int size)
{
  int carry=0,i,p;
    
  for(i=0;i<size;++i)
  {
    p=a[i]*x+carry;
    a[i]=p%10;
    carry=p/10;
  }
    
  while(carry!=0)
  {
    a[size]=carry%10;
    carry=carry/10;
    size++;   
  }     
      return size;
}
int factorial(int n){
  int a[1000],i,size=1;
    a[0]=1;
 
    for(i=2;i<=n;++i) {
      size=multiply(i,a,size);        
    }
      
    // for(i=size-1;i>=0;--i)
    // {
    //   cout<<a[i];     
    // }
    return a;
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
