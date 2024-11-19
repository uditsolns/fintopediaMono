import React from "react";
import { Button } from "reactstrap";
import { Card } from "reactstrap";
import { Progress } from "reactstrap";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Tabs.module.css";
import { imageUrl } from "shared/src/config/imageUrl";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import Image from "next/image";

const Ongoing = (props) => {
  const { courses } = useAppSelector((state) => state.courses);
  console.log("courses", courses);

  return (
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
                    {course.name}
                  </h3>
                  <Progress value={10} className={styles.progress} />
                  <p className={styles.progressTitle}>10% complete</p>
                </div>
                <Button className={styles.continueButton}>
                  Continue learning
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Ongoing;
