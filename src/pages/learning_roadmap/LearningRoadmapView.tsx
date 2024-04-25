import { Box, Button, Stack, Typography } from "@mui/material";
import learning1 from "../../images/learning1.png";
import learning2 from "../../images/learning2.png";
import bg from "../../images/demo_learning.png";
const LearningRoadmapView = () => {
  return (
    <Box position={"relative"}>
      <Box position={"absolute"} right={"0px"} bottom={"-10px"}>
        <img src={bg} width={400} height={400} alt='' />
      </Box>
      <Typography variant='h4' fontWeight={"bold"}>
        Lộ trình học
      </Typography>
      <Typography mt={"20px"} fontSize={"14px"} color={"#333"}>
        Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học.
        Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end"<br></br> bạn nên
        tập trung vào lộ trình "Front-end".
      </Typography>
      <Stack direction={"row"} gap={"20px"} mt={"60px"}>
        <Box
          width={"450px"}
          sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
          padding={"15px 25px"}>
          <Stack direction={"row"}>
            <Box width={"60%"}>
              <Typography variant='h6' fontWeight={"bold"}>
                Lộ trình học Front-end
              </Typography>
              <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                Lập trình viên Front-end là người xây dựng ra giao diện
                websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở
                thành lập trình viên Front-end nhé.
              </Typography>
              <Button
                sx={{
                  mt: "15px",
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",
                  fontSize: "12px",
                  height: "34px",
                }}>
                Xem chi tiết
              </Button>
            </Box>
            <Box width={"40%"}>
              <Box
                sx={{ float: "right" }}
                width={"122px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"122px"}
                border={"5px solid #f05123"}
                borderRadius={"50%"}>
                <img width={"80%"} height={"80%"} src={learning1} alt='' />
              </Box>
            </Box>
          </Stack>
        </Box>
        <Box
          width={"450px"}
          sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
          padding={"15px 25px"}>
          <Stack direction={"row"}>
            <Box width={"60%"}>
              <Typography variant='h6' fontWeight={"bold"}>
                Lộ trình học Back-end
              </Typography>
              <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                Trái với Front-end thì lập trình viên Back-end là người làm việc
                với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ
                cùng tìm hiểu thêm về lộ trình học Back-end nhé.
              </Typography>
              <Button
                sx={{
                  mt: "15px",
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",
                  fontSize: "12px",
                  height: "34px",
                }}>
                Xem chi tiết
              </Button>
            </Box>
            <Box width={"40%"}>
              <Box
                sx={{ float: "right" }}
                width={"122px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"122px"}
                border={"5px solid #f05123"}
                borderRadius={"50%"}>
                <img width={"80%"} height={"80%"} src={learning2} alt='' />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Typography mt={"70px"} variant='h5' fontWeight={"bold"}>
        Tham gia cộng đồng học viên F8<br></br> trên Facebook
      </Typography>
      <Typography mt={"20px"} fontSize={"14px"} color={"#333"}>
        Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy<br></br> tham
        gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học<br></br> nhé.
      </Typography>
      <Button
        sx={{
          mt: "15px",
          background: "white",
          color: "black",
          borderRadius: "99px",
          fontSize: "12px",
          height: "34px",
          border: "1px solid black",
        }}>
        Tham gia nhóm
      </Button>
    </Box>
  );
};

export default LearningRoadmapView;
