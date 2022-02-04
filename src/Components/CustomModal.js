import React from "react";
import Modal from "react-modal";

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

function CustomModal({ children, heading, closeModal, modalIsOpen }) {
  let subtitle;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)} className="text-primary">
        {heading}
      </h2>
      <div>{children}</div>
      <button onClick={closeModal} className="btn btn-danger">
        close
      </button>
    </Modal>
  );
}

export default CustomModal;
