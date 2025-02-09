import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ClothesSection({ onCardClick, handleAddButtonClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__text">Your items</p>
        <button
          onClick={handleAddButtonClick}
          className="clothes-section__add-clothes-button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
