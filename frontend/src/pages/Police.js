import React from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import UserProfile from "../../components/User/UserProfile";
import MapCard from "../../components/Map/MapCard";
import CaseProfile from "../../components/Case/CaseProfile";
import PoliceImage from '../images/places/police.jpg';

const PoliceMapCard = () => (
    <MapCard
    title="Police Department"
    image={PoliceImage}
    description="Welcome to the Police Department. Here, justice is served."
  />
);

const PoliceCaseProfile = () => (
  <CaseProfile />
);

const PoliceProfile = () => (
  <UserProfile />
);

const PoliceHome = () => {
  return (
    <BaseLayout
      ProfileCard={PoliceProfile}
      MapCard={PoliceMapCard}
      CaseCard={PoliceCaseProfile}
    />
  );
};

export default PoliceHome;