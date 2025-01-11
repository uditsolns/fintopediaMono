"use client";

import React from "react";
import styles from "./Notifications.module.css";
import { useRouter } from "next/navigation";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { getNotifications } from "shared/src/provider/store/services/notifications.service";
import LoadingAtom from "@src/components/loader/LoadingAtom";
import Image from "next/image";
import { imageUrl } from "shared/src/config/imageUrl";

const Notifications = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const { notifications, loading } = useAppSelector(
    (state) => state.notifications
  );
  const handleExploreClick = (courseId) => {
    router.push(`/courses/course-details/${courseId}`);
  };
  React.useEffect(() => {
    if (token) {
      dispatch(getNotifications());
    }
  }, [token, router]);

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);
  return (
    <React.Fragment>
      <div className={styles.headerNotification}>
        <h1>Notifications</h1>
        <h4>Mark all as read</h4>
      </div>

      {loading?.notifications ? (
        <div className="d-flex justify-content-center p-5">
          <LoadingAtom />
        </div>
      ) : (
        <div>
          {notifications?.map((item, index) => {
            return (
              <div key={index} className={styles.notificationCard}>
                <div className={styles.notificationIcon}>
                  <Image
                    width={50}
                    height={50}
                    src={`${imageUrl}/uploads/notifications/${item.image}`}
                    alt="User"
                    className={styles.notificationImage}
                  />
                </div>
                <div className={styles.notificationContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div
                  className={styles.explore}
                  onClick={() => handleExploreClick(item?.course_id)}
                >
                  Explore now
                </div>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default Notifications;
