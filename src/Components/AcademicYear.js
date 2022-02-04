import React, { useContext } from "react";
import GpaContext from "../GpaContext";
import { constants } from "../GpaContext/constants";
import { calculateGPA, getAnnualGPA, grades } from "../utils/helpers";
import Semester from "./Semester";

function AcademicYear({ year }) {
  const { records, dispatch } = useContext(GpaContext);
  const currentYear = records[year];

  const handleAddSemester = () => {
    dispatch({
      type: constants.ADD_SEMESTER,
      payload: {
        year,
        id: Object.keys(currentYear).length + 1,
      },
    });
  };

  const annualGPA = getAnnualGPA(currentYear);

  return (
    <div className="mb-4">
      <div className="container">
        <div className="border p-3">
          <h2 className="fw-bold">Year: {year}</h2>

          <div>
            {Object.values(currentYear).map(({ sid }, index) => (
              <Semester key={index} {...{ sid, year }} />
            ))}
          </div>
          <div
            style={{
              borderBottom: "3px solid black",
            }}
          >
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-0 fw-bold">Annual GPA: {annualGPA}</p>
              </div>
              <div className="mb-3">
                <button onClick={handleAddSemester}>Add Semester</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicYear;
