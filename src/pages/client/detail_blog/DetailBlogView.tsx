import { Box, Button, Paper, Popover, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import user from "../../../images/user.png";
import article from "../../../images/article.png";
import parse from "html-react-parser";
import b from "../../../images/b.png";
import {
  RiBookmarkLine,
  RiFacebookCircleFill,
  RiHeartLine,
  RiMailFill,
  RiMessage3Line,
  RiMoreFill,
  RiTwitterFill,
} from "react-icons/ri";
import hljs from 'highlight.js';
import styled from "styled-components";
import BlogContent from "@/components/BlogContent";

type Props = {
  post: any;
};
const DetailBlogView = ({ post }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const iframeRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Stack direction={"row"} ml={"50px"} gap={"5%"}>
        <Box width={"65%"}>
          <Box
            sx={{
              " .tox-editor-header": {
                display: "none !important",
              },
              ".tox-statusbar": {
                display: "none !important",
              },
              width: "100%",
            }}
          >
            <Box width={"100%"}>
              <Stack
                mb={"10px"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" fontWeight={"bold"}>
                  {post && post.title}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                  <RiBookmarkLine color="#333" size={"20px"} />
                  <RiMoreFill
                    onClick={handleClick}
                    color="#333"
                    size={"20px"}
                  />
                </Stack>
              </Stack>
              <Stack direction={"row"}>
                <Box width={"60%"}>
                  <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                    {post && post.description}
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"} gap={"3px"}>
                    <img
                      width={26}
                      height={26}
                      style={{ borderRadius: "50%" }}
                      src={user}
                      alt=""
                    />
                    <Typography mt={"5px"} fontSize={"12px"}>
                      {post && post.author[0].user_name}
                    </Typography>
                  </Stack>
                  <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                    6 Ngày trước • 6 phút đọc
                  </Typography>
                </Box>
                <Box width={"40%"}></Box>
              </Stack>
            </Box>
            <Box mt={"30px"}>
              <BlogContent content={post && post.content} />
            </Box>
            
          </Box>
        </Box>
        <Stack width={"25%"}>
          <Typography fontSize={"17px"} color={"#757575"}>
            CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT
          </Typography>
          <Stack mt={"20px"} direction={"row"} gap={"10px"} flexWrap={"wrap"}>
            <Button
              sx={{
                bgcolor: "#f2f2f2",
                color: "#333",
                width: "max-content",
                borderRadius: "30px",
                fontSize: "12px",
                padding: "5px 8px",
              }}
            >
              Front-end / Mobile apps
            </Button>
            <Button
              sx={{
                bgcolor: "#f2f2f2",
                color: "#333",
                width: "max-content",
                borderRadius: "30px",
                fontSize: "12px",
                padding: "5px 8px",
              }}
            >
              Back-end / Devops
            </Button>
            <Button
              sx={{
                bgcolor: "#f2f2f2",
                color: "#333",
                width: "max-content",
                borderRadius: "30px",
                fontSize: "12px",
                padding: "5px 8px",
              }}
            >
              UI / UX / Design
            </Button>
          </Stack>
          <Box mt={"20px"}>
            <img
              src={b}
              width={"300px"}
              height={"250px"}
              style={{ borderRadius: "10px", objectFit: "cover" }}
              alt=""
            />
          </Box>
        </Stack>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper>
          <Stack padding={"18px"} direction={"column"} gap={"20px"}>
            <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
              <RiFacebookCircleFill />
              <Typography fontSize={"14px"} color={"#333"}>
                Chia sẻ lên Facebook
              </Typography>{" "}
            </Stack>
            <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
              <RiTwitterFill />
              <Typography fontSize={"14px"} color={"#333"}>
                Chia sẻ lên Twiter
              </Typography>{" "}
            </Stack>
            <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
              <RiMailFill />
              <Typography fontSize={"14px"} color={"#333"}>
                Chia sẻ lên Email
              </Typography>{" "}
            </Stack>
          </Stack>
        </Paper>
      </Popover>
    </Box>
  );
};

export default DetailBlogView;

