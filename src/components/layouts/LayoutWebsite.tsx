import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";
import { Box } from "@mui/material";

const LayoutWebsite = () => {
  return (
    <div>
      <Header />
      <Box
        width={"96px"}
        height={"100vh"}
        position={"fixed"}
        left={0}
        top={0}
        paddingTop={"80px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}>
        <SideBar />
      </Box>
      <Outlet />
    </div>
  );
};

export default LayoutWebsite;
