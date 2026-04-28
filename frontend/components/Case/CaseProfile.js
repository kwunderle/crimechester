import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,

  Grid,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "../../src/API";
import CardButtonGroup from '../../components/Layout/CardButtonGroup';
const URL = '/activecase';

export const CaseProfile = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setData(res.data.case || null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr("Failed to fetch case data.");
        setLoading(false);
      });
  }, []);

  const renderCaseCard = () => {
    if (loading) {
      return <Typography variant="body2">Loading...</Typography>;
    }

    if (!data) {
      return (
        <Card className='styledCard'>
          <Box className='cardHeader'sx={{backgroundColor: "#000",
            color: "#feefce",
            textAlign: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            border: "3px solid #feefce",
            margin: 1,}}>
            <Typography variant="subtitle1">No Case</Typography>
          </Box>

          <CardContent>
            <Grid container spacing={1} direction="column">
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    border: "5px outset #a6895a",
                    textAlign: "center",
                    backgroundColor: "#d3ba8f",
                    color: "#000",
                    mb: 0.5,
                    paddingLeft: 1,
                    paddingRight: 1,
                  }}
                >
                  No New Cases
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#b1633c",
                    padding: 1,
                    textAlign: "justify",
                    mb: 1,
                  }}
                >
                  Explore the town to find new cases.
                </Typography>
                <CardButtonGroup
                  buttons={[
                    { text: "Office", href: "/office" },
                    { text: "Police", href: "/police" },
                  ]}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className='styledCard'>
        <Box className='cardHeader' sx={{backgroundColor: "#000",
            color: "#feefce",
            textAlign: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            border: "3px solid #feefce",
            margin: 1,}}>
        <Typography variant="subtitle1">Active Case</Typography>
      </Box>

        <CardContent>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12}>
            <Typography className='cardSubtitle'variant="body2">
        {data?.name}
      </Typography>
              <Typography
                variant="body2"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#b1633c",
                  padding: 1,
                  textAlign: "justify",
                  margin: 1,
                }}
              >
                {data?.description}
              </Typography>
              <CardButtonGroup
                buttons={[
                  { text: "Crime Scene", href: "/crime-scene" },
                  { text: "Case File", href: "/casefile" },
                ]}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return renderCaseCard();
};

export default CaseProfile;