import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  handleAddButtonClick,
  clothingItems,
  onDeleteModal,
  onCardLike,
  onProfileEditModal,
  onLogOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onProfileEditModal={onProfileEditModal} onLogOut={onLogOut} />
      </section>
      <section className="profile__clothesSection">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddButtonClick={handleAddButtonClick}
          onCardLike={onCardLike}
          onDeleteModal={onDeleteModal}
        />
      </section>
    </div>
  );
}

export default Profile;
