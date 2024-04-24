import { Box, Button, Stack, Typography } from "@mui/material";
import product from "../images/product.png";

const Product = () => {
  return (
    <Box width={"303px"}>
      <Box sx={{ position: "relative", height: "170px" }}>
        <img
          src={product}
          width={"100%"}
          style={{ borderRadius: "18px" }}
          alt=''
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,.5)",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "0.5s",
            "&:hover": {
              opacity: 1,
            },
            "&:hover button": {
              transform: "translateY(0px)",
            },
          }}>
          <Button
            sx={{
              background: "white",
              color: "black",
              height: "30px",
              borderRadius: "20px",
              fontSize: "12px",
              transition: ".5s",
              transform: "translateY(20px)",
              "&:hover": {
                color: "black", // Thay đổi màu chữ khi hover
                backgroundColor: "white",
              },
            }}>
            Xem khóa học
          </Button>
        </Box>
      </Box>
      <Box mt={"10px"}>
        <Typography variant='h6' fontSize={"16px"}>
          HTML CSS Pro
        </Typography>
        <Stack direction={"row"} gap={1.5}>
          <Typography sx={{ textDecoration: "line-through" }}>
            2.500.000
          </Typography>
          <Typography sx={{ color: "red" }}>1.500.000</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Product;
