import {
  Box,
  Button,
  Fade,
  Pagination,
  Paper,
  Popover,
  Popper,
  PopperPlacementType,
  Stack,
  Typography,
} from "@mui/material";
import article from "../../../images/article.png";
import user from "../../../images/user.png";
import b from "../../../images/b.png";
import {
  RiBookmarkLine,
  RiFacebookCircleFill,
  RiMailFill,
  RiMoreFill,
  RiTwitterFill,
} from "react-icons/ri";
import { useState } from "react";

const FeaturedArticleView = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box>
      <Typography variant='h4' fontWeight={"bold"}>
        Bài viết nổi bật
      </Typography>
      <Typography mt={"20px"} fontSize={"14px"} color={"#333"}>
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </Typography>
      <Stack direction={"row"} gap={"120px"} mt={"60px"}>
        <Stack width={"58%"} direction={"column"} gap={"20px"}>
          <Box
            width={"100%"}
            sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
            padding={"15px 25px"}>
            <Stack
              mb={"10px"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack direction={"row"} alignItems={"center"} gap={"3px"}>
                <img
                  width={26}
                  height={26}
                  style={{ borderRadius: "50%" }}
                  src={user}
                  alt=''
                />
                <Typography mt={"5px"} fontSize={"12px"}>
                  Thánh Wibu
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                <RiBookmarkLine color='#333' size={"20px"} />
                <RiMoreFill onClick={handleClick} color='#333' size={"20px"} />
              </Stack>
            </Stack>
            <Stack direction={"row"}>
              <Box width={"60%"}>
                <Typography variant='h6' fontWeight={"bold"}>
                  Config Zsh bằng Oh-my-zsh và P10k trên WSL cực ngầu ✨
                </Typography>
                <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  Hello anh em , thì như blog trước mình có nói rằng mình ko có
                  dùng Ubuntu, nhưng sao lại có...
                </Typography>
                <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  6 Ngày trước • 6 phút đọc
                </Typography>
              </Box>
              <Box width={"40%"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}>
                  <img
                    width={"200px"}
                    style={{ borderRadius: "8px" }}
                    height={"112px"}
                    src={article}
                    alt=''
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box
            width={"100%"}
            sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
            padding={"15px 25px"}>
            <Stack
              mb={"10px"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack direction={"row"} alignItems={"center"} gap={"3px"}>
                <img
                  width={26}
                  height={26}
                  style={{ borderRadius: "50%" }}
                  src={user}
                  alt=''
                />
                <Typography mt={"5px"} fontSize={"12px"}>
                  Thánh Wibu
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                <RiBookmarkLine color='#333' size={"20px"} />
                <RiMoreFill color='#333' size={"20px"} />
              </Stack>
            </Stack>
            <Stack direction={"row"}>
              <Box width={"60%"}>
                <Typography variant='h6' fontWeight={"bold"}>
                  Config Zsh bằng Oh-my-zsh và P10k trên WSL cực ngầu ✨
                </Typography>
                <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  Hello anh em , thì như blog trước mình có nói rằng mình ko có
                  dùng Ubuntu, nhưng sao lại có...
                </Typography>
                <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  6 Ngày trước • 6 phút đọc
                </Typography>
              </Box>
              <Box width={"40%"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}>
                  <img
                    width={"200px"}
                    style={{ borderRadius: "8px" }}
                    height={"112px"}
                    src={article}
                    alt=''
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box
            width={"100%"}
            sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
            padding={"15px 25px"}>
            <Stack
              mb={"10px"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Stack direction={"row"} alignItems={"center"} gap={"3px"}>
                <img
                  width={26}
                  height={26}
                  style={{ borderRadius: "50%" }}
                  src={user}
                  alt=''
                />
                <Typography mt={"5px"} fontSize={"12px"}>
                  Thánh Wibu
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                <RiBookmarkLine color='#333' size={"20px"} />
                <RiMoreFill color='#333' size={"20px"} />
              </Stack>
            </Stack>
            <Stack direction={"row"}>
              <Box width={"60%"}>
                <Typography variant='h6' fontWeight={"bold"}>
                  Config Zsh bằng Oh-my-zsh và P10k trên WSL cực ngầu ✨
                </Typography>
                <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  Hello anh em , thì như blog trước mình có nói rằng mình ko có
                  dùng Ubuntu, nhưng sao lại có...
                </Typography>
                <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  6 Ngày trước • 6 phút đọc
                </Typography>
              </Box>
              <Box width={"40%"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}>
                  <img
                    width={"200px"}
                    style={{ borderRadius: "8px" }}
                    height={"112px"}
                    src={article}
                    alt=''
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination count={10} color='primary' />
          </Box>
        </Stack>
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
              }}>
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
              }}>
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
              }}>
              UI / UX / Design
            </Button>
          </Stack>
          <Box mt={"20px"}>
            <img
              src={b}
              width={"300px"}
              height={"250px"}
              style={{ borderRadius: "10px", objectFit: "cover" }}
              alt=''
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
        }}>
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

export default FeaturedArticleView;
