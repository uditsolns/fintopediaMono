import React from "react";
import styles from "../EnrollTabs.module.css";
import { Col, Row } from "reactstrap";
import { CourseUploadFileResponse } from "shared/src/utils/types/course-upload-file";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import { createCourseUploadFile } from "shared/src/provider/store/services/course-upload-file.service";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { useCourseNotesHelper } from "shared/src/components/structures/course-fileupload/courseFileupload.helper";
import { courseFileuploadField } from "shared/src/components/structures/course-fileupload/courseFileuploadModel";

const UploadProject = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const { courseNotesFormik, courseNotesInputProps } = useCourseNotesHelper();
  const { handleSubmit, setFieldValue, values, errors } = courseNotesFormik;
  console.log("values", values);
  console.log("errors", errors);

  const { upload_file, loading: upload_file_loading } = useAppSelector(
    (state) => state.courseUploadFile
  );

  const handleFileChange = (event) => {
    console.log("event", event.target.value);
    console.log("event files", event.target.files);
    const file = event.target.files[0];
    const data = {
      uri: "C:\fakepath\Relationship Final.pdf",
      type: file.type,
      name: file.name,
    };
    console.log("data---------", data);
    setFieldValue(courseFileuploadField.upload_file.name, file);
  };

  React.useEffect(() => {
    setFieldValue(courseFileuploadField.user_id.name, auth?.user?.id);
    setFieldValue(courseFileuploadField.course_id.name, singleCourse?.id);
  }, [auth, setFieldValue, singleCourse]);
  return (
    <>
      <div>
        <div className={styles.uploadProject}>
          <h1 className={styles.heading}>Upload Project</h1>
          <p className={styles.subHeading}>
            Upload your completed project in pdf or docx format. After
            submitting, mentor will give feedback in 2-3 days
          </p>
          <div className={styles.uploadForm}>
            <div className={styles.uploadFormText}>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Drag or drop your files to upload, or <a> Browse</a>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx,.zip"
                onChange={handleFileChange}
                // style={{ display: "none" }}
              />
              {/* <div style={{ display: "none" }}>
                <InputAtom
                  label="Upload Course Notes"
                  {...courseNotesInputProps("upload_file")}
                  type="file"
                />
              </div> */}
            </div>
            <div className={styles.fileFormat}>Format: Pdf, Docx, Zip file</div>
            <div className={styles.uploadButton}>
              <button
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
              >
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
              </button>
            </div>
            <div className={styles.fileSizeText}>
              <span>File under 20 MB</span>
            </div>
          </div>
        </div>
        <div className={styles.previousUploadProject}>
          <h1>Previously Uploaded Projects</h1>
          <Row className="mt">
            {/* Existing previously uploaded project structure */}
            {/* Add more project entries as needed */}
          </Row>
        </div>
      </div>
    </>
  );
};

export default UploadProject;
