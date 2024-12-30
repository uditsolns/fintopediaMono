import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import { SALT_INDEX, SALT_KEY } from "shared/src/components/atoms/Calculate";

export async function POST(req, res) {
  const data = await req.formData();
  console.log("form data",data);
  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("transactionId");

  const st = `/pg/v1/status/${merchantId}/${transactionId}` + SALT_KEY;
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + SALT_INDEX;
  console.log("checksum",checksum);

  const url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`;
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "X-VERIFY": checksum,
    "X-MERCHANT-ID": `${merchantId}`,
  };

  try {
    // Check payment status using fetch
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const responseData = await response.json();
    console.log("responseData======", responseData.code);

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
