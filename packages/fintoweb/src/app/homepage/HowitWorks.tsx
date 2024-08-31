import React from "react";
import styles from "./Homepage.module.css";
import Image from "next/image";
import BgImage from "../../assets/user.png";

const HowitWorks = () => {
  return (
    <div className={styles.howitWorks}>
      <div className="row">
        <div className="col-md-6">
          <Image src={BgImage} alt="Image" className={styles.howitWorksImage} />
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default HowitWorks;
