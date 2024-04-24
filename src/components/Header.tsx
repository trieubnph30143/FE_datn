import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../images/f8-icon.18cd71cfcfa33566a22b.png";
import user from "../images/personal-18px.svg";
import google from "../images/google-18px.svg";
import github from "../images/github-18px.svg";
import fb from "../images/facebook-18px.svg";
import { RiArrowLeftSLine, RiCloseLine, RiSearchLine } from "react-icons/ri";
import { useState } from "react";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState("");
  const [select, setSelect] = useState(true);
  const [registerType, setRegisterType] = useState(false);

  const handleClose = () => {
    setCheck("");
    setSelect(true);
    setRegisterType(false);
    setOpen(false);
  };
  const handleCheck = (type: string) => {
    if (type == "login") {
      setCheck(type);
      setOpen(true);
    } else {
      setCheck(type);
      setOpen(true);
    }
  };

  return (
    <Box
      padding={"10px 20px 15px 20px"}
      position={"fixed"}
      width={"calc(100% - 40px)"}
      zIndex={1}
      top={0}
      left={0}
      bgcolor={"white"}
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
          <Button onClick={() => handleCheck("login")} sx={{ color: "black" }}>
            Đăng nhập
          </Button>
          <Button
            onClick={() => handleCheck("register")}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ borderRadius: "15px" }}>
        <Box sx={{ position: "relative", width: "540px", height: "660px" }}>
          <Box
            onClick={handleClose}
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              background: "rgba(22, 24, 35, .03)",
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: 1,
            }}>
            <RiCloseLine size={"20px"} />
          </Box>
          {check === "login" ? (
            <Box
              sx={{
                textAlign: "center",
                padding: "80px 20px 60px",
                position: "relative",
              }}>
              {!select ? (
                <Box
                  onClick={() => setSelect(!select)}
                  sx={{ position: "absolute", top: "14%", left: "25px" }}>
                  <RiArrowLeftSLine size={"30px"} />
                </Box>
              ) : (
                ""
              )}

              <Box>
                <img
                  width={40}
                  height={40}
                  style={{ borderRadius: "10px" }}
                  src={logo}
                  alt=''
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant='h5'
                fontSize={"27px"}>
                Đăng nhập tài khoản f8
              </Typography>
              <Typography my={"10px"} fontSize={"13px"} color={"#f33a58"}>
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người
                sử <br></br>dụng chung có thể sẽ bị khóa.
              </Typography>
              {select ? (
                <Stack
                  direction={"column"}
                  alignItems={"center"}
                  gap={"20px"}
                  my={"20px"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={user} width={20} height={20} alt='' />
                    </Box>
                    <Box onClick={() => setSelect(!select)} width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Sử dụng email / số điện thoại
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={google} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng nhập với Google
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={fb} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng nhập với Facebook
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={github} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng nhập với Github
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                <Box my={"20px"}>
                  <Box padding={"0 65px"}>
                    <Box mt={"10px"}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"flex-end"}>
                        <Typography
                          marginLeft={"15px"}
                          textAlign={"left"}
                          fontSize={"14px"}
                          fontWeight={"600"}>
                          {registerType ? " Số điện thoại" : "Email"}
                        </Typography>
                        <Typography
                          sx={{ position: "relative", zIndex: 10 }}
                          onClick={() => setRegisterType(!registerType)}
                          fontSize={"12px"}
                          color={"#666"}>
                          {registerType
                            ? " Đăng nhập với Email"
                            : "Đăng nhập với SĐT"}
                        </Typography>
                      </Stack>
                      <TextField
                        sx={{
                          width: "100%",
                          height: "42px",
                          mt: "5px",
                          borderRadius: "30px",
                          ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ":
                            {
                              borderRadius: "30px",
                            },
                          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "28px",
                            },
                        }}
                        helperText=' '
                        placeholder={registerType ? "Số điện thoại" : "Email"}
                        id='demo-helper-text-aligned-no-helper'
                        size='small'
                      />
                      {!registerType ? (
                        <TextField
                          sx={{
                            width: "100%",
                            height: "42px",
                            mt: "10px",
                            borderRadius: "30px",
                            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ":
                              {
                                borderRadius: "30px",
                              },
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                height: "28px",
                              },
                          }}
                          helperText=' '
                          type='password'
                          placeholder={"Password"}
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                        />
                      ) : (
                        <TextField
                          sx={{
                            width: "100%",
                            height: "42px",
                            mt: "15px",
                            borderRadius: "30px",
                            ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                              {
                                borderRadius: "30px",
                                paddingRight: "3px",
                              },
                            ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input":
                              {
                                height: "28px",
                              },
                          }}
                          helperText=' '
                          placeholder='Nhập mã xác nhận'
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Button
                                  sx={{
                                    color: "white",
                                    background: "#f05123",
                                    borderRadius: "30px",
                                    width: "100px",
                                    height: "41px",
                                  }}>
                                  Gửi mã
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Box>
                    <Box>
                      <Button
                        sx={{
                          width: "100%",
                          height: "44px",
                          background:
                            "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                          color: "white",
                          borderRadius: "30px",
                          mt: "20px",
                          fontWeight: "700",
                        }}>
                        Đăng ký
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              <Typography fontSize={"14px"} color={"#333"}>
                Bạn chưa có tài khoản?{" "}
                <b
                  onClick={() => {
                    setCheck("register");
                    setSelect(true);
                    setRegisterType(false);
                  }}
                  style={{ color: "#f05123" }}>
                  Đăng ký
                </b>
              </Typography>
              <Typography fontSize={"11px"} color={"#666"} mt={"20px"}>
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                <br></br> với{" "}
                <a style={{ textDecoration: "underline" }}>
                  điều khoản sử dụng
                </a>{" "}
                của chúng tôi.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", padding: "80px 20px 60px" }}>
              {!select ? (
                <Box
                  onClick={() => setSelect(!select)}
                  sx={{ position: "absolute", top: "14%", left: "25px" }}>
                  <RiArrowLeftSLine size={"30px"} />
                </Box>
              ) : (
                ""
              )}
              <Box>
                <img
                  width={40}
                  height={40}
                  style={{ borderRadius: "10px" }}
                  src={logo}
                  alt=''
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant='h5'
                fontSize={"27px"}>
                Đăng ký tài khoản f8
              </Typography>
              <Typography my={"10px"} fontSize={"13px"} color={"#f33a58"}>
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người
                sử <br></br>dụng chung có thể sẽ bị khóa.
              </Typography>
              {select ? (
                <Stack
                  direction={"column"}
                  alignItems={"center"}
                  gap={"20px"}
                  my={"20px"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={user} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography
                        onClick={() => setSelect(!select)}
                        fontSize={"13px"}
                        fontWeight={"600"}>
                        Sử dụng email / số điện thoại
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={google} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng ký với Google
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={fb} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng ký với Facebook
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={github} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng ký với Github
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                <Box my={"20px"}>
                  <Box padding={"0 65px"}>
                    <Box>
                      <Typography
                        marginLeft={"15px"}
                        textAlign={"left"}
                        fontSize={"14px"}
                        fontWeight={"600"}>
                        Tên của bạn?
                      </Typography>
                      <TextField
                        sx={{
                          width: "100%",
                          height: "42px",
                          mt: "5px",
                          borderRadius: "30px",
                          ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ":
                            {
                              borderRadius: "30px",
                            },
                          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "28px",
                            },
                        }}
                        helperText=' '
                        placeholder='Họ và tên của bạn'
                        id='demo-helper-text-aligned-no-helper'
                        size='small'
                      />
                    </Box>
                    <Box mt={"10px"}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"flex-end"}>
                        <Typography
                          marginLeft={"15px"}
                          textAlign={"left"}
                          fontSize={"14px"}
                          fontWeight={"600"}>
                          {registerType ? " Số điện thoại" : "Email"}
                        </Typography>
                        <Typography
                          sx={{ position: "relative", zIndex: 10 }}
                          onClick={() => setRegisterType(!registerType)}
                          fontSize={"12px"}
                          color={"#666"}>
                          {registerType
                            ? " Đăng ký với Email"
                            : "Đăng ký với SĐT"}
                        </Typography>
                      </Stack>

                      <TextField
                        sx={{
                          width: "100%",
                          height: "42px",
                          mt: "5px",
                          borderRadius: "30px",
                          ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ":
                            {
                              borderRadius: "30px",
                            },
                          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "28px",
                            },
                        }}
                        helperText=' '
                        placeholder={registerType ? "Số điện thoại" : "Email"}
                        id='demo-helper-text-aligned-no-helper'
                        size='small'
                      />
                      <TextField
                        sx={{
                          width: "100%",
                          height: "42px",
                          mt: "15px",
                          borderRadius: "30px",
                          ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                            {
                              borderRadius: "30px",
                              paddingRight: "3px",
                            },
                          ".css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "28px",
                            },
                        }}
                        helperText=' '
                        placeholder='Nhập mã xác nhận'
                        id='demo-helper-text-aligned-no-helper'
                        size='small'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Button
                                sx={{
                                  color: "white",
                                  background: "#f05123",
                                  borderRadius: "30px",
                                  width: "100px",
                                  height: "41px",
                                }}>
                                Gửi mã
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box>
                      <Button
                        sx={{
                          width: "100%",
                          height: "44px",
                          background:
                            "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                          color: "white",
                          borderRadius: "30px",
                          mt: "20px",
                          fontWeight: "700",
                        }}>
                        Đăng ký
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              <Typography fontSize={"14px"} color={"#333"}>
                Bạn đã có tài khoản?{" "}
                <b
                  onClick={() => {
                    setCheck("login");
                    setSelect(true);
                    setRegisterType(false);
                  }}
                  style={{ color: "#f05123" }}>
                  Đăng nhập
                </b>
              </Typography>
              <Typography fontSize={"11px"} color={"#666"} mt={"20px"}>
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                <br></br> với{" "}
                <a style={{ textDecoration: "underline" }}>
                  điều khoản sử dụng
                </a>{" "}
                của chúng tôi.
              </Typography>
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Header;
