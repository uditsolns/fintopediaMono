import { Progress } from "reactstrap";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button, Card } from "reactstrap";
import { imageUrl } from "shared/src/config/imageUrl";
import styles from "./MycoursesMolecule.module.css";
import { CoursesResponse } from "shared/src/utils/types/courses";
import { useRouter } from "next/navigation";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

interface OngoingMoleculeProps {
  course?: CoursesResponse;
  completionPercentage: number;
  onClick?: () => void;
  loading?: boolean;
}
const OngoingMolecule: React.FC<OngoingMoleculeProps> = ({
  course,
  completionPercentage,
  onClick,
  loading = false,
}) => {
  const router = useRouter();
  const { courseCart } = useAppSelector((state) => state.courseCart);

  const handleNavigation = async () => {
    if (course?.id) {
      await router.push(`/course-details-enrolling/${course.id}`);
    }
  };
  return (
    <Card className={styles.card}>
      <div className="grid md:grid-cols-2">
        <div className={styles.left} onClick={handleNavigation}>
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
            <h3 className={styles.title} onClick={handleNavigation}>
              {course.name}
            </h3>
            <Progress
              value={completionPercentage}
              className={styles.progress}
            />
            <p className={styles.progressTitle}>
              {completionPercentage}% complete
            </p>
          </div>
          <Button className={styles.continueButton} onClick={handleNavigation}>
            Continue learning
            <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OngoingMolecule;
