import React, { useContext } from "react";
import AcademicYear from "../Components/AcademicYear";
import Header from "../Components/Header";
import GpaContext from "../GpaContext";
import { constants } from "../GpaContext/constants";
import { getCummulativeGPA } from "../utils/helpers";

function Home() {
  const { records, dispatch } = useContext(GpaContext);
  const handleAddYear = () => {
    dispatch({
      type: constants.ADD_YEAR,
    });
  };
  const cgpa = getCummulativeGPA(records);
  return (
    <div>
      <Header />
      <div className="">
        {Object.keys(records).map((year) => (
          <AcademicYear key={year} year={year} />
        ))}
      </div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            <p className="mb-0 fw-bold">Cumulative GPA: {cgpa}</p>
          </div>
          <div className="mb-3">
            <button onClick={handleAddYear}>Add Year</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
