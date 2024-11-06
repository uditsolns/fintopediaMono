// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Container, Row, Col } from "reactstrap";
import {
  FaChevronDown,
  FaSignOutAlt,
  FaBell,
  FaShoppingBag,
} from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="d-flex vh-100 bg-dark text-white">
      {/* Sidebar */}
      <aside
        className={`bg-secondary p-4 ${
          isMenuOpen ? "d-block" : "d-none"
        } d-md-block`}
      >
        <h1 className="h4 mb-4">Fintopedia</h1>
        <nav className="flex-grow-1">
          <Link href="/dashboard/my-courses" passHref>
            <Button color="link" className="text-left w-100 mb-2">
              My Courses
            </Button>
          </Link>
          <Link href="/dashboard/store" passHref>
            <Button color="link" className="text-left w-100 mb-2">
              <FaShoppingBag className="me-2" />
              Store
            </Button>
          </Link>
          <Link href="/dashboard/notifications" passHref>
            <Button color="link" className="text-left w-100 mb-2">
              <FaBell className="me-2" />
              Notifications
            </Button>
          </Link>
        </nav>
        <Button color="link" className="text-left w-100 mt-auto">
          <FaSignOutAlt className="me-2" />
          Logout
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4 overflow-auto">
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
