"use client";

import React, { useState, useRef } from "react";
import styles from "./ProfileDetails.module.css";
import Image from "next/image";
import { useAppSelector } from "shared/src/provider/store/types/storeTypes";
import { imageUrl } from "shared/src/config/imageUrl";
import { Button, Col, Row } from "reactstrap";
import { userField } from "shared/src/components/structures/user/userModel";
import { useUserHelper } from "shared/src/components/structures/user/user.helper";
import { InputAtom } from "@src/components/atoms/Input/InputAtom";
import CircularLoading from "@src/components/loader/CircularLoading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const { auth, current_user } = useAppSelector((state) => state.auth);
  const { user, loading, update } = useAppSelector((state) => state.users);

  console.log("current_user", current_user);
  const { userFormik, userInputProps } = useUserHelper();
  const { handleSubmit, setFieldValue, isSubmitting } = userFormik;

  const [image, setImage] = useState<string | null>(null);
  const [imagevalue, setImagevalue] = useState(null);
  // const [imagevalue, setImagevalue] = useState<string | null>(
  //   auth?.user?.photo || null
  // );
  // console.log("imagevalue", imagevalue);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImagevalue(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const photoUrl = canvas.toDataURL("image/jpeg");
      setImage(photoUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setShowCamera(false);
    }
  };

  const deletePhoto = () => {
    setImage(null);
    setFieldValue(userField.photo.name, null);
  };
  React.useEffect(() => {
    setFieldValue(userField.id.name, current_user?.id || "");
    setFieldValue(userField.first_name.name, current_user?.first_name ?? "");
    setFieldValue(
      userField.surname_name.name,
      current_user?.surname_name ?? ""
    );
    setFieldValue(userField.email.name, current_user?.email ?? "");
    setFieldValue(userField.phone.name, current_user?.phone ?? "");
    setFieldValue(userField.headline.name, current_user?.headline ?? "");
    setFieldValue(userField.bio.name, current_user?.bio ?? "");
    setFieldValue(userField.website_url.name, current_user?.website_url ?? "");
    setFieldValue(userField.linkedin.name, current_user?.linkedin ?? "");
    setFieldValue(userField.designation.name, current_user?.designation ?? "");
    setFieldValue(userField.photo.name, imagevalue || current_user?.photo);
  }, [auth, image, setFieldValue]);

  React.useEffect(() => {
    if (update) {
      if (update?.id) {
        toast.success("User Update successfully !", {
          position: "top-right",
          theme: "light",
        });
      }
    }
  }, [update]);
  React.useEffect(() => {
    if (!auth?.token) {
      router.push("/auth/login");
    }
  }, [auth?.token, router]);
  return (
    <React.Fragment>
      <div className={styles.profilePicture}>
        <h1 className={styles.profileHeading}>Profile Picture</h1>
        <div className={styles.container}>
          <div className={styles.profilePicWrapper}>
            <div className={styles.profilePic}>
              {image || current_user?.photo ? (
                <Image
                  src={
                    image ||
                    `${imageUrl}/uploads/user_photo/${current_user?.photo}`
                  }
                  alt="Profile"
                  fill
                  className={styles.profilePicImage}
                />
              ) : (
                <div className="w-full h-full bg-zinc-800" />
              )}
            </div>
            <button onClick={startCamera} className={styles.buttonWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_1756_35573)">
                  <path
                    d="M5 7H6C6.53043 7 7.03914 6.78929 7.41421 6.41421C7.78929 6.03914 8 5.53043 8 5C8 4.73478 8.10536 4.48043 8.29289 4.29289C8.48043 4.10536 8.73478 4 9 4H15C15.2652 4 15.5196 4.10536 15.7071 4.29289C15.8946 4.48043 16 4.73478 16 5C16 5.53043 16.2107 6.03914 16.5858 6.41421C16.9609 6.78929 17.4696 7 18 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 13C9 13.7956 9.31607 14.5587 9.87868 15.1213C10.4413 15.6839 11.2044 16 12 16C12.7956 16 13.5587 15.6839 14.1213 15.1213C14.6839 14.5587 15 13.7956 15 13C15 12.2044 14.6839 11.4413 14.1213 10.8787C13.5587 10.3161 12.7956 10 12 10C11.2044 10 10.4413 10.3161 9.87868 10.8787C9.31607 11.4413 9 12.2044 9 13Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1756_35573">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>

          {showCamera && (
            <div className={styles.videoWrapper}>
              <div className={styles.videoContainer}>
                <video ref={videoRef} autoPlay className={styles.video} />
                <div className={styles.buttons}>
                  <Button onClick={capturePhoto}>Capture</Button>
                  <Button variant="outline" onClick={stopCamera}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className={styles.fileInput}
          />
          <div className="button p-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className={styles.button}
            >
              Change photo
            </Button>

            <Button
              onClick={deletePhoto}
              variant="ghost"
              className={`${styles.deleteButton} ${
                !image ? styles.disabledButton : ""
              }`}
              disabled={!image}
            >
              Delete photo
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.profileDetails}>
        <h1 className={styles.detailsHeading}>Details</h1>
        <Row className="form-group mt-3">
          <Col md={6}>
            <InputAtom
              label={userField.first_name.label}
              placeholder={userField.first_name.placeHolder}
              {...userInputProps(userField.first_name.name)}
            />
          </Col>
          <Col md={6}>
            <InputAtom
              label={userField.surname_name.label}
              placeholder={userField.surname_name.placeHolder}
              {...userInputProps(userField.surname_name.name)}
            />
          </Col>
        </Row>
        <Row className="form-group mt-3">
          <Col md={6}>
            <InputAtom
              label={userField.email.label}
              placeholder={userField.email.placeHolder}
              {...userInputProps(userField.email.name)}
            />
          </Col>
          <Col md={6}>
            <InputAtom
              label={userField.phone.label}
              placeholder={userField.phone.placeHolder}
              {...userInputProps(userField.phone.name)}
            />
          </Col>
        </Row>
        <Row className="form-group mt-3">
          <Col md={6}>
            <InputAtom
              label={userField.headline.label}
              placeholder={userField.headline.placeHolder}
              {...userInputProps(userField.headline.name)}
            />
          </Col>
          <Col md={6}>
            <InputAtom
              label={userField.bio.label}
              placeholder={userField.bio.placeHolder}
              {...userInputProps(userField.bio.name)}
            />
          </Col>
        </Row>
        <Row className="form-group mt-3">
          <Col md={6}>
            <InputAtom
              label={userField.linkedin.label}
              placeholder={userField.linkedin.placeHolder}
              {...userInputProps(userField.linkedin.name)}
            />
          </Col>
          <Col md={6}>
            <InputAtom
              label={userField.website_url.label}
              placeholder={userField.website_url.placeHolder}
              {...userInputProps(userField.website_url.name)}
            />
          </Col>
        </Row>
        <Row className="form-group mt-3">
          <Col md={6}>
            <InputAtom
              label={userField.designation.label}
              placeholder={userField.designation.placeHolder}
              {...userInputProps(userField.designation.name)}
            />
          </Col>
        </Row>
        <div className={styles.saveButtonContainer}>
          <Button
            type="submit"
            className={styles.saveButton}
            size="md"
            onClick={() => {
              handleSubmit();
            }}
          >
            {loading.update ? <CircularLoading /> : "Save"}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
