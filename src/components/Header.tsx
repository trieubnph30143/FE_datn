import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../images/f8-icon.18cd71cfcfa33566a22b.png";
import { RiSearchLine } from "react-icons/ri";
const Header = () => {
  return (
    <Box
      padding={"10px 10px 15px 10px"}
      position={"fixed"}
      width={"calc(100% - 20px)"}
      top={0}
      left={0}
      borderBottom={"1px solid #dddddd"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <img
            src={logo}
            width={38}
            height={38}
            style={{ borderRadius: "8px", objectFit: "contain" }}
            alt='logo'
          />
          <Typography fontWeight={700}>Học Lập Trình Để Đi Làm</Typography>
        </Stack>
        <Box>
          <TextField
            type={"text"}
            sx={{
              width: "420px",

              ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "5px",
              },
              ".css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "20px",
                height: "40px",
              },
            }}
            placeholder='Tìm kiếm khóa học, bài viết, video, ...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <RiSearchLine />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack direction={"row"} gap={2}>
          <Button sx={{ color: "black" }}>Đăng nhập</Button>
          <Button
            sx={{
              background: "linear-gradient(to right bottom, #ff8f26, #ff5117)",
              color: "white",
              borderRadius: "99px",
              width: "92px",
              height: "34px",
            }}>
            Đăng Ký
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
