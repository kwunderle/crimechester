import React from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import UserProfile from "../../components/User/UserProfile";
import MapCard from "../../components/Map/MapCard";
import CaseProfile from "../../components/Case/CaseProfile";
import MansionImage from '../images/places/mansion.jpg';

const MansionMapCard = () => (
    <MapCard
    title="Mansion"
    image={MansionImage}
    description="Welcome to the Sinclair Mansion. Discover its secrets."
  />
);

const MansionCaseProfile = () => (
  <CaseProfile />
);

const MansionProfile = () => (
  <UserProfile />
);

const MansionHome = () => {
  return (
    <BaseLayout
      ProfileCard={MansionProfile}
      MapCard={MansionMapCard}
      CaseCard={MansionCaseProfile}
    />
  );
};

export default MansionHome;