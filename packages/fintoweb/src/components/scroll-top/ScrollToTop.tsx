"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          width: "50px",
          height: "50px",
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "24px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
          transition: "background-color 0.3s ease",
        }}
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTop;
