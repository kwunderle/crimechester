import React, { useEffect } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import UserProfile from "../../components/User/UserProfile";
import CaseProfile from "../../components/Case/CaseProfile";
import MapCard from "../../components/Map/MapCard";
import MapImage from "../images/maps/crimechestermap.png";

const Home = () => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const logScreenSize = () => {
      if (isExtraSmallScreen) {
        console.log("Current screen size: xs");
      } else if (isSmallScreen) {
        console.log("Current screen size: sm");
      } else if (isMediumScreen) {
        console.log("Current screen size: md");
      } else if (isLargeScreen) {
        console.log("Current screen size: lg");
      } else {
        console.log("Current screen size: unknown, defaulting to: xs");
      }
    };

    logScreenSize();

    window.addEventListener("resize", logScreenSize);

    return () => {
      window.removeEventListener("resize", logScreenSize);
    };
  }, [isExtraSmallScreen, isSmallScreen, isMediumScreen, isLargeScreen]);

  const getLayout = () => {
    if (isExtraSmallScreen || isSmallScreen) {
      return (
        <>
          <Grid item xs={12}>
            <MapCard 
              title="City of Crimechester"
              image={MapImage}
              description="Welcome to Crimechester. If you lived here, you'd be crime."
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
                <UserProfile />
              </Grid>
              <Grid item sm={6}>
                <CaseProfile />
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    } else if (isMediumScreen || isLargeScreen) {
      return (
        <>
          {isMediumScreen ? (
            <>
              <Grid item xs={12} md={4} lg={4}>
                <UserProfile />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <MapCard 
                  title="City of Crimechester"
                  image={MapImage}
                  description="Welcome to Crimechester. If you lived here, you'd be crime."
                />
                <CaseProfile width="100%" />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={4} lg={4}>
                <UserProfile />
                <CaseProfile />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <MapCard 
                  title="City of Crimechester"
                  image={MapImage}
                  description="Welcome to Crimechester. If you lived here, you'd be crime."
                />
              </Grid>
            </>
          )}
        </>
      );
    } else {
      //default layout for unknown screen size
      return (
        <>
          <Grid item xs={12}>
            <MapCard 
              title="City of Crimechester"
              image={MapImage}
              description="Welcome to Crimechester. If you lived here, you'd be crime."
            />
          </Grid>
          <Grid item xs={12}>
            <UserProfile />
            <CaseProfile />
          </Grid>
        </>
      );
    }
  };

  return (
    <Grid container spacing={1}>
      {getLayout()}
    </Grid>
  );
};

export default Home;