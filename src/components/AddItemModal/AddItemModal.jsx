import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({
  isOpen,
  activeModal,
  onCloseModal,
  onAddItemModalSubmit,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const { name, imageUrl, weather } = values;
      onAddItemModalSubmit({ name, imageUrl, weather });
    }
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      activeModal={activeModal}
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Name{""}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="itemName"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label className="modal__label">
        Image{""}
        <input
          name="imageUrl"
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl || ""}
        />
        <span className="modal__error">{errors.imageUrl}</span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <div className="modal__radio-option">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
          </label>
        </div>
        <div className="modal__radio-option">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-option">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
          {/* {
          I initially tried wrapping the input inside the label as suggested, but it broke the visual styling and bold text feedback for checked radio buttons. I decided to revert to using htmlFor + id, which still keeps the label and input correctly associated while preserving the UI behavior.} */}
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
