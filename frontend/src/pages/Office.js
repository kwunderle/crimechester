import React from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import UserProfile from "../../components/User/UserProfile";
import MapCard from "../../components/Map/MapCard";
import CaseProfile from "../../components/Case/CaseProfile";
import OfficeImage from '../images/offices/detective-office.png';

const OfficeMapCard = () => (
  <MapCard
    title="Your Office"
    image={OfficeImage}
    description="It ain't much, but it's honest work. Sometimes."
  />
);

const OfficeCaseProfile = () => (
  <CaseProfile />
);

const OfficeProfile = () => (
  <UserProfile />
);

const OfficeHome = () => {
  return (
    <BaseLayout
      ProfileCard={OfficeProfile}
      MapCard={OfficeMapCard}
      CaseCard={OfficeCaseProfile}
    />
  );
};

export default OfficeHome;