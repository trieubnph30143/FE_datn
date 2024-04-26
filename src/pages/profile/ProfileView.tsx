import { Box, Stack, Typography } from "@mui/material";
import bgprofile from "../../images/bgprofile.png";
import user from "../../images/user.png";
import { RiGroupFill } from "react-icons/ri";
import product from "../../images/product.png";

const ProfileView = () => {
  return (
    <Box>
      <Box width={"70%"} mx={"auto"}>
        <Box position={"relative"} top={-20}>
          <img
            src={bgprofile}
            style={{
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
            width={"100%"}
            alt=""
          />
          <Box
            position={"absolute"}
            bottom={"-75px"}
            sx={{ borderRadius: "50%" }}
            left={"40px"}
          >
            <Box display={"flex"} gap={"10px"} alignItems={"end"}>
              <img
                src={user}
                width={155}
                height={155}
                style={{
                  borderRadius: "50%",
                  border: "5px solid white",
                  background: "white",
                }}
                alt=""
              />
              <Typography fontWeight={"700"} fontSize={"25px"}>
                Bùi Văn Toản
              </Typography>
            </Box>
          </Box>
        </Box>
        <Stack direction={"row"} mt={"150px"} gap={"5%"}>
          <Box width={"40%"}>
            <Box
              sx={{
                borderRadius: "8px",
                padding: "18px",
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
              }}
            >
              <Typography fontWeight={"600"} fontSize={"17px"}>
                Giới thiệu
              </Typography>
              <Box
                mt={"10px"}
                display={"flex"}
                alignItems={"center"}
                gap={"10px"}
              >
                <RiGroupFill size={24} color={"#666666"} />
                <Typography fontSize={"14px"}>
                  Thành viên của <b>F8 - Học lập trình để đi làm</b> từ 2 năm
                  trước
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: "8px",
                padding: "18px",
                boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
                mt: "25px",
              }}
            >
              <Typography fontWeight={"600"} fontSize={"17px"}>
                Hoạt động gần đây
              </Typography>
              <Box mt={"10px"}>
                <Typography fontSize={"14px"}>
                  Chưa có hoạt động gần đây
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            width={"55%"}
            sx={{
              boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
              borderRadius: "8px",
              padding: "18px",
            }}
          >
            <Typography fontWeight={"600"} fontSize={"17px"}>
              Các khóa học đã tham gia
            </Typography>
            <Stack mt={"15px"} direction={"column"} gap={"15px"}>
                {[1,2,3].map((_,index)=>{
                    return   <Stack borderTop={index==0?"none":"1px solid rgba(0,0,0,.1)"} pt={"15px"} direction={"row"} gap={"15px"}>
                    <Box>
                      <img
                        src={product}
                        width={228}
                        height={128}
                        style={{ borderRadius: "12px" }}
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Typography fontWeight={"600"} fontSize={"15px"}>
                        Lập trình C++ cơ bản, nâng cao
                      </Typography>
                      <Typography fontSize={"14px"}>
                        Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người
                        mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm
                        được các khái niệm căn cơ của lập trình, giúp các bạn có nền
                        tảng vững chắc để chinh phục con đường trở thành một lập
                        trình viên.
                      </Typography>
                    </Box>
                  </Stack>
                })}
             
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileView;
