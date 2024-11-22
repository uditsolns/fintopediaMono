"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { FaChevronDown, FaSignOutAlt, FaChevronUp } from "react-icons/fa";
import styles from "./DashboardLayout.module.css";
import Logo from "../../assets/Fintopedia logo-White.png";
import Image from "next/image";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import { logout } from "shared/src/provider/store/reducers/auth.reducer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/dashboard/my-courses");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { auth } = useAppSelector((state) => state.auth);

  console.log("auth", auth);

  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard/my-courses");
      setActiveTab("/dashboard/my-courses");
    }
  }, [pathname, router]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={styles.container}>
      <aside
        className={`${styles.sidebar} ${
          isMenuOpen ? "d-block" : "d-none"
        } d-md-block`}
      >
        <h1 className="h4 mb-4">
          <a href="/dashboard/my-courses" className="text-2xl font-bold">
            <Image src={Logo} alt="Logo" />
          </a>
        </h1>
        <div className={styles.redeemCard}>
          <h1>Fintopedia Credits: 500</h1>
          <p>You can use your credits to buy your next course!</p>
          <button className={styles.redeemButton}>Redeem now</button>
        </div>
        <nav className={`${styles.navBar} "flex-grow-1"}`}>
          <Link href="/dashboard/my-courses" passHref>
            <Button
              className={`${styles.button} ${
                activeTab === "/dashboard/my-courses" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("/dashboard/my-courses")}
            >
              <div className={styles.iconText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1756_34206)">
                    <path
                      d="M14 4H20V10H14V4Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 14H10V20H4V14Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 7C4 7.39397 4.0776 7.78407 4.22836 8.14805C4.37913 8.51203 4.6001 8.84274 4.87868 9.12132C5.15726 9.3999 5.48797 9.62087 5.85195 9.77164C6.21593 9.9224 6.60603 10 7 10C7.39397 10 7.78407 9.9224 8.14805 9.77164C8.51203 9.62087 8.84274 9.3999 9.12132 9.12132C9.3999 8.84274 9.62087 8.51203 9.77164 8.14805C9.9224 7.78407 10 7.39397 10 7C10 6.60603 9.9224 6.21593 9.77164 5.85195C9.62087 5.48797 9.3999 5.15726 9.12132 4.87868C8.84274 4.6001 8.51203 4.37913 8.14805 4.22836C7.78407 4.0776 7.39397 4 7 4C6.60603 4 6.21593 4.0776 5.85195 4.22836C5.48797 4.37913 5.15726 4.6001 4.87868 4.87868C4.6001 5.15726 4.37913 5.48797 4.22836 5.85195C4.0776 6.21593 4 6.60603 4 7Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1756_34206">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                My Courses
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/store" passHref>
            <Button
              className={`${styles.button} ${
                activeTab === "/dashboard/store" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("/dashboard/store")}
            >
              <div className={styles.iconText}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1756_35539)">
                      <path
                        d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H16C17.0609 4 18.0783 4.42143 18.8284 5.17157C19.5786 5.92172 20 6.93913 20 8V16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20H8C6.93913 20 5.92172 19.5786 5.17157 18.8284C4.42143 18.0783 4 17.0609 4 16V8Z"
                        stroke="#C8C8CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 8C9 8.79565 9.31607 9.55871 9.87868 10.1213C10.4413 10.6839 11.2044 11 12 11C12.7956 11 13.5587 10.6839 14.1213 10.1213C14.6839 9.55871 15 8.79565 15 8"
                        stroke="#C8C8CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1756_35539">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                Store
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/notifications" passHref>
            <Button
              className={`${styles.button} ${
                activeTab === "/dashboard/notifications" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("/dashboard/notifications")}
            >
              <div className={styles.iconText}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1756_35545)">
                      <path
                        d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5Z"
                        stroke="#C8C8CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17"
                        stroke="#C8C8CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1756_35545">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                Notifications
              </div>
            </Button>
          </Link>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle
              className={`${styles.button} d-flex justify-content-between`}
              caret
            >
              <div className={styles.iconText}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1756_35551)">
                      <path
                        d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1756_35551">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                My Account
              </div>
              {dropdownOpen ? (
                <FaChevronUp className="mt-1" />
              ) : (
                <FaChevronDown className="mt-1" />
              )}
            </DropdownToggle>
            <DropdownMenu className={styles.dropdownMenuList}>
              <Link href="/dashboard/my-account/profile-details" passHref>
                <Button
                  className={`${styles.button} ${
                    activeTab === "/dashboard/my-account/profile-details"
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    handleTabClick("/dashboard/my-account/profile-details");
                    toggleDropdown();
                  }}
                >
                  <div className={styles.iconText}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_35639)">
                          <path
                            d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.17188 18.849C6.41938 18.0252 6.92584 17.3032 7.61612 16.79C8.3064 16.2768 9.14372 15.9997 10.0039 16H14.0039C14.8651 15.9997 15.7035 16.2774 16.3943 16.7918C17.085 17.3062 17.5913 18.0298 17.8379 18.855"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_35639">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Profile Details
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/my-account/certifications" passHref>
                <Button
                  className={`${styles.button} ${
                    activeTab === "/dashboard/my-account/certifications"
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    handleTabClick("/dashboard/my-account/certifications");
                    toggleDropdown();
                  }}
                >
                  <div className={styles.iconText}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_35646)">
                          <path
                            d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5 8V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H12"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3 14C3 14.7956 3.31607 15.5587 3.87868 16.1213C4.44129 16.6839 5.20435 17 6 17C6.79565 17 7.55871 16.6839 8.12132 16.1213C8.68393 15.5587 9 14.7956 9 14C9 13.2044 8.68393 12.4413 8.12132 11.8787C7.55871 11.3161 6.79565 11 6 11C5.20435 11 4.44129 11.3161 3.87868 11.8787C3.31607 12.4413 3 13.2044 3 14Z"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.5 17L3 22L6 20.5L9 22L7.5 17"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_35646">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Certifications
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/my-account/refer-and-earn" passHref>
                <Button
                  className={`${styles.button} ${
                    activeTab === "/dashboard/my-account/refer-and-earn"
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    handleTabClick("/dashboard/my-account/refer-and-earn");
                    toggleDropdown();
                  }}
                >
                  <div className={styles.iconText}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_35654)">
                          <path
                            d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15 8H9H10C10.7956 8 11.5587 8.31607 12.1213 8.87868C12.6839 9.44129 13 10.2044 13 11C13 11.7956 12.6839 12.5587 12.1213 13.1213C11.5587 13.6839 10.7956 14 10 14H9L12 17"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 11H15"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_35654">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Refer and Earn
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/my-account/membership-type" passHref>
                <Button
                  className={`${styles.button} ${
                    activeTab === "/dashboard/my-account/membership-type"
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    handleTabClick("/dashboard/my-account/membership-type");
                    toggleDropdown();
                  }}
                >
                  <div className={styles.iconText}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_35661)">
                          <path
                            d="M17 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17C3 16.2044 3.31607 15.4413 3.87868 14.8787C4.44129 14.3161 5.20435 14 6 14H17C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20ZM17 20H18C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H9C8.46957 4 7.96086 4.21071 7.58579 4.58579C7.21071 4.96086 7 5.46957 7 6V14"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_35661">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Membership Type
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/my-account/change-password" passHref>
                <Button
                  className={`${styles.button} ${
                    activeTab === "/dashboard/my-account/change-password"
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    handleTabClick("/dashboard/my-account/change-password");
                    toggleDropdown();
                  }}
                >
                  <div className={styles.iconText}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_35666)">
                          <path
                            d="M5 13C5 12.4696 5.21071 11.9609 5.58579 11.5858C5.96086 11.2107 6.46957 11 7 11H17C17.5304 11 18.0391 11.2107 18.4142 11.5858C18.7893 11.9609 19 12.4696 19 13V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V13Z"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_35666">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Change Password
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/my-account/purchase-history" passHref>
                <Button
                  className={`${styles.button} ${
                    activeTab === "/dashboard/my-account/purchase-history"
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    handleTabClick("/dashboard/my-account/purchase-history");
                    toggleDropdown();
                  }}
                >
                  <div className={styles.iconText}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1756_35673)">
                          <path
                            d="M12 8V12L14 14"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.04688 11.0001C3.27097 8.80013 4.29714 6.75968 5.92961 5.26803C7.56208 3.77639 9.68657 2.93795 11.8978 2.9127C14.1089 2.88744 16.252 3.67713 17.9181 5.1311C19.5843 6.58507 20.6568 8.60155 20.931 10.7958C21.2053 12.99 20.6622 15.2085 19.4052 17.0278C18.1483 18.8472 16.2655 20.1401 14.1162 20.6599C11.9668 21.1797 9.70129 20.89 7.75187 19.8461C5.80246 18.8022 4.3056 17.0772 3.54688 15.0001M3.04688 20.0001V15.0001H8.04688"
                            stroke="#C8C8CC"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1756_35673">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    Purchase History
                  </div>
                </Button>
              </Link>
            </DropdownMenu>
          </Dropdown>
        </nav>
        <Button
          className={`${styles.button} ${styles.logoutButton}`}
          onClick={() => {
            dispatch(logout());
            router.push("/auth/login");
          }}
        >
          <div className={styles.iconText}>
            <FaSignOutAlt className="me-2" />
            Logout
          </div>
        </Button>
      </aside>
      <main className={styles.mainContent}>
        <Container fluid>
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className={styles.WelcomeHeading}>
                Welcome back, {auth?.user?.first_name}!
              </h2>
            </Col>
            <Col className="text-end d-md-none">
              <Button
                color="outline-light"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaChevronDown />
              </Button>
            </Col>
          </Row>
          {children}
        </Container>
      </main>
    </div>
  );
}
