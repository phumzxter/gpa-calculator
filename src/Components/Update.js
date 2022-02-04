import React, { useContext, useEffect, useState } from "react";
import GpaContext from "../GpaContext";
import { constants } from "../GpaContext/constants";
import { grades } from "../utils/helpers";

function Update({ year, sid, closeModal, cid }) {
  const { dispatch, records } = useContext(GpaContext);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [unit, setUnit] = useState("");

  const currentCourse = records[year][sid].courses.filter(
    (item) => item.code === cid
  )[0];
  useEffect(() => {
    setCode(currentCourse.code);
    setTitle(currentCourse.title);
    setGrade(currentCourse.grade);
    setUnit(currentCourse.unit);
  }, [currentCourse]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if ((code, title, grade, unit)) {
      dispatch({
        type: constants.UPDATE_COURSE,
        payload: {
          sid,
          year,
          course: {
            code,
            title,
            unit: parseInt(unit),
            grade,
          },
        },
      });
      closeModal();
    }
  };
  return (
    <div className="add-course">
      <form>
        <div className="form-group mb-3">
          <label htmlFor="code">Course code</label>
          <input
            readOnly
            type="text"
            className="form-control"
            id="code"
            value={code}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="title">Course Title</label>
          <input
            required
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="unit">Course Unit</label>
          <input
            required
            type="number"
            className="form-control"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            required
            className="custom-select p-2"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="" className="px-2">
              Select Grade
            </option>
            {Object.keys(grades).map((item) => (
              <option key={item} value={item} className="px-2">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
