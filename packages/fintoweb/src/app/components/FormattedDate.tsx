// components/FormattedDate.tsx

import React from "react";

// Function to format the date as DD MM YYYY
const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
  const year = parsedDate.getFullYear();
  return `${day}-${month}-${year}`;
};

interface FormattedDateProps {
  date: string; // The expiry date should be in a string format that JavaScript can parse
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
