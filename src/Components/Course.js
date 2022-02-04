import React, { useContext } from "react";
import GpaContext from "../GpaContext";
import { constants } from "../GpaContext/constants";
import CustomModal from "./CustomModal";
import Update from "./Update";
function Course({ year, sid, code, title, unit, grade }) {
  const { dispatch } = useContext(GpaContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch({
      type: constants.DELETE_COURSE,
      payload: {
        year,
        sid,
        code,
      },
    });
  };

  return (
    <>
      <tr>
        <th scope="row">{code}</th>
        <td className="text-capitalize">{title}</td>
        <td>{unit}</td>
        <td>{grade}</td>
        <td>
          <button onClick={handleDelete} className="me-1 btn-danger">
            x
          </button>
          <button onClick={() => setIsOpen(true)}>Edit</button>
        </td>
      </tr>
      <CustomModal
        heading="Update Course"
        openModal={() => setIsOpen(true)}
        closeModal={() => setIsOpen(false)}
        modalIsOpen={modalIsOpen}
      >
        <Update
          {...{ year, sid, cid: code }}
          closeModal={() => setIsOpen(false)}
        />
      </CustomModal>
    </>
  );
}

export default Course;
