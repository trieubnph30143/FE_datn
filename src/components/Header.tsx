import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Popover,
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
import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import profile from "../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import product from "../images/product.png";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useCoursesContext } from "@/App";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getUserProgress } from "@/service/progress";
import { getMyCourses } from "@/service/courses";
import { useLocalStorage } from "@/hooks/useStorage";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/core/firebase";
import { calculateProgress } from "@/utils/utils";
import { getUserPost, updatePost } from "@/service/post";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElNotify, setAnchorElNotify] =
    useState<HTMLButtonElement | null>(null);
  const [anchorElProfile, setAnchorElProfile] =
    useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState("");
  const [select, setSelect] = useState(true);
  const [registerType, setRegisterType] = useState(false);
  const openCourses = Boolean(anchorEl);
  const id = openCourses ? "simple-popover" : undefined;
  const openNotify = Boolean(anchorElNotify);
  const idNotify = openNotify ? "simple-popover" : undefined;
  const openProfile = Boolean(anchorElProfile);
  const idProfile = openProfile ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const context: any = useCoursesContext();
  const [, setUser] = useLocalStorage("user", {});
  const queryClient = useQueryClient();
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courses, setCourses] = useState([]);
  const [progressBar, setProgressBar] = useState([]);
  const handleClose = () => {
    setCheck("");
    setSelect(true);
    setRegisterType(false);
    setOpen(false);
  };
  const { register, reset, handleSubmit, onFinish }: any = useAuthMutation({
    action: check == "login" ? "SIGNIN" : "SIGNUP",
    onSuccess: async (data) => {
      if (check !== "login") {
        if (data.token && data.refeshToken) {
          if (data.status == 0) {
            queryClient.invalidateQueries({
              queryKey: ["my_courses"],
            });
            handleClose();
            context.dispatch({
              type: "LOGIN",
              payload: {
                ...context.state,
                user: [data.data[0]],
              },
            });
            let res: any = await getUserProgress(data.data[0]._id);
            context.dispatch({
              type: "PROGRESS",
              payload: {
                ...context.state,
                progress: res.data,
              },
            });
          }
        } else {
          if (data.status == 1) {
            alert(data.message);
          } else {
            reset();
            setCheck("login");
            setSelect(true);
            setRegisterType(false);
          }
        }
      } else {
        if (data.status == 0) {
          queryClient.invalidateQueries({
            queryKey: ["my_courses"],
          });
          handleClose();
          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: data.data,
            },
          });
          let res: any = await getUserProgress(data.data[0]._id);
          context.dispatch({
            type: "PROGRESS",
            payload: {
              ...context.state,
              progress: res.data,
            },
          });
        }
      }
    },
  });
  const signInWithGoogle = async () => {
    try {
      setCheck("register");
      const result: any = await signInWithPopup(auth, googleProvider);
      if (Object.keys(result)[0]) {
        onFinish({
          email: result.user.email,
          user_name: result.user.displayName,
          uid: result.user.uid,
          type: "google",
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
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

  const handleClickCourses = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLoadingCourses(true);
    setAnchorEl(event.currentTarget);
    try {
      let data: any = await getMyCourses(context.state.user[0]._id);
      let progress: any = await getUserProgress(context.state.user[0]._id);

      if (data.status == 0 && progress.status == 0) {
        let arr = calculateProgress(progress.data);
        setProgressBar(arr);
        setCourses(data.data);
        setLoadingCourses(false);
      }
    } catch (error) {
      setLoadingCourses(false);
    }
  };

  const handleClickNotify = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotify(event.currentTarget);
  };
  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseCourses = () => {
    setAnchorEl(null);
  };
  const handleCloseNotify = () => {
    setAnchorElNotify(null);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const handleLogout = () => {
    setUser({});
    context.dispatch({
      type: "LOGOUT",
    });
    setAnchorElProfile(null);
  };

  const { data: data_post_user } = useQuery(
    ["post_user", context.state.user[0]],
    {
      queryFn: () => {
        return getUserPost(context.state.user[0]._id);
      },

      refetchOnWindowFocus: false,
    }
  );

  const handleNotify = async (data: any) => {
    try {
      if (data.notify) {
        navigate(`/detail_blog/${data._id}`);
        handleCloseNotify();
      } else {
        let res = await updatePost({
          ...data,
          author: [data.author[0]._id],
          notify: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["post_user"],
        });
        navigate(`/detail_blog/${data._id}`);
        handleCloseNotify();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      padding={"10px 20px 15px 20px"}
      position={"fixed"}
      width={"100%"}
      zIndex={100}
      top={0}
      left={0}
      bgcolor={"white"}
      borderBottom={"1px solid #dddddd"}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <img
            src={logo}
            width={38}
            height={38}
            style={{ borderRadius: "8px", objectFit: "contain" }}
            alt="logo"
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
            placeholder="Tìm kiếm khóa học, bài viết, video, ..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiSearchLine />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {Object.keys(context.state.user)[0] ? (
          <Stack direction={"row"} gap={"30px"} alignItems={"center"}>
            <Box>
              <Typography
                aria-describedby={id}
                onClick={handleClickCourses}
                fontSize={"14px"}
              >
                Khóa học của tôi
              </Typography>
              <Popover
                id={id}
                open={openCourses}
                anchorEl={anchorEl}
                onClose={handleCloseCourses}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box p={"15px"} width={"380px"}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight={"600"}>Khóa học của tôi</Typography>
                    <Typography fontSize={"13px"} color={"#ff5117"}>
                      {" "}
                      Xem tất cả
                    </Typography>
                  </Stack>
                  <Stack
                    className="see-more"
                    mt={"20px"}
                    direction={"column"}
                    gap={"14px"}
                    maxHeight={"400px"}
                    sx={{ overflowY: "scroll" }}
                  >
                    {loadingCourses && (
                      <Box
                        height={40}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <CircularProgress size={"20px"} />
                      </Box>
                    )}
                    {!loadingCourses && (
                      <>
                        {" "}
                        {courses == undefined || courses.length == 0 ? (
                          <>
                            <Typography textAlign={"center"}>
                              Not found data
                            </Typography>
                          </>
                        ) : (
                          <>
                            {courses &&
                              courses.map((item: any, index) => {
                                return (
                                  <Stack
                                    direction={"row"}
                                    p={'5px'}
                                    borderRadius={"5px"}
                                    sx={{
                                      "&:hover": {
                                        backgroundColor: "#dddddd",
                                      },
                                    }}
                                    gap={"20px"}
                                  >
                                    <Box>
                                      <img
                                        src={item.image.url}
                                        width={120}
                                        height={67}
                                        style={{ borderRadius: "6px" }}
                                        alt=""
                                      />
                                    </Box>
                                    <Box>
                                      <Typography
                                        fontSize={"14px"}
                                        fontWeight={"bold"}
                                      >
                                        {item.title}
                                      </Typography>

                                      <ProgressBar
                                        percentage={progressBar[index]}
                                      />
                                    </Box>
                                  </Stack>
                                );
                              })}
                          </>
                        )}
                      </>
                    )}
                  </Stack>
                </Box>
              </Popover>
            </Box>
            <Box>
              <Typography
                aria-describedby={idNotify}
                onClick={handleClickNotify}
              >
                <Badge
                  badgeContent={
                    data_post_user?.status == 0 &&
                    data_post_user.data.filter(
                      (item: any) => item.active && !item.notify
                    ).length
                  }
                  color="primary"
                >
                  <NotificationsIcon />
                </Badge>
              </Typography>
              <Popover
                id={idNotify}
                open={openNotify}
                anchorEl={anchorElNotify}
                onClose={handleCloseNotify}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box p={"15px"} width={"450px"}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight={"600"}>Thông báo</Typography>
                    <Typography fontSize={"13px"} color={"#ff5117"}>
                      {" "}
                      Đánh dấu đã đọc
                    </Typography>
                  </Stack>
                  <Stack
                    className="see-more"
                    mt={"20px"}
                    direction={"column"}
                    gap={"14px"}
                    maxHeight={"400px"}
                    sx={{ overflowY: "scroll" }}
                  >
                    {data_post_user?.status == 0 &&
                      data_post_user.data.length &&
                      data_post_user.data.map((item: any) => {
                        if (item.active) {
                          return (
                            <Stack
                              direction={"row"}
                              onClick={() => handleNotify(item)}
                              sx={{
                                "&:hover": {
                                  backgroundColor: "#dddddd",
                                },
                              }}
                              bgcolor={item.notify ? undefined : "#dddddd"}
                              p={"5px"}
                              borderRadius={"5px"}
                              gap={"15px"}
                            >
                              <Box>
                                <img
                                  src={item.image.url}
                                  width={80}
                                  height={60}
                                  style={{
                                    borderRadius: "5px",
                                    objectFit: "cover",
                                  }}
                                  alt=""
                                />
                              </Box>
                              <Box p={"5px"}>
                                <Badge
                                  color="secondary"
                                  invisible={item.notify}
                                  variant="dot"
                                >
                                  <Typography sx={{ width: "300px" }}>
                                    {item.title}
                                  </Typography>
                                </Badge>
                              </Box>
                            </Stack>
                          );
                        }
                      })}
                  </Stack>
                </Box>
              </Popover>
            </Box>

            <Box>
              <Typography aria-describedby={id} onClick={handleClickProfile}>
                <img
                  src={
                    context.state.user[0].image.url
                      ? context.state.user[0].image.url
                      : profile
                  }
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                  alt=""
                />
              </Typography>
              <Popover
                id={idProfile}
                open={openProfile}
                anchorEl={anchorElProfile}
                onClose={handleCloseProfile}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box p={"20px"} width={"200px"}>
                  <Stack direction={"row"} alignItems={"center"} gap={"15px"}>
                    <Box>
                      <img
                        src={
                          context.state.user[0].image.url
                            ? context.state.user[0].image.url
                            : profile
                        }
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%" }}
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Typography fontSize={"14px"} fontWeight={"bold"}>
                        {context.state.user[0].user_name}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction={"column"} mt={"20px"} gap={"18px"}>
                    <Box
                      borderBottom={"1px solid #dddddd"}
                      paddingBottom={"8px"}
                    >
                      <Typography
                        fontSize={"14px"}
                        color={"#333"}
                        onClick={() => {
                          handleCloseProfile();
                          navigate("/profile");
                        }}
                      >
                        Trang cá nhân
                      </Typography>
                    </Box>
                    <Box
                      borderBottom={"1px solid #dddddd"}
                      paddingBottom={"8px"}
                    >
                      <Typography
                        fontSize={"14px"}
                        color={"#333"}
                        onClick={() => {
                          handleCloseProfile();
                          navigate("/my_article");
                        }}
                      >
                        Bài viết của tôi
                      </Typography>
                    </Box>
                    <Box
                      borderBottom={"1px solid #dddddd"}
                      onClick={() => {
                        handleCloseProfile();
                        navigate("/setting");
                      }}
                      paddingBottom={"8px"}
                    >
                      <Typography fontSize={"14px"} color={"#333"}>
                        Cài đặt{" "}
                      </Typography>
                    </Box>

                    <Typography
                      onClick={handleLogout}
                      fontSize={"14px"}
                      color={"#333"}
                    >
                      Đăng xuất{" "}
                    </Typography>
                  </Stack>
                </Box>
              </Popover>
            </Box>
          </Stack>
        ) : (
          <Stack direction={"row"} gap={2}>
            <Button
              onClick={() => handleCheck("login")}
              sx={{ color: "black" }}
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => handleCheck("register")}
              sx={{
                background:
                  "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                color: "white",
                borderRadius: "99px",
                width: "92px",
                height: "34px",
              }}
            >
              Đăng Ký
            </Button>
          </Stack>
        )}
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: "15px" }}
      >
        <Box sx={{ position: "relative", width: "540px", maxHeight: "750px" }}>
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
            }}
          >
            <RiCloseLine size={"20px"} />
          </Box>
          {check === "login" ? (
            <Box
              sx={{
                textAlign: "center",
                padding: "80px 20px 60px",
                position: "relative",
              }}
            >
              {!select ? (
                <Box
                  onClick={() => setSelect(!select)}
                  sx={{ position: "absolute", top: "14%", left: "25px" }}
                >
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
                  alt=""
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant="h5"
                fontSize={"27px"}
              >
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
                  my={"20px"}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={user} width={20} height={20} alt="" />
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
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={google} width={20} height={20} alt="" />
                    </Box>
                    <Box width={"80%"} onClick={signInWithGoogle}>
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
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={fb} width={20} height={20} alt="" />
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
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={github} width={20} height={20} alt="" />
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
                  <form onSubmit={handleSubmit(onFinish)}>
                    <Box padding={"0 65px"}>
                      <Box mt={"10px"}>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"flex-end"}
                        >
                          <Typography
                            marginLeft={"15px"}
                            textAlign={"left"}
                            fontSize={"14px"}
                            fontWeight={"600"}
                          >
                            {registerType ? " Số điện thoại" : "Email"}
                          </Typography>
                          <Typography
                            sx={{ position: "relative", zIndex: 10 }}
                            onClick={() => setRegisterType(!registerType)}
                            fontSize={"12px"}
                            color={"#666"}
                          >
                            Đăng nhập với Email
                          </Typography>
                        </Stack>
                        <TextField
                          {...register("email")}
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
                          helperText=" "
                          placeholder={"Email"}
                          id="demo-helper-text-aligned-no-helper"
                          size="small"
                        />
                        <TextField
                          {...register("password")}
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
                          helperText=" "
                          type="password"
                          placeholder={"Password"}
                          id="demo-helper-text-aligned-no-helper"
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Button
                          type="submit"
                          sx={{
                            width: "100%",
                            height: "44px",
                            background:
                              "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                            color: "white",
                            borderRadius: "30px",
                            mt: "20px",
                            fontWeight: "700",
                          }}
                        >
                          Đăng nhập
                        </Button>
                      </Box>
                    </Box>
                  </form>
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
                  style={{ color: "#f05123" }}
                >
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
                  sx={{ position: "absolute", top: "14%", left: "25px" }}
                >
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
                  alt=""
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant="h5"
                fontSize={"27px"}
              >
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
                  my={"20px"}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={user} width={20} height={20} alt="" />
                    </Box>
                    <Box width={"80%"}>
                      <Typography
                        onClick={() => setSelect(!select)}
                        fontSize={"13px"}
                        fontWeight={"600"}
                      >
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
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={google} width={20} height={20} alt="" />
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
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={fb} width={20} height={20} alt="" />
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
                    padding={"10px 0"}
                  >
                    <Box width={"15%"}>
                      <img src={github} width={20} height={20} alt="" />
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
                  <form onSubmit={handleSubmit(onFinish)}>
                    <Box padding={"0 65px"}>
                      <Box>
                        <Typography
                          marginLeft={"15px"}
                          textAlign={"left"}
                          fontSize={"14px"}
                          fontWeight={"600"}
                        >
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
                          {...register("user_name")}
                          helperText=" "
                          placeholder="Họ và tên của bạn"
                          id="demo-helper-text-aligned-no-helper"
                          size="small"
                        />
                      </Box>
                      <Box mt={"10px"}>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"flex-end"}
                        >
                          <Typography
                            sx={{ position: "relative", zIndex: 10 }}
                            onClick={() => setRegisterType(!registerType)}
                            fontSize={"12px"}
                            color={"#666"}
                          >
                            Đăng ký với Email
                          </Typography>
                        </Stack>

                        <TextField
                          {...register("email")}
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
                          helperText=" "
                          placeholder={"Email"}
                          id="demo-helper-text-aligned-no-helper"
                          size="small"
                        />
                      </Box>
                      <Box>
                        <Button
                          type="submit"
                          sx={{
                            width: "100%",
                            height: "44px",
                            background:
                              "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                            color: "white",
                            borderRadius: "30px",
                            mt: "20px",
                            fontWeight: "700",
                          }}
                        >
                          Đăng ký
                        </Button>
                      </Box>
                    </Box>
                  </form>
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
                  style={{ color: "#f05123" }}
                >
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
const ProgressBar = ({ percentage }: any) => {
  return (
    <div
      className="progress-bar-container"
      style={{
        width: "90%",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        overflow: "hidden",
        marginTop: "10px",
      }}
    >
      <div
        className="progress-bar"
        style={{
          height: "9px",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.5s ease",
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
