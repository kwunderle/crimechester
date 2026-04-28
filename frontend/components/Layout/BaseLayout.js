import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

const BaseLayout = ({ ProfileCard, MapCard, CaseCard }) => {
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

    //add event listener to log screen size on window resize
    window.addEventListener("resize", logScreenSize);

    // cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", logScreenSize);
    };
  }, [isExtraSmallScreen, isSmallScreen, isMediumScreen, isLargeScreen]);

  const getLayout = () => {
    if (isExtraSmallScreen || isSmallScreen) {
      return (
        <>
          <Grid item xs={12}>
            <MapCard />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
                <ProfileCard />
              </Grid>
              <Grid item sm={6}>
                <CaseCard />
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
                <ProfileCard />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <MapCard />
                <CaseCard width="100%" />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={4} lg={4}>
                <ProfileCard />
                <CaseCard />
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <MapCard />
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
            <MapCard />
          </Grid>
          <Grid item xs={12}>
            <ProfileCard />
            <CaseCard />
          </Grid>
        </>
      );
    }
  };

  return <Grid container spacing={1}>{getLayout()}</Grid>;
};

BaseLayout.propTypes = {
  ProfileCard: PropTypes.elementType.isRequired,
  MapCard: PropTypes.elementType.isRequired,
  CaseCard: PropTypes.elementType.isRequired,
};

export default BaseLayout;