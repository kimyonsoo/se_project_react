import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  const itemLikeButtonClassName = `...`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    console.log("item:", item);
    console.log("isLiked:", isLiked);
    console.log("item.owner:", item.owner);

    onCardLike({ id: item._id, isLiked: isLiked });
    console.log("item.likes:", item.likes);
    console.log("isLiked after like:", isLiked);
    console.log("currentUser._id:", currentUser?._id);
    console.log("Type of currentUser._id:", typeof currentUser._id);
  };

  return (
    <li className="card">
      <div className="card__description">
        {" "}
        <h2 className="card__description_title">{item.name}</h2>
        <button
          className={`card__description_like ${
            isLiked ? "card__description_like_active" : ""
          }`}
          onClick={handleLike}
        ></button>
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
