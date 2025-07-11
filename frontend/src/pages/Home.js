import React, { useEffect } from "react";
import UserProfile from "../../components/User/UserProfile";
import CaseProfile from "../../components/Case/CaseProfile";
import MapCard from "../../components/Map/MapCard";
import MapImage from "../images/maps/crimechestermap.png";
import BaseLayout from "../../components/Layout/BaseLayout";
import CrimechesterSVG from "../images/maps/crimechestermap";

const HomeMapCard = () => (
  <MapCard
    title="City of Crimechester"
    image={MapImage}
    description="Welcome to Crimechester. If you lived here, you'd be crime."
  />
);

const HomeCaseCard = () => (
  <CaseProfile />
);

const HomeProfileCard = () => (
  <UserProfile />
);

const Home = () => {
  return (
    <BaseLayout
      ProfileCard={HomeProfileCard}
      MapCard={HomeMapCard}
      CaseCard={HomeCaseCard}
    />
  );
};

export default Home;