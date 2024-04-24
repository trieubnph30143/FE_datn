import { Box, Button, Stack, Typography } from "@mui/material";
import {
  RiAddFill,
  RiBatteryChargeFill,
  RiCheckFill,
  RiDashboard3Fill,
  RiMovie2Fill,
  RiSubtractFill,
  RiTimeFill,
  RiYoutubeFill,
} from "react-icons/ri";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import product from "../../images/7.png";

const DetailCourseView = () => {
  let arr = [1, 2];
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
  const handleTongleAll = () => {
    if (toggle) {
      setExpanded(Array(arr.length).fill(true));
      setToggle(false);
    } else {
      setExpanded(Array(arr.length).fill(false));
      setToggle(true);
    }
  };

  return (
    <Box>
      <Stack direction={"row"}>
        <Box width={"55%"}>
          <Typography fontSize={"28px"} fontWeight={"bold"}>
            Kiến Thức Nhập Môn IT
          </Typography>
          <Typography my={"20px"} color={"#333"} fontSize={"14px"}>
            Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem
            các videos tại khóa này trước nhé.
          </Typography>
          <Typography fontSize={"18px"} m={"20px 0 15px"} fontWeight={"bold"}>
            Bạn sẽ học được gì?
          </Typography>
          <Stack direction={"row"} gap={"18%"}>
            <Stack direction={"column"} gap={"10px"}>
              <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
                <RiCheckFill color={"#f05123"} />
                <Typography color={"#333"} fontSize={"14px"}>
                  Các kiến thức cơ bản, nền móng của ngành IT
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
                <RiCheckFill color={"#f05123"} />
                <Typography color={"#333"} fontSize={"14px"}>
                  Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng
                </Typography>
              </Stack>
            </Stack>
            <Stack direction={"column"} gap={"10px"}>
              <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
                <RiCheckFill color={"#f05123"} />
                <Typography color={"#333"} fontSize={"14px"}>
                  Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"8px"}>
                <RiCheckFill color={"#f05123"} />
                <Typography color={"#333"} fontSize={"14px"}>
                  Hiểu hơn về cách internet và máy vi tính hoạt động
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography fontSize={"18px"} m={"30px 0 15px"} fontWeight={"bold"}>
            Nội dung khóa học
          </Typography>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              fontSize={"15px"}
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <b>4</b> chương <b style={{ fontSize: "20px" }}>•</b> 12 bài học{" "}
              <b style={{ fontSize: "20px" }}>•</b> Thời lượng{" "}
              <b>03 giờ 26 phút</b>
            </Typography>
            <Typography
              onClick={handleTongleAll}
              fontSize={"14px"}
              color={"#f05123"}
              fontWeight={"bold"}>
              {toggle ? "Mở rộng tất cả" : "Thu nhỏ tất cả"}
            </Typography>
          </Stack>

          <ListAccordion
            handleTongle={handleTongle}
            expanded={expanded}
            arr={arr}
          />
        </Box>
        <Box
          width={"45%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}>
          <Box
            sx={{
              position: "relative",
              width: "513px",
              height: "289px",
              borderRadius: "15px",
            }}>
            <img
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "20px" }}
              src={product}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                background:
                  "linear-gradient(180deg, rgba(30, 30, 28, 0), rgba(30, 30, 28, .9))",
                borderRadius: "20px",
              }}></Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              <RiYoutubeFill size={"70px"} color={"white"} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              <Typography fontWeight={500} fontSize={"15px"} color={"white"}>
                Giới thiệu khóa học
              </Typography>
            </Box>
          </Box>
          <Typography variant='h4' my={"20px"} color={"#f05123"}>
            Miễn phí
          </Typography>
          <Button
            sx={{
              width: "180px",
              height: "40px",
              color: "white",
              background: "#f05123",
              borderRadius: "30px",
              fontWeight: "700",
            }}>
            ĐĂNG KÝ HỌC
          </Button>
          <Stack mt={"20px"}>
            <Stack direction={"column"} gap={"10px"}>
              <Stack direction={"row"} alignItems={"center"} gap={"15px"}>
                <RiDashboard3Fill size={"17px"} />{" "}
                <Typography fontSize={"14px"} color={"#333"}>
                  Trình độ cơ bản
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"15px"}>
                <RiMovie2Fill size={"17px"} />{" "}
                <Typography fontSize={"14px"} color={"#333"}>
                  Tổng số <b>12</b> bài học
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"15px"}>
                <RiTimeFill size={"17px"} />{" "}
                <Typography fontSize={"14px"} color={"#333"}>
                  Thời lượng <b>03 giờ 26 phút</b>
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} gap={"15px"}>
                <RiBatteryChargeFill size={"17px"} />{" "}
                <Typography fontSize={"14px"} color={"#333"}>
                  Học mọi lúc, mọi nơi
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default DetailCourseView;

const ListAccordion = (props: any) => {
  return (
    <>
      {props.arr.map((item: any, index: any) => {
        return (
          <Box
            onClick={() => props.handleTongle(index)}
            mt={"15px"}
            maxHeight={props.expanded[index] ? "500px" : "47px"}
            overflow={"hidden"}
            sx={{ transition: ".7s" }}>
            <Box>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"10px 20px"}
                bgcolor={"#f5f5f5"}
                borderRadius={"6px"}
                border={"1px solid #ebebeb"}>
                <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                  {props.expanded[index] ? (
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
              {props.arr.map((item: any, index2: any) => {
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
    </>
  );
};
