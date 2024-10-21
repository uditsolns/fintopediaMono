import React, { useState } from "react";
import styles from "../EnrollTabs.module.css";
import { Button, Col, InputGroup, Label, Row } from "reactstrap";
import { createCourseUploadFile } from "shared/src/provider/store/services/course-upload-file.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { TextField } from "@mui/material";
import { Form, Formik } from "formik";

// Define the custom FileData interface
interface FileData {
  uri: string;
  type: string;
  name: string;
}

const UploadProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse } = useAppSelector((state) => state.courses);
  // const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const data = {
  //       uri: URL.createObjectURL(file), // Creates a temporary URL for the file
  //       type: file.type,
  //       name: file.name,
  //     };
  //     setSelectedFile(data);
  //     setErrorMessage(null); // Clear any previous error messages
  //   } else {
  //     setErrorMessage("Please select a valid file.");
  //   }
  // };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("user_id", auth?.user?.is_active);
    formData.append("course_id", singleCourse?.id);
    formData.append("upload_file", values.upload_file);
    dispatch(
      createCourseUploadFile({
        formData,
        onSuccess: (data) => {
          console.log("File uploaded successfully", data);
        },
        onError: (error) => {
          console.error("File upload failed", error);
          try {
            const responseData = JSON.parse(error.response);
            console.log("Parsed response:", responseData);
          } catch (e) {
            console.error(
              "Response is not in JSON format, raw response:",
              error.response
            );
          }
        },
      })
    );
    return;
  };
  return (
    <>
      <div className={styles.uploadProject}>
        <h1 className={styles.heading}>Upload Project</h1>
        <p className={styles.subHeading}>
          Upload your completed project in pdf or docx format. After submitting,
          a mentor will give feedback in 2-3 days.
        </p>
        <div className={styles.uploadForm}>
          {/* <div className={styles.uploadFormText}>
            <input
              type="file"
              accept=".pdf,.docx,.zip"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <div className={styles.browseText}>
              Drag or drop your files to upload, or <span>Browse</span>
            </div>
          </div>
         
          <div className={styles.uploadButton}>
            <button onClick={handleSubmit}>Upload File</button>
          </div>
          <div className={styles.fileSizeText}>
            <span>File under 20 MB</span>
          </div> */}
          <Formik
            initialValues={{
              images: [],
            }}
            onSubmit={handleSubmit}
          >
            {(formProps) => {
              return (
                <Form>
                  <Row className="form-group pt-2">
                    <Col md={12}>
                      <Label for="upload_file">Upload Image</Label>
                      <InputGroup>
                        <TextField
                          fullWidth
                          variant="standard"
                          id="upload_file"
                          type="file"
                          name="upload_file"
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            formProps.setFieldValue(
                              "upload_file",
                              e.currentTarget.files[0]
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
      </div>
      {/* Previously Uploaded Projects */}
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
    </>
  );
};

export default UploadProject;
