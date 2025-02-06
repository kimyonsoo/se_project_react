import "./ItemModal.css";
import closeButton from "../../assets/close-button-white.svg";

function ItemModal({ activeModal, onCloseModal, card, onDeleteModal }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onCloseModal} type="button" className="modal__close">
          {" "}
          <img src={closeButton} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={() => onDeleteModal(card._id)}
            type="text"
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
