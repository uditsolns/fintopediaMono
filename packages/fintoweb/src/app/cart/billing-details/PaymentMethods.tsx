"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./BillingDetails.module.css";

type PaymentMethod = "upi" | "card" | "netbanking";

export default function PaymentMethods() {
  const [openMethod, setOpenMethod] = useState<PaymentMethod | null>("upi");

  const toggleMethod = (method: PaymentMethod) => {
    setOpenMethod(openMethod === method ? null : method);
  };

  return (
    <div className={styles.form}>
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
      <Formik
        initialValues={{ paymentMethod: "upi" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="space-y-2">
            <PaymentOption
              name="paymentMethod"
              value="upi"
              title="UPI"
              subtitle="Pay By Any UPI App"
              isOpen={openMethod === "upi"}
              isSelected={values.paymentMethod === "upi"}
              onClick={() => toggleMethod("upi")}
            >
              <p className="text-sm text-gray-400 mb-2">Choose one option</p>
              <div className="d-flex gap-2">
                <button type="button" className={styles.qrButton}>
                Scan QR Code
                </button>
                <button type="button" className={styles.upiButton}>
                  Enter UPI ID
                </button>
              </div>
            </PaymentOption>

            <PaymentOption
              name="paymentMethod"
              value="card"
              title="Credit/Debit Card"
              subtitle="Visa, Mastercard, Rupay And More"
              isOpen={openMethod === "card"}
              isSelected={values.paymentMethod === "card"}
              onClick={() => toggleMethod("card")}
            />

            <PaymentOption
              name="paymentMethod"
              value="netbanking"
              title="Net Banking"
              subtitle="Pay Through Your Favourite Bank"
              isOpen={openMethod === "netbanking"}
              isSelected={values.paymentMethod === "netbanking"}
              onClick={() => toggleMethod("netbanking")}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

type PaymentOptionProps = {
  name: string;
  value: string;
  title: string;
  subtitle: string;
  isOpen: boolean;
  isSelected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

function PaymentOption({
  name,
  value,
  title,
  subtitle,
  isOpen,
  isSelected,
  onClick,
  children,
}: PaymentOptionProps) {
  return (
    <div className={styles.paymentOption}>
      <div className={styles.optionHeader}>
        <label className={styles.radioContainer}>
          <Field
            type="radio"
            name={name}
            value={value}
            className={styles.radioInput}
          />
          <div
            className={`${styles.radioCircle} ${
              isSelected ? styles.radioSelected : styles.radioUnselected
            }`}
          />
          <div className={styles.optionTextContainer}>
            <h3 className={styles.optionTitle}>{title}</h3>
            <p className={styles.optionSubtitle}>{subtitle}</p>
          </div>
        </label>
        <button
          type="button"
          onClick={onClick}
          className={styles.chevronButton}
        >
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </button>
      </div>
      {isOpen && children && (
        <div className={styles.optionContent}>{children}</div>
      )}
    </div>
  );
}
