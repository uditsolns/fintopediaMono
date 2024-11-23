"use client";

import React from "react";
import { Button } from "reactstrap";
import { Card } from "reactstrap";
import styles from "../../my-courses/tabs/Tabs.module.css";
import { imageUrl } from "shared/src/config/imageUrl";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import Image from "next/image";
import { getCourses } from "shared/src/provider/store/services/courses.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";

const page = () => {
  const dispatch = useAppDispatch();

  const { courses, loading: courseLoading } = useAppSelector(
    (state) => state.courses
  );
  React.useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <div className={styles.certificateHeading}>Certifications</div>
      {courseLoading?.courses ? (
        <div className="d-flex justify-content-center p-5">
          <LoadingAtom />
        </div>
      ) : (
        <div>
          {courses.map((course) => {
            return (
              <Card className={styles.card}>
                <div className="grid md:grid-cols-2">
                  <div className={styles.left}>
                    <Image
                      src={`${imageUrl}/uploads/course_images/${course.course_image}`}
                      alt={course.name}
                      width={420}
                      height={220}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.right}>
                    <div className="space-y-2">
                      <h3 className={styles.title}>
                        Certification of Completion - {course.name}
                      </h3>
                    </div>
                    <div className={styles.certificateLink}>
                      Share through verifiable link
                    </div>
                    <div className={styles.certificateInput}>
                      <div className={styles.certificateInputText}>
                        stockmarketexpert/certificate
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1756_34534)">
                            <path
                              d="M7 10.167C7 9.45967 7.28099 8.78131 7.78115 8.28115C8.28131 7.78099 8.95967 7.5 9.667 7.5H18.333C18.6832 7.5 19.03 7.56898 19.3536 7.70301C19.6772 7.83704 19.9712 8.03349 20.2189 8.28115C20.4665 8.5288 20.663 8.82281 20.797 9.14638C20.931 9.46996 21 9.81676 21 10.167V18.833C21 19.1832 20.931 19.53 20.797 19.8536C20.663 20.1772 20.4665 20.4712 20.2189 20.7189C19.9712 20.9665 19.6772 21.163 19.3536 21.297C19.03 21.431 18.6832 21.5 18.333 21.5H9.667C9.31676 21.5 8.96996 21.431 8.64638 21.297C8.32281 21.163 8.0288 20.9665 7.78115 20.7189C7.53349 20.4712 7.33704 20.1772 7.20301 19.8536C7.06898 19.53 7 19.1832 7 18.833V10.167Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M4.012 17.237C3.70534 17.0622 3.45027 16.8095 3.27258 16.5045C3.09488 16.1995 3.00085 15.853 3 15.5V5.5C3 4.4 3.9 3.5 5 3.5H15C15.75 3.5 16.158 3.885 16.5 4.5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1756_34534">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <Button className={styles.continueButton}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_34540)">
                          <path
                            d="M4.61719 17.5V19.5C4.61719 20.0304 4.8279 20.5391 5.20297 20.9142C5.57805 21.2893 6.08675 21.5 6.61719 21.5H18.6172C19.1476 21.5 19.6563 21.2893 20.0314 20.9142C20.4065 20.5391 20.6172 20.0304 20.6172 19.5V17.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.61719 11.5L12.6172 16.5L17.6172 11.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.6172 4.5V16.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_34540">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.617188 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Download certificate
                      {/* <FaArrowRight className="ml-2 h-4 w-4" /> */}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default page;
