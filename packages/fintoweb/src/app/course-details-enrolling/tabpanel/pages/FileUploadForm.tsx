"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineUpload } from "react-icons/ai";
import { Card, CardHeader, CardTitle, Button } from "reactstrap";
import styles from "./FileUploadForm.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { createCourseUploadFile } from "shared/src/provider/store/services/course-upload-file.service";
import { toast } from "react-toastify";
import LoadingAtom from "@src/components/loader/LoadingAtom";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
const ACCEPTED_FILE_TYPES = [".pdf", ".docx", ".zip"];

export default function FileUploadForm() {
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const { upload_file, loading: upload_file_loading } = useAppSelector(
    (state) => state.courseUploadFile
  );

  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("Please select a file")
        .test("fileSize", "File size must be less than 20MB", (value) => {
          if (!value) return true;
          return (value as File).size <= MAX_FILE_SIZE;
        })
        .test("fileType", "Unsupported file format", (value) => {
          if (!value) return true;
          const extension =
            "." + (value as File).name.split(".").pop()?.toLowerCase();
          return ACCEPTED_FILE_TYPES.includes(extension);
        }),
    }),
    // onSubmit: async (values) => {
    //   console.log("Uploading file:", values.file);
    // },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const formData = new FormData();
      formData.append("user_id", auth?.user?.id.toString());
      formData.append("course_id", singleCourse?.id.toString());
      if (values.file) {
        formData.append("upload_file", values.file);
      }
      dispatch(
        createCourseUploadFile({
          formData,
          onSuccess(data) {
            console.log("File upload successful", data);
            toast.success("File Uploaded Successfully!", {
              position: "top-right",
              theme: "light",
            });
            resetForm();
            setSubmitting(false);
          },
          onError(error) {
            console.error("Error uploading file", error);
            setSubmitting(false);
          },
        })
      );
    },
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    formik.setFieldValue("file", file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>Upload Project</CardTitle>
          <p className={styles.cardSubtitle}>
            Upload your completed project in pdf or docx format. After
            submitting, mentor will give feedback in 2-3 days
          </p>
        </CardHeader>
        <div className={styles.cardContent}>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`${styles.uploadBox} ${
                formik.touched.file && formik.errors.file
                  ? styles.uploadBoxError
                  : styles.uploadBoxDefault
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <AiOutlineUpload className={styles.icon} />
                <div className={styles.textSmall}>
                  {formik.values.file ? (
                    formik.values.file.name
                  ) : (
                    <>
                      Drag or drop your files to upload, or{" "}
                      <label
                        className={`${styles.browseLink} ${styles.browseLinkHover}`}
                      >
                        Browse
                        <input
                          type="file"
                          className="hidden"
                          accept={ACCEPTED_FILE_TYPES.join(",")}
                          onChange={(e) => {
                            if (e.currentTarget.files) {
                              formik.setFieldValue(
                                "file",
                                e.currentTarget.files[0]
                              );
                            }
                          }}
                        />
                      </label>
                    </>
                  )}
                </div>
                <div className={styles.textExtraSmall}>
                  Format: Pdf, Docx, Zip file
                </div>
                <div className={styles.textExtraSmall}>File under 20 MB</div>
              </div>
            </div>

            {formik.touched.file &&
              formik.errors.file &&
              typeof formik.errors.file === "string" && (
                <div className={styles.textError}>{formik.errors.file}</div>
              )}
            <Button
              type="submit"
              className={styles.uploadButton}
              disabled={!formik.values.file || !formik.isValid}
            >
              {upload_file_loading?.create ? (
                <LoadingAtom size="sm" color="dark" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M4.5 16L4.5 17C4.5 18.6569 5.84315 20 7.5 20L17.5 20C19.1569 20 20.5 18.6569 20.5 17L20.5 16M16.5 8L12.5 4M12.5 4L8.5 8M12.5 4L12.5 16"
                      stroke="#090A0B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Upload a file
                </>
              )}
            </Button> 
          </form>
        </div>
      </Card>
    </div>
  );
}
