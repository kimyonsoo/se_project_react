import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseButtonClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <h2 className="modal__title">{title}</h2>
      <button
        onClick={handleCloseButtonClick}
        type="button"
        className="modal__close"
      >
        Close Icon
      </button>
      <form className="modal__form">
        {children}
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
