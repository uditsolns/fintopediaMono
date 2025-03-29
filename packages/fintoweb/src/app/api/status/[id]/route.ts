import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import {
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX,
} from "shared/src/config/phonepeConfig";

export async function POST(req, res) {
  const data = await req.formData();
  console.log(data);
  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");

  const st = `/pg/v1/status/${merchantId}/${transactionId}` + PHONEPE_SALT_KEY;
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + PHONEPE_SALT_INDEX;
  console.log(checksum);

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
    console.log("responseData", responseData);

    console.log("r===", responseData.code);

    if (responseData.code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect("http://localhost:3000/success", {
        status: 301,
      });
    } else {
      return NextResponse.redirect("http://localhost:3000/failure", {
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
