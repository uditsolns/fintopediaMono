import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100;400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="../assets/Fintopedia logo-White.png" />
          {/* Swiper CSS */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Load OTPLESS SDK using the Script component */}
          {/* <Script
            id="otpless-sdk"
            src="https://otpless.com/v4/headless.js"
            data-appid="8TU4ZOYC6S9Q6VMC5LLF"
            strategy="beforeInteractive" // Ensures it loads before interactivity
            onLoad={() => console.log("OTPless script loaded")}
            onError={(e) => console.log("OTPless script load error:", e)}
          /> */}
          
        </body>
      </Html>
    );
  }
}

export default MyDocument;
