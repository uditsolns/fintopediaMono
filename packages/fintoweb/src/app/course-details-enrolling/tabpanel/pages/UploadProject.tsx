"use client";
import React from "react";
import styles from "../EnrollTabs.module.css";
import { Button, Col, InputGroup, Label, Row } from "reactstrap";
import { createCourseUploadFile } from "shared/src/provider/store/services/course-upload-file.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { createBanner } from "shared/src/provider/store/services/banner.service";

const UploadProject: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    // formData.append("user_id", "3");
    // formData.append("course_id", "6");
    formData.append("name", values.upload_file);

    dispatch(
      createBanner(
        formData
        // onSuccess: (data) => {
        //   console.log("File uploaded successfully", data);
        // },
        // onError: (error) => {
        //   console.error("File upload failed", error);
        //   try {
        //     const responseData = JSON.parse(error.response);
        //     console.log("Parsed response:", responseData);
        //   } catch (e) {
        //     console.error("Response is not in JSON format, raw response:", error.response);
        //   }
        // },
      )
    );
  };

  return (
    <div className={styles.uploadProject}>
      <h1 className={styles.heading}>Upload Project</h1>
      <p className={styles.subHeading}>
        Upload your completed project in pdf or docx format. After submitting, a
        mentor will give feedback in 2-3 days.
      </p>
      <div className={styles.uploadForm}>
        <Formik
          initialValues={{
            upload_file: "",
          }}
          onSubmit={handleSubmit}
        >
          {(formProps) => {
            return (
              <Form>
                <Row className="form-group pt-2">
                  <Col md={12}>
                    <Label for="upload_file">Upload File</Label>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="standard"
                        id="upload_file"
                        type="file"
                        name="upload_file"
                        inputProps={{ multiple: true }}
                        onChange={(e) => {
                          const fileInput = e.currentTarget as HTMLInputElement;
                          formProps.setFieldValue(
                            "upload_file",
                            fileInput.files?.[0]
                          );
                        }}
                        error={
                          formProps.touched.upload_file &&
                          Boolean(formProps.errors.upload_file)
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }} className="mt-3">
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={styles.previousUploadProject}>
        <h1>Previously Uploaded Projects</h1>
        <Row className="mt">
          <Col md={6} className="mt-3">
            <div className={styles.uploadFiles}>
              <h1 className={styles.uploadFilename}>Sample File.pdf</h1>
              <span className={styles.uploadFiletime}>
                Sat, Apr 20 . 7.5 MB
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UploadProject;
