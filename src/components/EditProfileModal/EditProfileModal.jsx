import closeButton from "../../assets/close-button-white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({
  activeModal,
  onCloseModal,
  isOpen,
  onEditProfileSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name: name, avatar: avatarUrl });
    onEditProfileSubmit({ name, avatarUrl });
    console.log("After onEditProfileSubmit");
    console.log({ name: name, avatar: avatarUrl });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      activeModal={activeModal}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      buttonText={"Save changes"}
    >
      <label htmlFor="name" className="modal__label">
        Name *{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder={currentUser?.name || ""}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="2"
          maxLength="30"
          value={name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *{""}
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          name="avatarUrl"
          placeholder={currentUser?.avatar || ""}
          onChange={(e) => setAvatarUrl(e.target.value)}
          value={avatarUrl}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
