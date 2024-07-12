import React from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import UserProfile from "../../components/User/UserProfile";
import MapCard from "../../components/Map/MapCard";
import CaseProfile from "../../components/Case/CaseProfile";
import BallroomImage from '../images/places/ballroom.jpg';

const BallroomMapCard = () => (
  <MapCard
    title="Sinclair Mansion - Ballroom"
    image={BallroomImage}
    description="There was certainly a party here last night."
  />
);

const BallroomCaseProfile = () => (
  <CaseProfile />
);

const BallroomProfile = () => (
  <UserProfile />
);

const BallroomHome = () => {
  return (
    <BaseLayout
      ProfileCard={BallroomProfile}
      MapCard={BallroomMapCard}
      CaseCard={BallroomCaseProfile}
    />
  );
};

export default BallroomHome;