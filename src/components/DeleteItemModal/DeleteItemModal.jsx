import "./DeleteItemModal.css";
import closeButton from "../../assets/close-button-white.svg";

function DeleteItemModal({ activeModal, handleCloseButtonClick, card }) {
  return (
    <div className={`modal ${activeModal === "delete" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={handleCloseButtonClick}
          type="button"
          className="modal__close"
        >
          <img src={closeButton} alt="Close" className="modal__close-icon" />
        </button>
        <div className="modal__container">
          <p className="modal__text">
            Are you sure you want to delet this item?
          </p>
          <p className="modal__text">This action is irreversible.</p>
          <button type="submit" className="modal__delete-button">
            Yes, delete item
          </button>
          <button type="button" className="modal__cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
