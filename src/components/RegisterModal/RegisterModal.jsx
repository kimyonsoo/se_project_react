import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const RegisterModal = ({
  isOpen,
  activeModal,
  onCloseModal,
  onRegisterModal,
  onLoginModal,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("this is not an email address");

      return;
    }

    if (password.length < 8) {
      setErrorMessage("your password must be at least 8 characters long");
      return;
    }

    onRegisterModal({ email, password, name, avatarUrl })
      .then(() => {
        return onLoginModal({ email, password });
      })
      .catch((err) => {
        setErrorMessage("Registration failed. Please try again");
      });
  }

  return (
    <ModalWithForm
      buttonText="Sign Up"
      // secondaryButtonText={"or Log In"}
      title="Sign Up"
      activeModal={activeModal}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onOpenModal={onLoginModal}
      onSubmit={handleSubmit}
      isValid={name && email && password}
    >
      <label htmlFor="email" className="modal__label">
        Email*{""}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{""}
        <input
          type="password"
          className="modal__input"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name *{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL *{""}
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          onChange={(e) => setAvatarUrl(e.target.value)}
          value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
