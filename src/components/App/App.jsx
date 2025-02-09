import "./App.css";
import Header from "../Header/Header";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";

import Main from "../Main/Main";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { addItem, handleResponse, deleteCard, getItems } from "../../utils/api";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const onCloseModal = () => {
    setActiveModal("");
  };

  const handleDeleteButtonClick = () => {
    console.log(selectedCard._id);
    deleteCard(selectedCard._id)
      .then((data) => {
        setClothingItems(
          // After API request, update the clothing items
          // by crateing a copy of the array that filtered the deleted card from it
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        onCloseModal();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    console.log(card.imageUrl);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    //not sure how default clothings can be autodetected as prevItems
    //because we already passed defaultClothingItems to useState(defaultClothingItems)
    addItem({ name, imageUrl, weather })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        onCloseModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const processData = processWeatherData(data);
        setWeatherData(processData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("getItems:", data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddButtonClick={handleAddButtonClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddButtonClick={handleAddButtonClick}
                  clothingItems={clothingItems}
                  onDeleteModal={handleDeleteButtonClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          onCloseModal={onCloseModal}
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
          //This will run in response to an event -> use on convention
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onCloseModal={onCloseModal}
          onDeleteModal={handleDeleteButtonClick}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
