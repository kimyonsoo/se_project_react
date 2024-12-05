import "./ItemModal.css";
import closeButton from "../../assets/close-button-white.svg";

function ItemModal({ activeModal, handleCloseButtonClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseButtonClick}
          type="button"
          className="modal__close"
        >
          {" "}
          <img src={closeButton} alt="Close" className="modal__close-icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
