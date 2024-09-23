import React, { useRef } from "react";
import JoditEditor from "jodit-react";
// import 'jodit/build/jodit.min.css';
import styles from "../EnrollTabs.module.css"; // CSS Module for external styles

const Notes: React.FC = () => {
  const editor = useRef(null);
  const [content, setContent] = React.useState("");

  const config = {
    readonly: false,
    height: 400,
    theme: "dark",
    toolbarSticky: false,
    style: {
      background: "#222431",
      color: "#ffffff",
    },
  };

  return (
    <>
      <div className={styles.editorContainer}>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          // tabIndex={1} // tab index of textarea
          onBlur={(newContent) => setContent(newContent)} // Update the content for performance reasons
          onChange={() => {}}
        />
      </div>
      <div className={styles.notesPreview}>
        <span>5.16</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z"
              stroke="#FCFCFC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
              stroke="#FCFCFC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={styles.notes}>
        Market analysis is a crucial process that involves evaluating various
        aspects of a market to make informed business decisions.
      </div>
    </>
  );
};

export default Notes;
