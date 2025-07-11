import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, Grid, Typography, styled } from "@mui/material";
import CaseButtonGroup from "../Case/CaseButtonGroup";

const Header = styled(Box)({
  backgroundColor: "#000",
  color: "#feefce",
  padding: 1,
  textAlign: "center",
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  paddingTop: "56.25%", // 16:9 aspect ratio (16/9 = 0.5625)
  overflow: "hidden",
  borderRadius: '10px',
});

const ResponsiveImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const CaseMapCard = ({ title, image, description, buttons }) => {
  return (
    <Card className='styledCard'>
      <Header>
        <Typography variant="h6">{title}</Typography>
      </Header>
      <CardContent sx={{ marginBottom: 0, paddingBottom: 0.5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ImageContainer>
              <ResponsiveImage src={image} alt={title} />
            </ImageContainer>
            <Typography variant="body2" textAlign="center" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1 }}>
          <CaseButtonGroup buttons={buttons} />
        </Box>
      </CardContent>
    </Card>
  );
};

CaseMapCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

export default CaseMapCard;