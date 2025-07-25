import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  onCloseModal,
  onOpenModal,
  secondaryButtonText,
  isOpen,
  onSubmit,
  isValid,
  errorMessage,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onCloseModal} type="button" className="modal__close">
          <img src={closeButton} alt="Close" className="modal__close_icon" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {errorMessage && <span className="modal__error">{errorMessage}</span>}

          <div className="modal__button-container">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                onClick={onOpenModal}
                type="button"
                className="modal__button"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

// {secondaryButtonText && (
//   <button
//     onClick={onOpenModal}
//     type="button"
//     className="modal__button"
//     disabled={!isValid}
//   >
//     {secondaryButtonText}
//   </button>
// )}
