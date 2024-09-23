"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Label, Form, FormGroup, Row, Col } from "reactstrap";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import styles from "./OrderDetails.module.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string(),
  location: Yup.string(),
});

export default function OrderDetails() {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      address: "",
      location: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.container}>
      <Button className={styles.buttonGhost}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
        >
          <path
            d="M14.9046 2.19084C15.1494 2.43567 15.2869 2.76768 15.2869 3.11387C15.2869 3.46006 15.1494 3.79207 14.9046 4.0369L8.4421 10.4994L14.9046 16.9619C15.1424 17.2081 15.274 17.5379 15.271 17.8802C15.2681 18.2225 15.1308 18.55 14.8887 18.7921C14.6466 19.0341 14.3192 19.1714 13.9769 19.1744C13.6346 19.1774 13.3048 19.0458 13.0585 18.808L5.67302 11.4224C5.42827 11.1776 5.29077 10.8456 5.29077 10.4994C5.29077 10.1532 5.42827 9.8212 5.67302 9.57637L13.0585 2.19084C13.3034 1.94609 13.6354 1.80859 13.9816 1.80859C14.3278 1.80859 14.6598 1.94609 14.9046 2.19084Z"
            fill="#F3F4F7"
          />
        </svg>
      </Button>

      <div className={styles.steps}>
        <Button className={styles.orderButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12.0356" cy="12.0356" r="11.5356" fill="#76D651" />

            <foreignObject x="5" y="5" width="14" height="14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_1739_32155)">
                  <path
                    d="M3.42651 7.00857L5.98391 9.56597L11.0987 4.45117"
                    stroke="white"
                    stroke-width="1.53444"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1739_32155">
                    <rect
                      width="12.2755"
                      height="12.2755"
                      fill="white"
                      transform="translate(0.870605 0.871094)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </foreignObject>
          </svg>
          Order details
        </Button>

        <div className={styles.stepLine} />
        <Button className={styles.billingButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
          >
            <circle cx="15.0356" cy="15.0356" r="15.0356" fill="#2285DC" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="14px"
              fontFamily="Arial"
            >
              2
            </text>
          </svg>
          Billing
        </Button>
        <div className={styles.stepLine} />
        <Button className={styles.paymentButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
          >
            <circle cx="15.0356" cy="15.0356" r="15.0356" fill="#3F3F3F" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="14px"
              fontFamily="Arial"
            >
              3
            </text>
          </svg>
          Payment
        </Button>
      </div>

      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <h1 className={styles.heading}>Billing details</h1>
        <Row className="mt-4">
          <Col md={6}>
            <FormGroup className={styles.formGroup}>
              <Label for="name">Name*</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={styles.textField}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.errorMessage}>{formik.errors.name}</div>
              )}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup className={styles.formGroup}>
              <Label for="phoneNumber">Phone number*</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className={styles.textField}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className={styles.errorMessage}>
                  {formik.errors.phoneNumber}
                </div>
              )}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup className={styles.formGroup}>
              <Label for="address">Address (optional)</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className={styles.textField}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup className={styles.formGroup}>
              <Label for="location">Location (optional)</Label>
              <Input
                id="location"
                name="location"
                placeholder="Your location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                className={styles.textField}
              />
            </FormGroup>
          </Col>
        </Row>

        <div className={styles.note}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>
            Note: You need to fill all the optional details within 24 hours of
            checkout
          </span>
        </div>
      </Form>
      <hr />
      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <span className={styles.cartCount}>
            You have <b>2 items</b> in your cart
          </span>
          <div className="mt-2">
            <span className={styles.totalPrice}>₹ 6,000</span>
            <span className={styles.originalPrice}>₹ 8,000</span>
          </div>
        </div>
        <Button type="submit" className={styles.submitButton}>
          Pay now
        </Button>
      </div>
    </div>
  );
}
