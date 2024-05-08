import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,.8)",
        zIndex: 10000,
      }}>
      <Box>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default Loading;
