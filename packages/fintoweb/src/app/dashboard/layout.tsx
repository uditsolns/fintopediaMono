"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname from next/navigation
import Link from "next/link";
import { Button, Container, Row, Col } from "reactstrap";
import { FaChevronDown, FaSignOutAlt, FaBell, FaShoppingBag } from "react-icons/fa";
import styles from './DashboardLayout.module.css';
import Logo from "../../assets/Fintopedia logo-White.png";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/dashboard/my-courses"); // State for active tab
  const router = useRouter(); // Use the router hook from next/navigation
  const pathname = usePathname(); // Use usePathname to get the current pathname

  // Automatically redirect to 'my-courses' on mount if the current path is '/dashboard'
  useEffect(() => {
    if (pathname === "/dashboard") {
      router.push("/dashboard/my-courses");
      setActiveTab("/dashboard/my-courses"); // Set active tab
    }
  }, [pathname, router]); // Dependencies: pathname and router

  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // Set the active tab
  };

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${isMenuOpen ? "d-block" : "d-none"} d-md-block`}>
        <h1 className="h4 mb-4">
          <a href="/" className="text-2xl font-bold">
            <Image src={Logo} alt="Logo" />
          </a>
        </h1>
        <nav className="flex-grow-1">
          <Link href="/dashboard/my-courses" passHref>
            <Button
              className={`${styles.button} ${activeTab === "/dashboard/my-courses" ? styles.active : ""}`}
              onClick={() => handleTabClick("/dashboard/my-courses")}
            >
              <div className={styles.iconText}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_1756_34206)">
                    <path d="M14 4H20V10H14V4Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 14H10V20H4V14Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 7C4 7.39397 4.0776 7.78407 4.22836 8.14805C4.37913 8.51203 4.6001 8.84274 4.87868 9.12132C5.15726 9.3999 5.48797 9.62087 5.85195 9.77164C6.21593 9.9224 6.60603 10 7 10C7.39397 10 7.78407 9.9224 8.14805 9.77164C8.51203 9.62087 8.84274 9.3999 9.12132 9.12132C9.3999 8.84274 9.62087 8.51203 9.77164 8.14805C9.9224 7.78407 10 7.39397 10 7C10 6.60603 9.9224 6.21593 9.77164 5.85195C9.62087 5.48797 9.3999 5.15726 9.12132 4.87868C8.84274 4.6001 8.51203 4.37913 8.14805 4.22836C7.78407 4.0776 7.39397 4 7 4C6.60603 4 6.21593 4.0776 5.85195 4.22836C5.48797 4.37913 5.15726 4.6001 4.87868 4.87868C4.6001 5.15726 4.37913 5.48797 4.22836 5.85195C4.0776 6.21593 4 6.60603 4 7Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
              className={`${styles.button} ${activeTab === "/dashboard/store" ? styles.active : ""}`}
              onClick={() => handleTabClick("/dashboard/store")}
            >
              <div className={styles.iconText}>
                <FaShoppingBag className="me-2" />
                Store
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/notifications" passHref>
            <Button
              className={`${styles.button} ${activeTab === "/dashboard/notifications" ? styles.active : ""}`}
              onClick={() => handleTabClick("/dashboard/notifications")}
            >
              <div className={styles.iconText}>
                <FaBell className="me-2" />
                Notifications
              </div>
            </Button>
          </Link>
        </nav>
        <Button className={`${styles.button} ${styles.logoutButton}`}>
          <div className={styles.iconText}>
            <FaSignOutAlt className="me-2" />
            Logout
          </div>
        </Button>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <Container fluid>
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="h4">Dashboard</h2>
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
