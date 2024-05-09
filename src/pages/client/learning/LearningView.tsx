import {
  Box,
  Button,
  Drawer,
  Fade,
  Popover,
  Stack,
  StepConnector,
  Tab,
  Tabs,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import logo from "../../../images/f8-icon.18cd71cfcfa33566a22b.png";
import user from "../../../images/user.png";
import {
  RiAddFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiCloseLine,
  RiFile3Fill,
  RiFlagFill,
  RiHeartFill,
  RiMessengerFill,
  RiMoreFill,
  RiPlayCircleFill,
  RiQuestionFill,
  RiStickyNoteFill,
  RiSubtractFill,
  RiYoutubeFill,
} from "react-icons/ri";
import ReplayIcon from "@mui/icons-material/Replay";
import MonacoEditor from "@monaco-editor/react";
import { Editor } from "@tinymce/tinymce-react";
import js from "../../../images/ja.svg";
import html from "../../../images/html.svg";
import css from "../../../images/css.svg";
import Confetti from "canvas-confetti";
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    borderRadius: "30px",
    padding: "4px 15px",
  },
}));
const LearningView = () => {
  return (
    <Box>
      <Header />
      <Stack direction={"row"}>
        <ContentLeftExercise />
        <ContentRight />
      </Stack>
      <Footer />
    </Box>
  );
};

export default LearningView;

