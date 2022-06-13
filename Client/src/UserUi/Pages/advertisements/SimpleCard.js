import React from "react";
import { Card } from "@mui/material";
import { styled } from "@mui/system";

const CardRoot = styled(Card)(() => ({
  height: "100%",
  padding: "20px 24px",
}));

const CardTitle = styled("div")(({ subtitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: !subtitle && "16px",
}));

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <CardRoot>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {children}
    </CardRoot>
  );
};

export default SimpleCard;
