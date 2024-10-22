import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import styles from "../EnrollTabs.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "shared/src/provider/store/types/storeTypes";
import {
  CourseNotesFields,
  CourseNotesResponse,
} from "shared/src/utils/types/course-notes";
import {
  createCourseNotes,
  updateCourseNotes,
  deleteCourseNotes,
} from "shared/src/provider/store/services/course-note.service";
import { toast } from "react-toastify";
import { formatDateMonthTime } from "shared/src/components/atoms/Calculate";

const Notes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { singleCourse, loading: coursesLoading } = useAppSelector(
    (state) => state.courses
  );
  const { course_notes, loading: course_notes_loading } = useAppSelector(
    (state) => state.courseNotes
  );

  const [selectedNote, setSelectedNote] =
    React.useState<CourseNotesResponse | null>(null);

  const editor = useRef(null);
  const [notes, setNotes] = React.useState<string | null>("");

  const config = {
    readonly: false,
    height: 250,
    theme: "dark",
    toolbarSticky: false,
    style: {
      background: "#222431",
      color: "#ffffff",
    },
  };

  const onCancel = () => {
    setNotes("");
    setSelectedNote(null);
  };
  const onSave = () => {
    let params: CourseNotesFields = {
      id: selectedNote?.id,
      user_id: Number(auth?.user?.id),
      course_id: Number(singleCourse?.id),
      notes: notes,
    };
    if (!notes) {
      toast.error("Note is required.", {
        position: "top-right",
        theme: "light",
      });
      return;
    }
    if (selectedNote) {
      dispatch(
        updateCourseNotes({
          params,
          onSuccess(data) {
            toast.success("Notes Updated Successfully !", {
              position: "top-right",
              theme: "light",
            });
          },
          onError(error) {},
        })
      );
      setNotes("");
      setSelectedNote(null);

      return true;
    }
    dispatch(
      createCourseNotes({
        params,
        onSuccess(data) {
          toast.success("Notes added Successfully !", {
            position: "top-right",
            theme: "light",
          });
        },
        onError(error) {},
      })
    );
    setNotes("");
    setSelectedNote(null);
  };
  const confirmDeletion = (noteId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this note?</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                dispatch(
                  deleteCourseNotes({
                    id: noteId,
                    onSuccess(data) {
                      toast.success("Notes Deleted Successfully!", {
                        position: "top-right",
                        theme: "light",
                      });
                    },
                    onError(error) {
                      toast.error("Failed to delete the note.", {
                        position: "top-right",
                        theme: "light",
                      });
                    },
                  })
                );
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-secondary btn-sm ml-2"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <>
      <div>
        <div className={styles.editorContainer}>
          <JoditEditor
            ref={editor}
            value={notes}
            config={config}
            // tabIndex={1} // tab index of textarea
            onBlur={(newContent) => setNotes(newContent)}
            onChange={() => {}}
          />
          <div className="d-flex">
            <button className="btn btn-md btn-light" onClick={onSave}>
              Save
            </button>
            <button className="ml-2" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
        <div className={styles.notesSection}>
          {course_notes && course_notes.length > 0 ? (
            course_notes.map((note, index) => (
              <div>
                <div key={note.id} className={styles.notesPreview}>
                  <span>
                    {note?.updated_at
                      ? formatDateMonthTime(note?.updated_at)
                      : ""}
                  </span>
                  <div className="actionButton">
                    <div
                      className="editNote"
                      onClick={() => {
                        setNotes(note?.notes);
                        setSelectedNote(note);
                      }}
                    >
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
                    </div>
                    <div
                      className="deleteNote"
                      // onClick={() => {
                      //   let id = Number(note?.id);
                      //   dispatch(
                      //     deleteCourseNotes({
                      //       id,
                      //       onSuccess(data) {
                      //         toast.success("Notes Deleted Successfully !", {
                      //           position: "top-right",
                      //           theme: "light",
                      //         });
                      //       },
                      //       onError(error) {},
                      //     })
                      //   );
                      // }}
                      onClick={() => {
                        let id = Number(note?.id);
                        confirmDeletion(id);
                      }}
                    >
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
                </div>
                <div
                  className={styles.notes}
                  dangerouslySetInnerHTML={{ __html: note.notes }}
                />
              </div>
            ))
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
