"use client";

import React from "react";
import styles from "./UpdatePassword.module.css";
import { updatePasswordField } from "shared/src/components/structures/update-password/updatePasswordModel";
import { useUpdatePasswordHelper } from "shared/src/components/structures/update-password/updatePassword.helper";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/navigation";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";

const page = () => {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.auth);
  const token = auth?.token;
  const { updatePasswordFormik, updatePasswordInputProps } =
    useUpdatePasswordHelper();
  const { handleSubmit, setFieldValue, isSubmitting } = updatePasswordFormik;

  React.useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);
  return (
    <React.Fragment>
      <div>
        <h1 className={styles.ChangePasswordHeading}>Change Password</h1>
      </div>
      <hr />
      <Row className="mt-3">
        <Col md={6}>
          <InputAtom
            label={updatePasswordField.old_password.label}
            placeholder={updatePasswordField.old_password.placeHolder}
            {...updatePasswordInputProps(updatePasswordField.old_password.name)}
            type="password"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <InputAtom
            label={updatePasswordField.new_password.label}
            placeholder={updatePasswordField.new_password.placeHolder}
            {...updatePasswordInputProps(updatePasswordField.new_password.name)}
            type="password"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <InputAtom
            label={updatePasswordField.new_password_confirmation.label}
            placeholder={
              updatePasswordField.new_password_confirmation.placeHolder
            }
            {...updatePasswordInputProps(
              updatePasswordField.new_password_confirmation.name
            )}
            type="password"
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={3}>
          <Button className={styles.cancleButton}>Cancle</Button>
        </Col>
        <Col md={3}>
          <button className={styles.ChangePasswordbutton}>
            Change password
          </button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default page;
