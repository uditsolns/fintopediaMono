"use client";
import React from "react";
import * as Yup from "yup";
import styles from "../EnrollTabs.module.css";
import {
  Button,
  Col,
  InputGroup,
  Label,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaEllipsisV, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import {
  createCourseUploadFile,
  deleteCourseUploadFile,
} from "shared/src/provider/store/services/course-upload-file.service";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { TextField } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { formatDate, getFileSize } from "./Resources";
import { imageUrl } from "shared/src/config/imageUrl";
import Pagination from "@src/components/pagination/Pagination";
import { AiOutlineUpload } from "react-icons/ai";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [".pdf", ".docx", ".zip"];

const UploadProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const { upload_file, loading: upload_file_loading } = useAppSelector(
    (state) => state.courseUploadFile
  );
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null);

  // pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFiles = (
    upload_file.length > 0 ? upload_file : upload_file
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (upload_file.length > 0 ? upload_file.length : upload_file.length) /
      itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleViewPdf = (fileName) => {
    const fileUrl = `${imageUrl}/uploads/course_files_pdf/${fileName}`;
    window.open(fileUrl, "_blank");
  };
  const handleDelete = (id) => {
    dispatch(
      deleteCourseUploadFile({
        id,
        onSuccess(data) {
          console.log("data upload delete");
          toast.success("File Deleted Successfully!", {
            position: "top-right",
            theme: "light",
          });
        },
        onError(error) {},
      })
    );
  };

  // const handleSubmit = (values: any, { resetForm, setSubmitting }: any) => {
  //   let formData = new FormData();
  //   formData.append("user_id", auth?.user?.id.toString());
  //   formData.append("course_id", singleCourse?.id.toString());
  //   formData.append("upload_file", values.upload_file);

  //   dispatch(
  //     createCourseUploadFile({
  //       formData,
  //       onSuccess(data) {
  //         console.log("data");
  //         toast.success("File Uploaded Successfully!", {
  //           position: "top-right",
  //           theme: "light",
  //         });
  //         resetForm();

  //         setSubmitting(false);
  //       },
  //       onError(error) {
  //         setSubmitting(false);
  //       },
  //     })
  //   );
  // };
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
    <div className={styles.uploadProject}>
      <h1 className={styles.heading}>Upload Project</h1>
      <p className={styles.subHeading}>
        Upload your completed project in pdf or docx format. After submitting, a
        mentor will give feedback in 2-3 days.
      </p>
      <div className={styles.uploadForm}>
        {/* <Formik
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
                        required
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
                  <div className={styles.uploadButton}>
                    <button
                      type="submit"
                      // onClick={() => {
                      //   handleSubmit();
                      // }}
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
                    </button>
                  </div>
                </Row>
              </Form>
            );
          }}
        </Formik> */}
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
              {/* <AiOutlineUpload className={styles.icon} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M9.33333 21.3332C6.38781 21.3332 4 18.9454 4 15.9998C4 13.4571 5.77942 11.33 8.16094 10.7958C8.05559 10.3251 8 9.83563 8 9.33317C8 5.65127 10.9848 2.6665 14.6667 2.6665C17.8924 2.6665 20.5831 4.9575 21.2002 8.00114C21.2445 8.00027 21.2889 7.99984 21.3333 7.99984C25.0152 7.99984 28 10.9846 28 14.6665C28 17.8918 25.7097 20.5821 22.6667 21.1998M20 17.3332L16 13.3332M16 13.3332L12 17.3332M16 13.3332L16 29.3332"
                  stroke="#545F71"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className={styles.textSmall}>
                {formik.values.file ? (
                  formik.values.file.name
                ) : (
                  <>
                    <span>Drag or drop your files to upload, or &nbsp;</span>
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
              
            </div>
          </div>

          {formik.touched.file &&
            formik.errors.file &&
            typeof formik.errors.file === "string" && (
              <div className={styles.textError}>{formik.errors.file}</div>
            )}
          <div className={styles.uploadButton}>
            <button
              type="submit"
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
            </button>
          </div>
          <div className={styles.textExtraSmall}>File under 20 MB</div>
        </form>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Previously Uploaded Projects</h1>
        {currentFiles.length > 0 ? (
          <>
            <div className={styles.grid}>
              {currentFiles.map((file, index) => (
                <div key={index} className={styles.card}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          d="M12.0013 16H20.0013M12.0013 21.3333H20.0013M22.668 28H9.33464C7.86188 28 6.66797 26.8061 6.66797 25.3333V6.66667C6.66797 5.19391 7.86188 4 9.33464 4H16.7824C17.136 4 17.4751 4.14048 17.7252 4.39052L24.9441 11.6095C25.1942 11.8595 25.3346 12.1987 25.3346 12.5523V25.3333C25.3346 26.8061 24.1407 28 22.668 28Z"
                          stroke="#FCFCFC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <span className={styles.resourseBtn}>
                        {file.upload_file
                          ? typeof file.upload_file === "string"
                            ? file.upload_file.split(".").pop()?.toUpperCase()
                            : "UNKNOWN"
                          : "NO FILE UPLOADED"}
                      </span>
                    </div>
                    <Dropdown
                      isOpen={openDropdown === index}
                      toggle={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                    >
                      <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={openDropdown === index}
                        className={styles.dropdownButton}
                      >
                        <Button color="link" className="p-0">
                          <FaEllipsisV />
                        </Button>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem
                          className={styles.dropdownItem}
                          onClick={() => handleViewPdf(file.upload_file)}
                        >
                          <FaEye className="me-2" />
                          View
                        </DropdownItem>

                        <DropdownItem
                          className={styles.dropdownItem}
                          onClick={() => handleDelete(file.id)}
                        >
                          <FaTrashAlt className="me-2" />
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className={styles.cardTitle}>
                    {typeof file?.upload_file === "string"
                      ? file.upload_file.split("_").pop()
                      : "Unknown File"}
                  </div>
                  <p className={styles.cardDate}>
                    {formatDate(file.created_at)} •{" "}
                    {getFileSize(file.upload_file)}
                  </p>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p>No Files Available.</p>
        )}
      </div>
    </div>
  );
};

export default UploadProject;