const Header = () => {
  return (
    <Stack
      height={"50px "}
      px={"30px"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgcolor={"#29303b"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        color={"white"}
        gap={"15px"}>
        <RiArrowLeftSLine size={25} />
        <img
          src={logo}
          width={30}
          style={{ borderRadius: "8px" }}
          height={30}
          alt=''
        />
        <Typography fontWeight={"bold"} fontSize={"13px"}>
          Lập Trình JavaScript Cơ Bản
        </Typography>
      </Stack>
      <Stack direction={"row"} gap={"20px"}>
        <Stack
          color={"white"}
          direction={"row"}
          alignItems={"center"}
          gap={0.5}
          sx={{
            ".CircularProgressbar .CircularProgressbar-text": {
              fill: "white !important",
              fontSize: "30px !important",
            },
          }}>
          <Box style={{ width: "35px", position: "relative" }}>
            <CircularProgressbar
              value={66}
              text={`${66}%`}
              strokeWidth={7}
              styles={buildStyles({
                strokeLinecap: "round",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `#ff5117`,
                textColor: "#333",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </Box>
          <Typography fontSize={"13px"}>
            <b>180/205</b> bài học
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          color={"white"}
          alignItems={"center"}
          gap={0.5}>
          <RiFile3Fill />
          <Typography fontSize={"13px"}>Ghi chú</Typography>
        </Stack>
        <Stack
          direction={"row"}
          color={"white"}
          alignItems={"center"}
          gap={0.5}>
          <RiQuestionFill />
          <Typography fontSize={"13px"}>Hướng dẫn</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Footer = () => {
  return (
    <Box
      position={"fixed"}
      bottom={0}
      height={"50px"}
      width={"100%"}
      bgcolor={"#F5F5F5"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      left={0}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"35px"}
        justifyContent={"center"}>
        <Button sx={{ color: "black" }}>
          <RiArrowLeftSLine size={25} />
          Bài trước
        </Button>
        <Button
          sx={{
            color: "#ff5117",
            border: "2px solid #ff5117",
            height: "35px",
            px: "15px",
          }}>
          Bài tiếp theo
          <RiArrowRightSLine size={25} />
        </Button>
      </Stack>
    </Box>
  );
};

const ContentLeftVideo = () => {
  const [playing, setPlaying] = useState(true);
  const [etend, setExtend] = useState(false);
  const [etendDad, setExtendDad] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const player: any = useRef(null);

  useEffect(() => {
    if (player.current) {
      player.current.seekTo(0.284015202710177);
    }
  }, [player.current]);

  const handleProgress = (state: any) => {
    if (played !== state.played) {
      setPlayed(state.played);
    }
  };

  const handleEnded = () => {
    console.log("end");
    setPlaying(false);
  };
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const [content, setContent] = useState("");
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  return (
    <Box
      width={"75%"}
      className='scroll-left'
      height={"93vh"}
      sx={{ overflowY: "scroll" }}>
      <Box>
        <Stack className='section'>
          <Box
            sx={{
              width: "100%",
              height: "550px",
              background: "black",
              display: "flex",
              justifyContent: "center",
            }}
            className='player-wrapper'>
            <ReactPlayer
              ref={player}
              className='react-player'
              width='80%'
              height='100%'
              url={"https://www.youtube.com/watch?v=oUFJJNQGwhk"}
              playing={playing}
              controls
              played={played}
              onProgress={handleProgress}
              onEnded={handleEnded}
              onDuration={setDuration}
            />
          </Box>
        </Stack>
        <Box mt={"30px"} padding={"0 10%"}>
          <Typography fontSize={"30px"} fontWeight={"700"}>
            Xử lý báo lỗi cơ bản
          </Typography>
          <Typography fontSize={"14px"} color={"#333"} my={"10px"}>
            Cập nhật tháng 2 năm 2022
          </Typography>
          <Typography mt={"20px"} lineHeight={2.5}>
            Tham gia nhóm Học{" "}
            <a style={{ color: "#ff5117" }} href=''>
              lập trình tại F8
            </a>{" "}
            trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
            <br></br>
            Các bạn subscribe{" "}
            <a style={{ color: "#ff5117" }} href=''>
              kênh Youtube F8 Official
            </a>{" "}
            để nhận thông báo khi có các bài học mới nhé ❤️<br></br>
            Form HTML template:{" "}
            <a style={{ color: "#ff5117" }} href=''>
              https://codepen.io/ng-ngc-sn-the-bashful/pen/mdVEoWP
            </a>
            <br></br>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: "70px" }}>
        <Typography
          fontSize={"14px"}
          color={"#333"}
          sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
          Made with <RiHeartFill size={20} color={"#ff5117"} />· Powered by F8
        </Typography>
      </Box>
      <Box sx={{ position: "fixed", right: "30%", bottom: "10%" }}>
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#ff5117",
            background: "white",
            fontWeight: "700",
            borderRadius: "30px",
            boxShadow: "0 0px 6px grey",
          }}>
          <RiMessengerFill size={20} /> Hỏi đáp
        </Button>
      </Box>
      <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
        <ContentDrawer onClose={toggleDrawer} />
      </Drawer>
    </Box>
  );
};

const ContentRight = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [expanded, setExpanded] = useState([
    true,
    ...Array(arr.length - 1).fill(false),
  ]);
  const [toggle, setToggle] = useState(true);

  const handleTongle = (index: number) => {
    setExpanded((prevExpanded) =>
      prevExpanded.map((item, idx) => (idx === index ? !item : item))
    );
  };
  return (
    <Box
      width={"25%"}
      className='list-learning'
      padding={"15px"}
      sx={{ overflowY: "scroll", height: "93vh" }}>
      <Typography fontWeight={"700"} fontSize={"16px"}>
        Nội dung khóa học
      </Typography>
      {arr.map((item: any, index: any) => {
        return (
          <Box
            mt={"10px"}
            maxHeight={expanded[index] ? "500px" : "47px"}
            overflow={"hidden"}
            sx={{ transition: ".7s" }}>
            <Box>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                onClick={() => handleTongle(index)}
                padding={"10px 20px"}
                bgcolor={"#f5f5f5"}
                borderRadius={"6px"}
                border={"1px solid #ebebeb"}>
                <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                  {expanded[index] ? (
                    <RiSubtractFill size={"25px"} color={"#f05123"} />
                  ) : (
                    <RiAddFill size={"25px"} color={"#f05123"} />
                  )}

                  <Typography fontWeight={"bold"}>
                    1.Khái niệm kỹ thuật cần biết
                  </Typography>
                </Stack>
                <Typography fontSize={"12px"}>3 bài học</Typography>
              </Stack>
              {arr.map((item: any, index2: any) => {
                return (
                  <Box>
                    <Stack
                      direction={"row"}
                      borderTop={index2 == 0 ? "none" : "1px solid #dddddd"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      padding={"15px 20px"}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"7px"}>
                        <RiYoutubeFill size={"20px"} color={"#f05123"} />
                        <Typography color={"#333"} fontSize={"14px"}>
                          1.Mô hình Client-server là gì
                        </Typography>
                      </Stack>
                      <Typography fontSize={"12px"}>11:37</Typography>
                    </Stack>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const ContentDrawer = ({ onClose }: any) => {
  const [etend, setExtend] = useState(false);
  const [etendDad, setExtendDad] = useState(false);
  const [etendChild, setExtendChild] = useState(false);
  const [etendType, setExtendType] = useState(false);

  const [content, setContent] = useState("");
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  return (
    <Box
      width={"800px"}
      height={"100vh"}
      padding={"50px"}
      className='comment-tab'
      sx={{ position: "relative", overflowY: "scroll" }}>
      <Box position={"absolute"} onClick={onClose(false)} top={20} right={20}>
        <RiCloseLine size={30} />
      </Box>
      <Box>
        <Typography fontSize={"20px"} fontWeight={700}>
          287 hỏi đáp
        </Typography>
        <Typography
          mt={"10px"}
          fontStyle={"italic"}
          fontSize={"14px"}
          color={"#333"}>
          (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
        </Typography>
      </Box>
      <Box mt={"20px"}>
        <Stack direction={"row"} gap={"10px"}>
          <img
            src={user}
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
            alt=''
          />
          <Box
            sx={{
              maxHeight: etend ? "400px" : "43px",
              overflow: "hidden",
            }}>
            {etend ? (
              ""
            ) : (
              <Typography
                onClick={() => setExtend(true)}
                mt={"20px"}
                borderBottom={"1px solid #333333"}
                fontSize={"14px"}>
                Bạn có thắc mắc gì trong bài học này?
              </Typography>
            )}
            <Box
              sx={{
                ".tox-statusbar": {
                  display: "none !important",
                },
                width: "100%",
              }}>
              <Editor
                apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                onEditorChange={handleEditorChange}
                initialValue='Bạn có thắc mắc gì trong bài học này?'
                init={{
                  plugins:
                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                  editimage_cors_hosts: ["picsum.photos"],
                  menubar: "file edit view insert format tools table help",
                  toolbar:
                    "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                  autosave_ask_before_unload: true,
                  autosave_interval: "30s",
                  autosave_prefix: "{path}{query}-{id}-",
                  autosave_restore_when_empty: false,
                  autosave_retention: "2m",
                  image_advtab: true,
                  link_list: [
                    { title: "My page 1", value: "https://www.tiny.cloud" },
                    {
                      title: "My page 2",
                      value: "http://www.moxiecode.com",
                    },
                  ],
                  image_list: [
                    { title: "My page 1", value: "https://www.tiny.cloud" },
                    {
                      title: "My page 2",
                      value: "http://www.moxiecode.com",
                    },
                  ],
                  image_class_list: [
                    { title: "None", value: "" },
                    { title: "Some class", value: "class-name" },
                  ],
                  importcss_append: true,
                  file_picker_callback: (callback, value, meta) => {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === "file") {
                      callback("https://www.google.com/logos/google.jpg", {
                        text: "My text",
                      });
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === "image") {
                      callback("https://www.google.com/logos/google.jpg", {
                        alt: "My alt text",
                      });
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === "media") {
                      callback("movie.mp4", {
                        source2: "alt.ogg",
                        poster: "https://www.google.com/logos/google.jpg",
                      });
                    }
                  },

                  height: 300,
                  image_caption: true,
                  quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                  noneditable_class: "mceNonEditable",
                  toolbar_mode: "sliding",
                  contextmenu: "link image table",

                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                }}
              />
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"flex-end"}
              mt={"15px"}
              gap={1}>
              <Button
                onClick={() => setExtend(false)}
                sx={{
                  color: "black",
                  border: "1px solid #333",
                  borderRadius: "99px",
                  height: "34px",
                }}>
                Hủy
              </Button>
              <Button
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",

                  height: "34px",
                }}>
                Bình Luận
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Stack mt={"50px"} direction={"column"} gap={"25px"}>
        <Box>
          <Stack direction={"row"} gap={"10px"}>
            <Box>
              <img
                src={user}
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
                alt=''
              />
            </Box>
            <Box
              sx={{
                maxHeight: etendDad || etendType ? "600px" : "110px",

                overflow: "hidden",
              }}>
              <Box
                sx={{
                  padding: "15px",
                  borderRadius: "10px",
                  background: "#f2f3f5",
                  width: "500px",
                }}>
                <Typography fontWeight={"700"} fontSize={"14px"}>
                  Bùi Văn Toản
                </Typography>
                <Box
                  sx={{ color: "#292929", mt: "5px" }}
                  dangerouslySetInnerHTML={{ __html: `haolo` }}></Box>
              </Box>
              <Box>
                <Stack
                  mt={"8px"}
                  sx={{ cursor: "pointer" }}
                  direction={"row"}
                  alignItems={"center"}
                  gap={"6px"}>
                  <LightTooltip
                    placement='top-start'
                    title={
                      <Stack direction={"row"} gap={"15px"}>
                        <p style={{ fontSize: "22px" }}>👍</p>
                        <p style={{ fontSize: "22px" }}>❤️</p>
                        <p style={{ fontSize: "22px" }}>😀</p>
                        <p style={{ fontSize: "22px" }}>😲</p>
                        <p style={{ fontSize: "22px" }}>😰</p>
                        <p style={{ fontSize: "22px" }}>😠</p>
                      </Stack>
                    }>
                    <Typography color={"#ff5117"} fontSize={"12px"}>
                      Thích
                    </Typography>
                  </LightTooltip>
                  •
                  <Typography
                    onClick={() => setExtendDad(true)}
                    color={"#ff5117"}
                    fontSize={"12px"}>
                    Trả lời
                  </Typography>
                  •
                  <Typography color={"#292929"} fontSize={"12px"}>
                    5 tháng trước
                  </Typography>
                  <RiMoreFill
                    aria-describedby={id}
                    variant='contained'
                    onClick={handleClick}
                    size={20}
                  />
                  <Popover
                    id={id}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}>
                    <Typography
                      color={"#333"}
                      fontSize={"13px"}
                      sx={{
                        p: 2,
                        display: "flex ",
                        alignItems: "center",
                        gap: "6px",
                      }}>
                      <RiFlagFill size={20} /> Báo cáo bình luận
                    </Typography>
                  </Popover>
                  <Typography
                    onClick={() => {
                      setExtendType(!etendType);
                    }}
                    sx={{ marginLeft: "170px" }}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"3px"}
                    fontSize={"13px"}>
                    Xem 1 câu trả lời
                    <RiArrowDownSLine size={"20px"} />
                  </Typography>
                </Stack>
                {etendType ? (
                  <Box>
                    <Stack mt={"20px"} direction={"column"} gap={"25px"}>
                      <Box>
                        <Stack direction={"row"} gap={"10px"}>
                          <Box>
                            <img
                              src={user}
                              width={40}
                              height={40}
                              style={{ borderRadius: "50%" }}
                              alt=''
                            />
                          </Box>
                          <Box
                            sx={{
                              maxHeight: etendChild ? "600px" : "100px",
                              transition: ".4s",
                              overflow: "hidden",
                            }}>
                            <Box
                              sx={{
                                padding: "15px",
                                borderRadius: "10px",
                                background: "#f2f3f5",
                                width: "500px",
                              }}>
                              <Typography fontWeight={"700"} fontSize={"14px"}>
                                Bùi Văn Toản
                              </Typography>
                              <Box
                                sx={{ color: "#292929", mt: "5px" }}
                                dangerouslySetInnerHTML={{
                                  __html: `haolo`,
                                }}></Box>
                            </Box>
                            <Box>
                              <Stack
                                mt={"8px"}
                                sx={{ cursor: "pointer" }}
                                direction={"row"}
                                alignItems={"center"}
                                gap={"6px"}>
                                <LightTooltip
                                  placement='top-start'
                                  title={
                                    <Stack direction={"row"} gap={"15px"}>
                                      <p style={{ fontSize: "22px" }}>👍</p>
                                      <p style={{ fontSize: "22px" }}>❤️</p>
                                      <p style={{ fontSize: "22px" }}>😀</p>
                                      <p style={{ fontSize: "22px" }}>😲</p>
                                      <p style={{ fontSize: "22px" }}>😰</p>
                                      <p style={{ fontSize: "22px" }}>😠</p>
                                    </Stack>
                                  }>
                                  <Typography
                                    color={"#ff5117"}
                                    fontSize={"12px"}>
                                    Thích
                                  </Typography>
                                </LightTooltip>
                                •
                                <Typography
                                  onClick={() => setExtendChild(true)}
                                  color={"#ff5117"}
                                  fontSize={"12px"}>
                                  Trả lời
                                </Typography>
                                •
                                <Typography color={"#292929"} fontSize={"12px"}>
                                  5 tháng trước
                                </Typography>
                                <RiMoreFill
                                  aria-describedby={id}
                                  variant='contained'
                                  onClick={handleClick}
                                  size={20}
                                />
                                <Popover
                                  id={id}
                                  open={openPopover}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}>
                                  <Typography
                                    color={"#333"}
                                    fontSize={"13px"}
                                    sx={{
                                      p: 2,
                                      display: "flex ",
                                      alignItems: "center",
                                      gap: "6px",
                                    }}>
                                    <RiFlagFill size={20} /> Báo cáo bình luận
                                  </Typography>
                                </Popover>
                              </Stack>
                              {etendChild && (
                                <Box>
                                  <Box
                                    sx={{
                                      ".tox-statusbar": {
                                        display: "none !important",
                                      },
                                      width: "100%",
                                    }}>
                                    <Editor
                                      apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                                      onEditorChange={handleEditorChange}
                                      initialValue='Bạn có thắc mắc gì trong bài học này?'
                                      init={{
                                        plugins:
                                          "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                                        editimage_cors_hosts: ["picsum.photos"],
                                        menubar:
                                          "file edit view insert format tools table help",
                                        toolbar:
                                          "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                                        autosave_ask_before_unload: true,
                                        autosave_interval: "30s",
                                        autosave_prefix: "{path}{query}-{id}-",
                                        autosave_restore_when_empty: false,
                                        autosave_retention: "2m",
                                        image_advtab: true,
                                        link_list: [
                                          {
                                            title: "My page 1",
                                            value: "https://www.tiny.cloud",
                                          },
                                          {
                                            title: "My page 2",
                                            value: "http://www.moxiecode.com",
                                          },
                                        ],
                                        image_list: [
                                          {
                                            title: "My page 1",
                                            value: "https://www.tiny.cloud",
                                          },
                                          {
                                            title: "My page 2",
                                            value: "http://www.moxiecode.com",
                                          },
                                        ],
                                        image_class_list: [
                                          { title: "None", value: "" },
                                          {
                                            title: "Some class",
                                            value: "class-name",
                                          },
                                        ],
                                        importcss_append: true,
                                        file_picker_callback: (
                                          callback,
                                          value,
                                          meta
                                        ) => {
                                          /* Provide file and text for the link dialog */
                                          if (meta.filetype === "file") {
                                            callback(
                                              "https://www.google.com/logos/google.jpg",
                                              {
                                                text: "My text",
                                              }
                                            );
                                          }

                                          /* Provide image and alt text for the image dialog */
                                          if (meta.filetype === "image") {
                                            callback(
                                              "https://www.google.com/logos/google.jpg",
                                              {
                                                alt: "My alt text",
                                              }
                                            );
                                          }

                                          /* Provide alternative source and posted for the media dialog */
                                          if (meta.filetype === "media") {
                                            callback("movie.mp4", {
                                              source2: "alt.ogg",
                                              poster:
                                                "https://www.google.com/logos/google.jpg",
                                            });
                                          }
                                        },

                                        height: 300,
                                        image_caption: true,
                                        quickbars_selection_toolbar:
                                          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                                        noneditable_class: "mceNonEditable",
                                        toolbar_mode: "sliding",
                                        contextmenu: "link image table",

                                        content_style:
                                          "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                                      }}
                                    />
                                  </Box>
                                  <Stack
                                    direction={"row"}
                                    justifyContent={"flex-end"}
                                    mt={"15px"}
                                    gap={1}>
                                    <Button
                                      onClick={() => setExtendChild(false)}
                                      sx={{
                                        color: "black",
                                        border: "1px solid #333",
                                        borderRadius: "99px",
                                        height: "34px",
                                      }}>
                                      Hủy
                                    </Button>
                                    <Button
                                      sx={{
                                        background:
                                          "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                                        color: "white",
                                        borderRadius: "99px",

                                        height: "34px",
                                      }}>
                                      Bình Luận
                                    </Button>
                                  </Stack>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ) : (
                  <Box mt={"10px"}>
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "100%",
                      }}>
                      <Editor
                        apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                        onEditorChange={handleEditorChange}
                        initialValue='Bạn có thắc mắc gì trong bài học này?'
                        init={{
                          plugins:
                            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                          editimage_cors_hosts: ["picsum.photos"],
                          menubar:
                            "file edit view insert format tools table help",
                          toolbar:
                            "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                          autosave_ask_before_unload: true,
                          autosave_interval: "30s",
                          autosave_prefix: "{path}{query}-{id}-",
                          autosave_restore_when_empty: false,
                          autosave_retention: "2m",
                          image_advtab: true,
                          link_list: [
                            {
                              title: "My page 1",
                              value: "https://www.tiny.cloud",
                            },
                            {
                              title: "My page 2",
                              value: "http://www.moxiecode.com",
                            },
                          ],
                          image_list: [
                            {
                              title: "My page 1",
                              value: "https://www.tiny.cloud",
                            },
                            {
                              title: "My page 2",
                              value: "http://www.moxiecode.com",
                            },
                          ],
                          image_class_list: [
                            { title: "None", value: "" },
                            { title: "Some class", value: "class-name" },
                          ],
                          importcss_append: true,
                          file_picker_callback: (callback, value, meta) => {
                            /* Provide file and text for the link dialog */
                            if (meta.filetype === "file") {
                              callback(
                                "https://www.google.com/logos/google.jpg",
                                {
                                  text: "My text",
                                }
                              );
                            }

                            /* Provide image and alt text for the image dialog */
                            if (meta.filetype === "image") {
                              callback(
                                "https://www.google.com/logos/google.jpg",
                                {
                                  alt: "My alt text",
                                }
                              );
                            }

                            /* Provide alternative source and posted for the media dialog */
                            if (meta.filetype === "media") {
                              callback("movie.mp4", {
                                source2: "alt.ogg",
                                poster:
                                  "https://www.google.com/logos/google.jpg",
                              });
                            }
                          },

                          height: 300,
                          image_caption: true,
                          quickbars_selection_toolbar:
                            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                          noneditable_class: "mceNonEditable",
                          toolbar_mode: "sliding",
                          contextmenu: "link image table",

                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                        }}
                      />
                    </Box>
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-end"}
                      mt={"15px"}
                      gap={1}>
                      <Button
                        onClick={() => setExtendDad(false)}
                        sx={{
                          color: "black",
                          border: "1px solid #333",
                          borderRadius: "99px",
                          height: "34px",
                        }}>
                        Hủy
                      </Button>
                      <Button
                        sx={{
                          background:
                            "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                          color: "white",
                          borderRadius: "99px",

                          height: "34px",
                        }}>
                        Bình Luận
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const ContentLeftExercise = () => {
  const [value, setValue] = React.useState(0);
  const [valueRight, setValueRight] = React.useState(0);
  const [exerciseHtml, setexerciseHtml] = React.useState("");
  const [exerciseCss, setexerciseCss] = React.useState("");
  const [exercise, setExercise]: any = useState();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeRight = (event: React.SyntheticEvent, newValue: number) => {
    setValueRight(newValue);
  };

  const handleChangeExercise = (e: any) => {
    setExercise(e);
  };
  const handleChangeExerciseHtml = (e: any) => {
    setexerciseHtml(e);
  };
  const handleChangeExerciseCss = (e: any) => {
    setexerciseCss(e);
  };
  const handleClickSucess = () => {
    Confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 1 },
    });
  };
  return (
    <Box width={"75%"}>
      <Stack direction={"row"}>
        <Box
          sx={{
            ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
              width: "50%",
            },
            ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: " #ff5117",
            },
            ".css-1aquho2-MuiTabs-indicator": {
              background: "#ff5117",
            },
          }}
          width={"45%"}
          borderRight={"1px solid #dddddd"}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label={
                <>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    fontWeight={600}>
                    <RiFile3Fill /> Nội dung
                  </Typography>
                </>
              }
            />
            <Tab
              label={
                <>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                    fontWeight={600}>
                    {" "}
                    <RiPlayCircleFill size={"19px"} />
                    Trình duyệt
                  </Typography>
                </>
              }
            />
          </Tabs>
          {value == 0 && (
            <Box p={"15px"}>
              <Box
                sx={{
                  " .tox-editor-header": {
                    display: "none !important",
                  },
                  ".tox-statusbar": {
                    display: "none !important",
                  },

                  height: "600px",
                  pointerEvents: "none",
                  ".tox-tinymce": {
                    border: "none",
                  },
                }}>
                <Editor
                  apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                  initialValue={`<header class="Instructions_header__v1Y6B"><header class="wrapper">
<h1 class="Heading_heading__VnWS7">Thực h&agrave;nh sử dụng console.log</h1>
<p class="Heading_updated__LqCQ8">Cập nhật&nbsp;th&aacute;ng 3 năm 2022</p>
</header></header>
<div class="MarkdownParser_wrapper__JYN63">
<p>Tại&nbsp;<code>main.js</code>&nbsp;c&oacute; sẵn biến&nbsp;<code>language</code>, h&atilde;y sử dụng&nbsp;<code>console.log</code>&nbsp;để in gi&aacute; trị của biến n&agrave;y ra tab&nbsp;<code>Console</code>&nbsp;trong Dev Tool của tr&igrave;nh duyệt.</p>
</div>`}
                  init={{
                    height: "600px",
                  }}
                />
              </Box>
            </Box>
          )}

          {value == 1 && (
            <Box>
              <iframe
                title='result'
                srcDoc={`<!DOCTYPE html><html><head><title>Result</title> <style>${exerciseCss}</style></head><body>${exerciseHtml}</body></html>`}
                style={{
                  width: "100%",
                  height: "80vh",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
          )}
        </Box>
        <Box width={"55%"}>
          <Stack
            sx={{
              ".css-1aquho2-MuiTabs-indicator": {
                display: "none",
              },
              ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
                minHeight: "0",
                height: "40px",
                color: "white",
              },
              height: "40px",
              ".css-heg063-MuiTabs-flexContainer": {
                mt: "5px",
                background: "#1e1e1e",
              },
              ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                color: "#1976d2 !important",
              },
            }}
            bgcolor={"#343434"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"99.9%"}>
            <Tabs
              value={valueRight}
              onChange={handleChangeRight}
              aria-label='basic tabs example'>
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                    <img
                      src={js}
                      width={17}
                      height={17}
                      style={{ borderRadius: "5px" }}
                      alt=''
                    />
                    <Typography
                      fontSize={"12px"}
                      sx={{ textTransform: "lowercase" }}>
                      main.js
                    </Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                    <img
                      src={html}
                      width={17}
                      height={17}
                      style={{ borderRadius: "5px" }}
                      alt=''
                    />
                    <Typography
                      fontSize={"12px"}
                      sx={{ textTransform: "lowercase" }}>
                      index.html
                    </Typography>
                  </Stack>
                }
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
                    <img
                      src={css}
                      width={17}
                      height={17}
                      style={{ borderRadius: "5px" }}
                      alt=''
                    />
                    <Typography
                      fontSize={"12px"}
                      sx={{ textTransform: "lowercase" }}>
                      style.css
                    </Typography>
                  </Stack>
                }
              />
            </Tabs>
            <Box
              width={"65px"}
              height={"40px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={"#1e1e1e"}>
              <ReplayIcon sx={{ color: "white" }} />
            </Box>
          </Stack>
          <Box
            sx={{
              " .slider-mouseover": {
                display: "none",
              },
            }}>
            {valueRight == 0 && (
              <MonacoEditor
                width={"100%"}
                height='350px'
                language='javascript'
                theme='vs-dark'
                value={`//Tạo 1 mảng chứa ít nhất 3 phần tử tên Sum`}
                onChange={(value) => handleChangeExercise(value)}
              />
            )}
            {valueRight == 1 && (
              <MonacoEditor
                height='350px'
                language='html'
                theme='vs-dark'
                value={exerciseHtml}
                onChange={(value) => handleChangeExerciseHtml(value)}
              />
            )}
            {valueRight == 2 && (
              <MonacoEditor
                height='350px'
                language='css'
                theme='vs-dark'
                value={exerciseCss}
                onChange={(value) => handleChangeExerciseCss(value)}
              />
            )}
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"10px"}
            borderBottom={"1px solid #dddddd"}>
            <Typography fontWeight={"600"} fontSize={"14px"}>
              Bài kiểm tra (0/1)
            </Typography>
            <Button
              onClick={handleClickSucess}
              sx={{
                background:
                  "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                color: "white",
                borderRadius: "99px",
                width: "92px",
                height: "34px",
                fontSize: "12px",
              }}>
              Kiểm tra
            </Button>
          </Stack>
          <Stack padding={"20px"}>
            <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
              <Box>
                <RiCheckLine color='#5db85c' size={"25px"} />
              </Box>
              <Typography fontWeight={"400"} fontSize={"16px"}>
                Logs biến language ra tab Console
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
const ContentLeftBlog = () => {
  return (
    <Box width={"75%"}>
      <Box
        width={"100%"}
        paddingLeft={"95px"}
        sx={{
          " .tox-editor-header": {
            display: "none !important",
          },
          ".tox-statusbar": {
            display: "none !important",
          },

          height: "600px",

          ".tox-tinymce": {
            border: "none",
          },
          ".mce-content-body": {
            padding: "40px",
          },
        }}>
        <Editor
          apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
          initialValue={`<header class="wrapper">
<h1 class="Heading_heading__VnWS7">To&aacute;n tử ++ v&agrave; --</h1>
<p class="Heading_updated__LqCQ8">Cập nhật&nbsp;th&aacute;ng 3 năm 2022</p>
</header>
<div class="MarkdownParser_wrapper__JYN63">
<p>Đ&acirc;y l&agrave; 2 to&aacute;n tử nghe qua th&igrave; rất dễ hiểu, nhưng để hiểu nguy&ecirc;n l&yacute; về c&aacute;ch hoạt động của n&oacute; ch&uacute;ng ta sẽ phải mất th&ecirc;m một ch&uacute;t thời gian đ&oacute;. Để ho&agrave;n th&agrave;nh b&agrave;i học về 2 to&aacute;n tử n&agrave;y, ch&uacute;ng ta sẽ c&ugrave;ng trải qua một số b&agrave;i học sau nh&eacute;.</p>
<p>Ok, bắt đầu th&ocirc;i!</p>
<h2 id="toan-tu" data-appended="true">To&aacute;n tử ++</h2>
<p>To&aacute;n tử&nbsp;<code>++</code>&nbsp;gi&uacute;p tăng gi&aacute; trị của một biến mang gi&aacute; trị số l&ecirc;n 1. C&oacute; 2 c&aacute;ch để sử dụng to&aacute;n tử&nbsp;<code>++</code>&nbsp;l&agrave;:</p>
<ol>
<li>D&ugrave;ng l&agrave;m hậu tố:&nbsp;<code>variable++</code>&nbsp;(to&aacute;n tử nằm sau biến)</li>
<li>D&ugrave;ng l&agrave;m tiền tố:&nbsp;<code>++variable</code>&nbsp;(to&aacute;n tử nằm trước biến)</li>
</ol>
<h3>#1 Sử dụng ++ l&agrave;m hậu tố</h3>
<p>Ở đ&acirc;y, ch&uacute;ng ta sẽ x&eacute;t v&iacute; dụ sử dụng to&aacute;n tử&nbsp;<code>++</code>&nbsp;l&agrave;m hậu tố trước (v&igrave; trong thực tế, ch&uacute;ng ta thường d&ugrave;ng kiểu hậu tố nhiều hơn):</p>
<div class="code-toolbar">
<pre class="language-js" tabindex="0"><code>var number = 1;

number++; // d&ugrave;ng l&agrave;m hậu tố, ++ ở ph&iacute;a sau biến
console.log(number); // 2

number++;
console.log(number); // 3
</code></pre>
<div class="toolbar">
<div class="toolbar-item"><button class="copy-to-clipboard-button" type="button" data-copy-state="copy">Copy</button></div>
</div>
</div>
<p>Sau mỗi khi sử dụng to&aacute;n tử&nbsp;<code>++</code>, gi&aacute; trị của biến&nbsp;<code>number</code>&nbsp;được tăng l&ecirc;n 1. C&oacute; vẻ kh&aacute; dễ d&agrave;ng để hiểu c&aacute;ch hoạt động của n&oacute; phải kh&ocirc;ng?</p>
<p>Tuy nhi&ecirc;n, h&atilde;y xem x&eacute;t th&ecirc;m v&iacute; dụ sau:</p>
<div class="code-toolbar">
<pre class="language-js" tabindex="0"><code>var number = 1;

console.log(number++); // 1
console.log(number); // 2

console.log(number++); // 2
console.log(number); // 3
</code></pre>
<div class="toolbar">
<div class="toolbar-item"><button class="copy-to-clipboard-button" type="button" data-copy-state="copy">Copy</button></div>
</div>
</div>
<blockquote>
<p>👉 To&aacute;n tử&nbsp;<code>++</code>&nbsp;khi d&ugrave;ng l&agrave; hậu tố sẽ&nbsp;<strong>tăng gi&aacute; trị của biến l&ecirc;n 1</strong>&nbsp;v&agrave;&nbsp;<strong>trả về gi&aacute; trị trước khi tăng</strong>.</p>
</blockquote>
<h3>#2 Sử dụng ++ l&agrave;m tiền tố</h3>
<p>Ở v&iacute; dụ n&agrave;y, ch&uacute;ng ta sử dụng&nbsp;<code>++</code>&nbsp;l&agrave;m tiền tố. Tuy nhi&ecirc;n, kết quả tr&ocirc;ng sẽ kh&ocirc;ng kh&aacute;c g&igrave; khi d&ugrave;ng&nbsp;<code>++</code>&nbsp;l&agrave;m hậu tố:</p>
<div class="code-toolbar">
<pre class="language-js" tabindex="0"><code>var number = 1;

++number; // d&ugrave;ng l&agrave;m tiền tố, ++ ở ph&iacute;a trước biến
console.log(number); // 2

++number;
console.log(number); // 3
</code></pre>
<div class="toolbar">
<div class="toolbar-item"><button class="copy-to-clipboard-button" type="button" data-copy-state="copy">Copy</button></div>
</div>
</div>
<p>Nhưng khi xem x&eacute;t kỹ hơn, c&aacute;c bạn sẽ nh&igrave;n ra điểm kh&aacute;c:</p>
<div class="code-toolbar">
<pre class="language-js" tabindex="0"><code>var number = 1;

console.log(++number); // 2
console.log(number); // 2

console.log(++number); // 3
console.log(number); // 3
</code></pre>
<div class="toolbar">
<div class="toolbar-item"><button class="copy-to-clipboard-button" type="button" data-copy-state="copy">Copy</button></div>
</div>
</div>
<blockquote>
<p>👉 To&aacute;n tử&nbsp;<code>++</code>&nbsp;khi d&ugrave;ng l&agrave; tiền tố sẽ&nbsp;<strong>tăng gi&aacute; trị của biến l&ecirc;n 1</strong>&nbsp;v&agrave;&nbsp;<strong>trả về gi&aacute; trị sau khi tăng</strong>.</p>
</blockquote>
<hr>
<h2 id="toan-tu" data-appended="true">To&aacute;n tử - -</h2>
<p>C&aacute;ch hoạt động tương tự như to&aacute;n tử ++, điểm kh&aacute;c biệt l&agrave; thay v&igrave; cộng th&ecirc;m 1, th&igrave; to&aacute;n tử&nbsp;<code>--</code>&nbsp;sẽ trừ đi 1.</p>
<hr>
<h2 id="tong-ket" data-appended="true">Tổng kết</h2>
<ul>
<li><code>x++</code>&nbsp;tăng gi&aacute; trị biến l&ecirc;n 1 v&agrave; trả về gi&aacute; trị&nbsp;<strong>trước</strong>&nbsp;khi tăng</li>
<li><code>++x</code>&nbsp;tăng gi&aacute; trị biến l&ecirc;n 1 v&agrave; trả về gi&aacute; trị&nbsp;<strong>sau</strong>&nbsp;khi tăng</li>
<li><code>x--</code>&nbsp;giảm gi&aacute; trị biến xuống 1 v&agrave; trả về gi&aacute; trị&nbsp;<strong>trước</strong>&nbsp;khi giảm</li>
<li><code>--x</code>&nbsp;giảm gi&aacute; trị biến xuống 1 v&agrave; trả về gi&aacute; trị&nbsp;<strong>sau</strong>&nbsp;khi giảmm</li>
</ul>
<blockquote>
<p>Trong video sau, ch&uacute;ng ta sẽ ph&acirc;n t&iacute;ch một c&aacute;ch chi tiết để hiểu nguy&ecirc;n l&yacute; của c&aacute;ch hoạt động tr&ecirc;n.</p>
</blockquote>
</div>`}
          init={{
            height: "85vh",
          }}
        />
      </Box>
    </Box>
  );
};

const ContentLeftQuiz = () => {
  const [total, setTotal]: any = useState(null);
  const [color, setColor]: any = useState(null);
  const quiz = [
    {
      answer: "Long Bui",
      result: true,
    },
    {
      answer: "Bui Long",
      result: false,
    },
    {
      answer: "LongBui",
      result: false,
    },
  ];
  const handleClickAnswer = (value: any) => {
    setColor("#0093fc");
    setTotal(value);
  };
  const handleTotal = () => {
    if (total.result) {
      setColor("#48bd79");
      Confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 1 },
      });
    } else {
      setColor("#cc5140");
    }
  };
  return (
    <Box width={"75%"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}>
        <Box
          width={"80%"}
          sx={{
            " .tox-editor-header": {
              display: "none !important",
            },
            ".tox-statusbar": {
              display: "none !important",
            },

            ".tox-tinymce": {
              border: "none",
            },
            ".mce-content-body": {
              padding: "40px",
            },
            "iframe code ": {
              background: "none",
            },
          }}>
          <Editor
            apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
            initialValue={`<header class="wrapper">
<h1 class="Heading_heading__VnWS7">&Ocirc;n lại kiến thức về Truthy v&agrave; Falsy</h1>
<p class="Heading_updated__LqCQ8">Cập nhật&nbsp;th&aacute;ng 6 năm 2022</p>
</header>
<div class="desc">
<div class="MarkdownParser_wrapper__JYN63">
<div class="code-toolbar">
<pre class="language-js" tabindex="0"><code>var a = '';
var b = 0;
var c = [];
var d = 1 &gt; 2;
var e = {};
var f = '0';
</code></pre>
<div class="toolbar">
<div class="toolbar-item">Những biến n&agrave;o sau đ&acirc;y c&oacute; gi&aacute; trị l&agrave; falsy?</div>
</div>
</div>
</div>
</div>`}
          />
        </Box>
        <Stack
          direction={"column"}
          mt={"-40px"}
          position={"relative"}
          zIndex={"1"}
          gap={"15px"}
          width={"70%"}>
          {quiz.map((item) => {
            let check = false;
            if (total) {
              check = total.answer == item.answer;
            }

            return (
              <Box
                onClick={() => handleClickAnswer(item)}
                border={check ? `2px solid ${color}` : "none"}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"10px"}
                height={"50px"}
                bgcolor={"#f6f7f9"}>
                {item.answer}
              </Box>
            );
          })}
        </Stack>
        <Box width={"70%"} mt={"15px"} pb={"50px"}>
          <Button
            onClick={handleTotal}
            sx={{
              pointerEvents: total ? "auto" : "none",
              opacity: total ? 1 : 0.3,
              background: "linear-gradient(to right bottom, #ff8f26, #ff5117)",
              color: "white",
              borderRadius: "99px",
              width: "92px",
              height: "34px",
              fontSize: "12px",
              float: "right",
            }}>
            Kiểm tra
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
