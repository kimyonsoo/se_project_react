import "./ItemModal.css";
import closeButton from "../../assets/close-button-white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onCloseModal, card, onDeleteModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;
  // const isOwn = card?.owner?._id === currentUser._id;

  if (activeModal) {
    console.log("card:", card);
    console.log("card?.owner:", card?.owner);
    console.log(
      "card?.owner && card.owner._id:",
      card?.owner && card.owner._id
    );
    console.log("currentUser?._id:", currentUser?._id);
    console.log("isOwn:", isOwn);
  }

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
          {currentUser && isOwn && (
            <button
              onClick={() => onDeleteModal(card._id)}
              type="text"
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
