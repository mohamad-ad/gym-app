import { Modal } from "@mui/material";
import React, { useContext, memo } from "react";
import ModalContext from "../context/ModalContext";
import HaveAccountContext from "../context/HaveAccountContext";
import LoginForm from "./form/LoginForm";
import SignUpForm from "./form/SignUpForm";

const FormModal = () => {
  const { haveAccount } = useContext(HaveAccountContext);
  const { openModal, setOpenModal } = useContext(ModalContext);

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {haveAccount ? <LoginForm /> : <SignUpForm />}
    </Modal>
  );
};

export default memo(FormModal);
