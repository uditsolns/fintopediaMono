"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { FaEllipsisV, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import styles from "./FilesCard.module.css";

type FileStatus = "Checked" | "Pending" | "In Progress";

interface File {
  name: string;
  date: string;
  size: string;
  status: FileStatus;
}

const statusColors: Record<FileStatus, string> = {
  Checked: "bg-success text-white",
  Pending: "bg-warning text-dark",
  "In Progress": "bg-primary text-white",
};

const files: File[] = [
  {
    name: "Money Market.pdf",
    date: "Sat, Apr 20",
    size: "7.5 MB",
    status: "Checked",
  },
  {
    name: "Money Market.pdf",
    date: "Sat, Apr 20",
    size: "7.5 MB",
    status: "Pending",
  },
  {
    name: "Money Market.pdf",
    date: "Sat, Apr 20",
    size: "7.5 MB",
    status: "In Progress",
  },
  {
    name: "Money Market.pdf",
    date: "Sat, Apr 20",
    size: "7.5 MB",
    status: "Checked",
  },
];

export default function Component() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleAction = (action: string, fileName: string) => {
    console.log(`${action} action on ${fileName}`);
    setOpenDropdown(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Previously Uploaded Projects</h1>
      <div className={styles.grid}>
        {files.map((file, index) => (
          <div key={index} className={styles.card}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span
                className={`${styles.statusBadge} ${
                  styles[file.status.toLowerCase()]
                }`}
              >
                {file.status}
              </span>
              <Dropdown
                isOpen={openDropdown === index}
                toggle={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
              >
                <DropdownToggle
                  tag="span"
                  data-toggle="dropdown"
                  aria-expanded={openDropdown === index}
                  className={styles.dropdownButton}
                >
                  <Button color="link" className="p-0">
                    <FaEllipsisV />
                  </Button>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    className={styles.dropdownItem}
                    onClick={() => handleAction("View", file.name)}
                  >
                    <FaEye className="me-2" />
                    View
                  </DropdownItem>
                  <DropdownItem
                    className={styles.dropdownItem}
                    onClick={() => handleAction("Edit", file.name)}
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    className={styles.dropdownItem}
                    onClick={() => handleAction("Delete", file.name)}
                  >
                    <FaTrashAlt className="me-2" />
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className={styles.cardTitle}>
              <svg
                className="me-2 text-muted"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0010.586 0H8z" />
                <path
                  fillRule="evenodd"
                  d="M2 4a2 2 0 012-2h4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h4v2H4a4 4 0 01-4-4V4z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="h6 mb-0">{file.name}</h2>
            </div>
            <p className={styles.cardDate}>
              {file.date} • {file.size}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
