import "./App.css";
import Header from "../Header/Header";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Main from "../Main/Main";
import { useContext, useEffect, useState } from "react";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import {
  addItem,
  deleteCard,
  getItems,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

import Profile from "../Profile/Profile";

import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onRegisterModal = () => {
    setActiveModal("register");
  };

  const onLoginModal = () => {
    setActiveModal("login");
  };

  const onEditModal = () => {
    setActiveModal("edit-profile");
  };

  const handleAddButtonClick = () => {
    setActiveModal("add-garment");
  };

  const onCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        onCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  const handleDeleteButtonClick = () => {
    deleteCard(selectedCard._id, jwt)
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
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCardClose = () => {
    onCloseModal();
    setSelectedCard({});
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    //not sure how default clothings can be autodetected as prevItems
    //because we already passed defaultClothingItems to useState(defaultClothingItems)
    addItem({ name, imageUrl, weather }, jwt)
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        onCloseModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((res) => {
            const updatedCard = res.data;
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === updatedCard._id ? updatedCard : item
              )
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((res) => {
            const updatedCard = res.data;
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === updatedCard._id ? updatedCard : item
              )
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegister = ({ name, email, password, avatar }) => {
    return auth
      .register({ name, email, password, avatar })
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .login({ email, password })
      .then((res) => {
        return auth.checkToken(res.token).then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
          onCloseModal();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProfileEdit = ({ name, avatarUrl }) => {
    console.log("Submitting name:", name);
    console.log("Submitting avatarUrl:", avatarUrl);
    updateProfile({ name, avatarUrl }, jwt)
      .then((data) => {
        console.log("API response data:", data);

        setCurrentUser(data);
        onCloseModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (!jwt) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }
    auth
      .checkToken(jwt)
      .then((res) => {
        // console.log("Full response:", res);

        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(console.error);
  }, []);

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
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddButtonClick={handleAddButtonClick}
              weatherData={weatherData}
              onRegisterModal={onRegisterModal}
              onLoginModal={onLoginModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddButtonClick={handleAddButtonClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      onDeleteModal={handleDeleteButtonClick}
                      onProfileEditModal={onEditModal}
                      onLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            activeModal={activeModal}
            isOpen={activeModal === "register"}
            onCloseModal={onCloseModal}
            onLoginModal={onLoginModal}
            onRegisterModal={handleRegister}
          />

          <LoginModal
            activeModal={activeModal}
            isOpen={activeModal === "login"}
            onCloseModal={onCloseModal}
            onLoginModal={handleLogin}
            onRegisterModal={onRegisterModal}
          />

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
            onCloseModal={handleCardClose}
            onDeleteModal={handleDeleteButtonClick}
          />

          <EditProfileModal
            activeModal={activeModal}
            onEditProfileSubmit={handleProfileEdit}
            isOpen={activeModal === "edit-profile"}
            onCloseModal={onCloseModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
