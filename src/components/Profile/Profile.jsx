import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  handleAddButtonClick,
  clothingItems,
  onDeleteModal,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothesSection">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddButtonClick={handleAddButtonClick}
          onDeleteModal={onDeleteModal}
        />
      </section>
    </div>
  );
}

export default Profile;
