// otpless.d.ts
declare global {
  interface Window {
    OTPless: any; // `any` type can be replaced with a more specific type if needed
    OTPlessSignin: any;
  }
}

export {};
