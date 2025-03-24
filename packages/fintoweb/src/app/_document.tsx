import Document, { Html, Head, Main, NextScript } from "next/document";

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

          <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
