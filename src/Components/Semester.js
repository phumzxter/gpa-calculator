import React, { useState, useEffect, useContext } from "react";
import GpaContext from "../GpaContext";
import { calculateGPA, grades } from "../utils/helpers";
import Course from "./Course";
import Modal from "react-modal";
import AddCourse from "./AddCourse";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px",
  },
};

function Semester({ sid, year }) {
  const [gpa, setGpa] = useState(0);
  const { records } = useContext(GpaContext);
  const semester = records[year][sid];
  const { courses } = semester;
  useEffect(() => {
    setGpa(() => calculateGPA(courses, grades));
  }, [courses]);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {

  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="container mb-4">
        <div className="bg-light p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <div className="border-right me-3">
                <p>
                  Semester: <span className="fw-bold">{sid}</span>
                </p>
              </div>
              <div className="border-right me-3">
                <p>
                  GPA: <span className="fw-bold">{gpa}</span>
                </p>
              </div>
            </div>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-primary btn-small "
                onClick={openModal}
              >
                Add Course
              </button>
            </div>
          </div>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Course Code</th>
                <th scope="col">Course Title</th>
                <th scope="col">Credit Unit</th>
                <th scope="col">Grade</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, index) => (
                <Course key={index} {...item} {...{ year, sid }} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="text-primary"
        >
          Add Course
        </h2>
        <AddCourse {...{ year, sid, closeModal }} />
        <button onClick={closeModal} className="btn btn-danger">
          close
        </button>
      </Modal>
    </>
  );
}

export default Semester;
