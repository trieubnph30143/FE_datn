import { Box, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { RiFlagFill, RiMoreFill } from "react-icons/ri";
import demo from "../../../images/demo_learning.png";

const MyArticleView = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  return (
    <Box >
      <Typography variant="h4" fontWeight={"700"} fontSize={"26px"}>
        Bài viết của tôi
      </Typography>
      <Typography mt={"30px"} color={"#0000008a"}>
        Đã xuất bản
      </Typography>
      <Stack direction={"row"}>
      <Stack mt={"15px"} direction={"column"} gap={"20px"}  width={"60%"}>
        {[1,2,3,4].map(()=>{
            return <Box
            sx={{
              borderRadius: "8px",
              padding: "18px",
              boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
              position: "relative",
            }}
          >
            <Typography fontWeight={"600"} fontSize={"17px"}>
              Giới thiệu
            </Typography>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Typography fontSize={"14px"}>
                Thành viên của <b>F8 - Học lập trình để đi làm</b> từ 2 năm trước
              </Typography>
            </Box>
            <Typography mt={"5px"} color={"#0000008a"} fontSize={"13px"}>
              6 phút đọc
            </Typography>
            <Box position={"absolute"} top={"20px"} right={"20px"}>
              <RiMoreFill
                aria-describedby={id}
                variant="contained"
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
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box padding={"12px"} width={"178px"}>
                  <Typography
                    color={"#333"}
                    fontSize={"13px"}
                    sx={{
                      p: 1,
                      display: "flex ",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Chỉnh sửa
                  </Typography>
                  <Typography
                    color={"#333"}
                    fontSize={"13px"}
                    sx={{
                      p: 1,
                      display: "flex ",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Xóa
                  </Typography>
                </Box>
              </Popover>
            </Box>
          </Box>
        })}
      </Stack>
        <Box width={"40%"}>
            <img src={demo} width={"100%"} alt="" />
        </Box>
      </Stack>
    </Box>
  );
};

export default MyArticleView;
