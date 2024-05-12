import { Box, Button, Stack, Typography } from "@mui/material";
import Slider from "react-slick";
import slider1 from "../../../images/slider1.png";
import slider2 from "../../../images/slider2.png";
import slider3 from "../../../images/slider3.png";
import { useState } from "react";
import Product from "@/components/Product";
import ProductList from "@/components/ProductList";
type Props = {
  courses:typeCourses[];
};

const HomeView = ({courses}:Props) => {
  const settings = {
    customPaging: function (i: any) {
      return (
        <Box
          sx={{
            width: "32px",
            height: "8px",
            borderRadius: "5px",
            background: "#dce0e3",
          }}></Box>
      );
    },
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Box
        sx={{
          ".slick-slider": {
            zIndex: 0,
            width: "97.5%",
          },
          ".slick-list": {
            borderRadius: "20px",
            zIndex: "0 !important",
          },
          ".slick-prev, .slick-next": {
            zIndex: 1,
          },
          ".slick-prev": {
            left: "5px",
          },
          ".slick-next": {
            right: "19px",
          },
          ".slick-prev:before,.slick-next:before": {
            fontSize: "34px !important",
          },
          ".slick-dots": {
            display: "flex !important",
            gap: "15px",
            bottom: "-40px",
            left: "20px",
          },

          ".slick-dots .slick-active div": {
            background: "#9aa6af",
          },
          mb: "70px",
        }}
        className='slider-container'>
        <Slider {...settings}>
          <Box
            height={"270px"}
            borderRadius={"20px"}
            padding={"0 50px"}
            sx={{
              background:
                "linear-gradient(to right, rgb(253, 34, 92), rgb(253, 144, 4))",
            }}>
            <Stack
              direction={"row"}
              height={"100%"}
              justifyContent={"space-between"}>
              <Box
                width={"40%"}
                height={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color={"white"}>
                <Box>
                  <Typography fontWeight={700} variant='h4'>
                    Mở bán áo logo F8 đợt 2
                  </Typography>
                  <Typography my={"18px"}>
                    Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                    lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                    logo F8 - Fullstack.
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "36px",
                      border: "2px solid white",
                    }}>
                    ĐẶT ÁO NGAY
                  </Button>
                </Box>
              </Box>
              <Box
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}>
                <img src={slider1} />
              </Box>
            </Stack>
          </Box>
          <Box
            height={"270px"}
            borderRadius={"20px"}
            padding={"0 50px"}
            sx={{
              background:
                "linear-gradient(to right, rgb(136, 40, 250), rgb(89, 169, 250))",
            }}>
            <Stack
              direction={"row"}
              height={"100%"}
              justifyContent={"space-between"}>
              <Box
                width={"40%"}
                height={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color={"white"}>
                <Box>
                  <Typography fontWeight={700} variant='h4'>
                    Mở bán áo logo F8 đợt 2
                  </Typography>
                  <Typography my={"18px"}>
                    Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                    lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                    logo F8 - Fullstack.
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "36px",
                      border: "2px solid white",
                    }}>
                    ĐẶT ÁO NGAY
                  </Button>
                </Box>
              </Box>
              <Box
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}>
                <img src={slider2} />
              </Box>
            </Stack>
          </Box>
          <Box
            height={"270px"}
            borderRadius={"20px"}
            padding={"0 50px"}
            sx={{
              background:
                "linear-gradient(to right, rgb(104, 40, 250), rgb(255, 186, 164))",
            }}>
            <Stack
              direction={"row"}
              height={"100%"}
              justifyContent={"space-between"}>
              <Box
                width={"40%"}
                height={"100%"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color={"white"}>
                <Box>
                  <Typography fontWeight={700} variant='h4'>
                    Mở bán áo logo F8 đợt 2
                  </Typography>
                  <Typography my={"18px"}>
                    Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi
                    lúc, mọi nơi. Chất áo mềm mại, thoáng mát, ngực và tay áo in
                    logo F8 - Fullstack.
                  </Typography>
                  <Button
                    sx={{
                      color: "white",
                      height: "36px",
                      border: "2px solid white",
                    }}>
                    ĐẶT ÁO NGAY
                  </Button>
                </Box>
              </Box>
              <Box
                width={"60%"}
                display={"flex"}
                justifyContent={"center"}
                color={"white"}>
                <img src={slider3} />
              </Box>
            </Stack>
          </Box>
        </Slider>
      </Box>
      <ProductList type='takecharge' title='Khóa học Pro' />
      <ProductList type={"free"} data={courses} title='Khóa học miễn phí' />
      <ProductList type={"blog"} title='Bài viết nổi bật' />
      <ProductList type={"video"} title='Videos nổi bật' />
    </>
  );
};

export default HomeView;
