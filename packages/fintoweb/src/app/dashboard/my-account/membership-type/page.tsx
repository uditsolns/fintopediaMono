"use client";

import React from "react";
import { Button } from "reactstrap";
import styles from "./Membership.module.css";
import { Card, CardBody } from "reactstrap";
import Image from "next/image";
import Membership from "../../../../assets/membership.png";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { useRouter } from "next/navigation";

const MembershipType = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);
  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <div className={styles.header}>
          <h1>Membership Type</h1>
          <p>Manage your Fintopedia subscriptions</p>
        </div>

        <div className={styles.activePlansection}>
          <h2 className="h4">Active plans</h2>
          <p>You don&apos;t have any active membership plans</p>
        </div>

        <div className={styles.MembershipPlanSection}>
          <h2 className={styles.MembershipPlanSectionHeading}>
            Membership plans available
          </h2>
          <Card className={styles.card}>
            <CardBody className={styles.content}>
              <div className="row">
                <div className="col-md-8">
                  <div className="p-5">
                    <h3 className={styles.contentHeading}>Personal Plan</h3>
                    <p className={styles.contentSubHeading}>
                      New opportunities await. Sign up for Personal Plan to get
                      all this and more.
                    </p>
                    <ul className={styles.list}>
                      <li>Access to 11,000+ top courses</li>
                      <li>Courses in tech, business, and more</li>
                      <li>Practice tests, exercises, and Q&A</li>
                    </ul>
                    <div className={styles.buttonGroup}>
                      <Button className={styles.subscribeButton}>
                        Subscribe
                      </Button>
                      <Button color="link" className="text-white">
                        Learn about pricing
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <Image
                    src={Membership}
                    alt="Person working on a computer"
                    className={styles.MembershipImage}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className={styles.card}>
            <CardBody className={styles.content}>
              <div className="row">
                <div className="col-md-8">
                  <div className="p-5">
                    <h3 className={styles.contentHeading}>Team Plan</h3>
                    <p className={styles.contentSubHeading}>
                      New opportunities await. Sign up for Personal Plan to get
                      all this and more.
                    </p>
                    <ul className={styles.list}>
                      <li>Access to 11,000+ top courses</li>
                      <li>Courses in tech, business, and more</li>
                      <li>Practice tests, exercises, and Q&A</li>
                    </ul>
                    <div className={styles.buttonGroup}>
                      <Button className={styles.subscribeButton}>
                        Subscribe
                      </Button>
                      <Button color="link" className="text-white">
                        Learn about pricing
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <Image
                    src={Membership}
                    alt="Person working on a computer"
                    className={styles.MembershipImage}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default MembershipType;
