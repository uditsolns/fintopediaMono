"use client";

import React from "react";
import styles from "./CategoryBanner.module.css";
import { Button, Col, InputGroup, Row } from "reactstrap";
import { ErrorMessage, Form, Field, Formik,FormikHelpers } from "formik";
import CustomSelect from "@src/custom/CustomSelect";

interface RegisterFormValues {
  college_id: string;
}
const CategoryBanner: React.FC = () => {
  const handleSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    const register = {
      college_id: values.college_id,
    };
    // dispatch(actions.postRegister(register, () => router.push('/login')));
    setSubmitting(false);
  };
  return (
    <div className={styles.CategoryBanner}>
      <div className={styles.mainRow}>
        <Row>
          <Col md={8}>
            <h1>Don’t know where to start?</h1>
            <p>
              Create screens directly in Method or add your images from Sketch
              or Figma. You can even sync designs from your cloud storage!
            </p>
          </Col>
          <Col md={4}>
            <Formik
              initialValues={{
                college_id: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="mt-3">
                  <Row className="form-group mt-3">
                    <Col md={12}>
                      <InputGroup>
                        <Field
                          component={CustomSelect}
                          name="college_id"
                          id="college_id"
                          className={`${styles.textfield} form-control ${
                            errors.college_id && touched.college_id
                              ? "is-invalid"
                              : ""
                          }`} 
                        >
                          <option>Select Category</option>
                        </Field>
                        <ErrorMessage
                          name="college_id"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col md={12}>
                      <Button
                        type="submit"
                        className="btn btn-light font-bold text-black"
                        size="md"
                        block
                        disabled={isSubmitting}
                      >
                        Let's go
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryBanner;
