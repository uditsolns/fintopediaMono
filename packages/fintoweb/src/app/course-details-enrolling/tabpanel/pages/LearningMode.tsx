import React from "react";
import styles from "../EnrollTabs.module.css";
import { Button, Col, InputGroup, Row } from "reactstrap";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface MobileFormValues {
  mobileNumber: string;
}

const LearningMode: React.FC = () => {
  const handleSubmit = (
    values: MobileFormValues,
    { setSubmitting }: FormikHelpers<MobileFormValues>
  ) => {
    const mobileData = {
      mobileNumber: values.mobileNumber,
    };
    // dispatch(actions.postMobileNumber(mobileData, () => router.push('/thank-you')));
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  return (
    <div className={styles.LearningMode}>
      <Row>
        <Col md={6}>
          <div className={styles.scheduleTimer}>
            <h1 className={styles.LearningModeHeading}>Schedule Daily Timer</h1>
            <p className={styles.LearningModeSubHeading}>
              Set up push notifications or calendar events to stay on track for
              your learning goals.
            </p>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#121212"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add a learning reminder
            </button>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.mobileNotification}>
            <h1 className={styles.LearningModeHeading}>Mobile Notification</h1>
            <p className={styles.LearningModeSubHeading}>
              Receive learning reminders on your mobile device.
            </p>
            <div className="form">
              <Formik
                initialValues={{
                  mobileNumber: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="mt-3">
                    <Row className="form-group mt-3">
                      <Col md={12}>
                        <InputGroup>
                          <Field
                            type="text"
                            name="mobileNumber"
                            id="mobileNumber"
                            className={`${styles.textfield} form-control ${
                              errors.mobileNumber && touched.mobileNumber
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Enter your mobile number"
                          />
                          <ErrorMessage
                            name="mobileNumber"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={12} className="mt-2">
                        <Button
                          type="submit"
                          className={`btn btn-block ${styles.sendButton}`}
                          size="md"
                          disabled={isSubmitting}
                          block
                        >
                          Send
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
            <span className={styles.footerContent}>
            By providing your phone number, you agree to receive a one-time automated text message with a link to get app. Standard messaging rates may apply.
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LearningMode;
