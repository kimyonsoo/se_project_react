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

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser?.name);
      setAvatarUrl(currentUser?.avatar);
    }
  }, [currentUser, isOpen]);

  return (
    <ModalWithForm
      title="Change profile data"
      activeModal={activeModal}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      buttonText={"Save changes"}
      isValid={name && avatarUrl}
    >
      <label htmlFor="name" className="modal__label">
        Name *{""}
        <input
          type="text"
          className="modal__input"
          id="userName"
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
          id="userAvatarUrl"
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
