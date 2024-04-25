import {
  Box,
  Button,
  Drawer,
  Fade,
  Popover,
  Stack,
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
import logo from "../../images/f8-icon.18cd71cfcfa33566a22b.png";
import user from "../../images/user.png";
import {
  RiAddFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiFile3Fill,
  RiFlagFill,
  RiHeartFill,
  RiMessengerFill,
  RiMoreFill,
  RiQuestionFill,
  RiStickyNoteFill,
  RiSubtractFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { Editor } from "@tinymce/tinymce-react";
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
        <ContentLeft />
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

const ContentLeft = () => {
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
