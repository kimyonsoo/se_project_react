import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { login } from "../../utils/auth";

const LoginModal = ({
  isOpen,
  onClose,
  activeModal,
  onCloseModal,
  onLoginModal,
  onRegisterModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await onLoginModal(data);
      if (res.token) {
        onClose();
      } else {
        //error msg
        setData({
          email: data.email,
          password: data.password,
          errorMessage: "Invalid email or password",
        });
      }
    } catch (err) {
      //error msg
      setData({
        email: data.email,
        password: data.password,
        errorMessage: "Login failed. Please try again.",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setData({ email: "", password: "", errorMessage: "" });
  };

  return (
    <ModalWithForm
      buttonText="Log In"
      secondaryButtonText={"or Sign Up"}
      title="Log In"
      activeModal={activeModal}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onOpenModal={onRegisterModal}
      onSubmit={handleSubmit}
      errorMessage={data.errorMessage}
      isValid={data.email && data.password}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={data.email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        {data.errorMessage ? "Incorrect password" : "Password"}

        <input
          type="password"
          className="modal__input"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
