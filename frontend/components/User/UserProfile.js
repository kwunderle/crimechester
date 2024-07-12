import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, useMediaQuery, useTheme, } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "../../src/API";

const URL = "/userdata"
import UserAvatar from "./UserAvatar"; // Make sure to import the UserAvatar component

const UserProfile = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUserData = async () => {
    try {
      const response = await axios.get(URL, { withCredentials: true });
      if (response.data.Status === "Success") {
        setData(response.data.user);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setErr("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Card className='styledCard'>
      <Box className='cardHeader' sx={{backgroundColor: "#000",
            color: "#feefce",
            textAlign: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            border: "3px solid #feefce",}}>
        <Typography variant="subtitle1">{data?.classID}</Typography>
      </Box>
      <Typography className='cardSubtitle'variant="body2">
        {data?.name}
      </Typography>
      <CardContent>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            borderRadius: "10px",
            backgroundColor: "#b1633c",
            padding: 1,
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            textAlign="center"
            alignItems="center"
          >
            <Box className="columnBox">
              <Grid container spacing={1} direction={{ xs: 'row', sm: 'row', md: 'column' }} alignItems="center">
                <Grid item xs={6} sm={6} md={12}>
                  <UserAvatar />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <Box sx={{ textAlign: 'center', objectFit: 'cover' }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        backgroundColor: "#000",
                        color: "#feefce", // Off white
                        textAlign: "center",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        border: "3px solid #b1633c",
                        padding: "4px 8px",
                        margin: "auto",
                      }}
                    >
                      Rank
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        backgroundColor: "#835d3c",
                        borderBottomLeftRadius: "15px",
                        borderBottomRightRadius: "15px",
                        border: "3px solid black",
                        color: "#feefce",
                      }}
                    >
                      {data?.rank}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Box className="statsBox">
              <Grid container>
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <Typography className="statsTypography" variant="body2">
                    <strong>Charisma:</strong>{" "}
                  </Typography>
                  <Typography className="statsTypography" variant="body2">
                    <strong>Endurance:</strong>{" "}
                  </Typography>
                  <Typography className="statsTypography" variant="body2">
                    <strong>Intelligence:</strong>
                  </Typography>
                  <Typography className="statsTypography" variant="body2">
                    <strong>Stealth:</strong>
                  </Typography>
                  <Typography className="statsTypography" variant="body2">
                    <strong>Strength:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <Typography className="statsNumberTypography" variant="body2">
                    {data?.charisma}
                  </Typography>
                  <Typography className="statsNumberTypography" variant="body2">
                    {data?.endurance}
                  </Typography>
                  <Typography className="statsNumberTypography" variant="body2">
                    {data?.intelligence}
                  </Typography>
                  <Typography className="statsNumberTypography" variant="body2">
                    {data?.stealth}
                  </Typography>
                  <Typography className="statsNumberTypography" variant="body2">
                    {data?.strength}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserProfile;