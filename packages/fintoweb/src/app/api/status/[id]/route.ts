import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";

export async function POST(req, res) {
  const data = await req.formData();
  console.log(data);
  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");

  // data
  const PHONEPE_MERCHANT_ID = "AURAHONLINEUAT";
  const PHONEPE_SALT_KEY = "c9170f9e-85bc-4055-8cec-812bf1b73f53";
  const PHONEPE_SALT_INDEX = 1;
  const PHONEPE_CALLBACK_URL = "http://127.0.0.1:8000/payment/response";
  const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/";

  const st = `/pg/v1/status/${merchantId}/${transactionId}` + PHONEPE_SALT_KEY;
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + PHONEPE_SALT_INDEX;
  console.log(checksum);

  // Using fetch instead of axios
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT STATUS
  try {
    const response = await fetch(
      `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch payment status");
    }

    const responseData = await response.json();
    console.log("r===", responseData.code);

    if (responseData.code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect("http://localhost:3000/success", {
        status: 301,
      });
    } else {
      return NextResponse.redirect("http://localhost:3000/failure", {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      });
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    return NextResponse.redirect("http://localhost:3000/failure", {
      status: 301,
    });
  }
}
