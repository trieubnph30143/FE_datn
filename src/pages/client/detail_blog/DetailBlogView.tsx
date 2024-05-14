import { Box, Paper, Popover, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import user from "../../../images/user.png";
import article from "../../../images/article.png";
import parse from "html-react-parser";
import {
  RiBookmarkLine,
  RiFacebookCircleFill,
  RiHeartLine,
  RiMailFill,
  RiMessage3Line,
  RiMoreFill,
  RiTwitterFill,
} from "react-icons/ri";
import styled from "styled-components";

const DetailBlogView = () => {
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
      <Stack direction={"row"} justifyContent={"center"}>
        <Box width={"85%"}>
          <Box
            sx={{
              " .tox-editor-header": {
                display: "none !important",
              },
              ".tox-statusbar": {
                display: "none !important",
              },
              width: "100%",
            }}>
            <Box width={"100%"}>
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
                  <RiMoreFill
                    onClick={handleClick}
                    color='#333'
                    size={"20px"}
                  />
                </Stack>
              </Stack>
              <Stack direction={"row"}>
                <Box width={"60%"}>
                  <Typography variant='h6' fontWeight={"bold"}>
                    Config Zsh bằng Oh-my-zsh và P10k trên WSL cực ngầu ✨
                  </Typography>
                  <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                    Hello anh em , thì như blog trước mình có nói rằng mình ko
                    có dùng Ubuntu, nhưng sao lại có...
                  </Typography>
                  <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                    6 Ngày trước • 6 phút đọc
                  </Typography>
                </Box>
                <Box width={"40%"}></Box>
              </Stack>
            </Box>
            <Box mt={"30px"}>
              <Content
                html={`<h2 id="i-gioi-thieu-dev-mode" data-appended="true">I. Giới thiệu Dev Mode</h2>
                <h3>1.1 Dev Mode hữu &iacute;ch khi học kiến thức mới</h3>
                <p><em>Dev Mode</em>&nbsp;cực kỳ hữu &iacute;ch khi bạn học c&aacute;c kiến thức mới, n&oacute; gi&uacute;p bạn trải nghiệm thực tế lu&ocirc;n, thay v&igrave; chỉ xem video đơn thuần như hầu hết c&aacute;c kh&oacute;a học kh&aacute;c.</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f0031f9f336.png" alt="image.png"><em>B&ecirc;n tr&aacute;i l&agrave; b&agrave;i học video, b&ecirc;n phải l&agrave; tr&igrave;nh viết code v&agrave; browser hỗ trợ live reload.</em></p>
                <p>Ở h&igrave;nh ảnh tr&ecirc;n, m&igrave;nh vừa c&oacute; thể học kiến thức mới về&nbsp;<em>Grid CSS</em>, vừa c&oacute; thể tự tay trải nghiệm c&aacute;ch hoạt động của n&oacute;.</p>
                <h3>1.2 Dev mode hỗ trợ đa ng&ocirc;n ngữ</h3>
                <p>Dev Mode hỗ trợ đầy đủ c&aacute;c ng&ocirc;n ngữ kh&aacute;c nhau, t&ugrave;y thuộc v&agrave;o nội dung b&agrave;i học đang sử dụng ng&ocirc;n ngữ n&agrave;o.</p>
                <p>Hỗ trợ Sass - Ng&ocirc;n ngữ tiền xử l&yacute; CSS, hỗ trợ "Auto compile":</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f0050f31465.png" alt="image.png"><em>Bạn c&oacute; thể viết Sass trực tiếp trong tr&igrave;nh duyệt, qu&aacute; tr&igrave;nh bi&ecirc;n dịch diễn ra tự động.</em></p>
                <p>Hỗ trợ Javascript:</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f008718cdf5.png" alt="image.png"></p>
                <p><em>T&ugrave;y v&agrave;o nội dung b&agrave;i học, Dev Mode sẽ linh hoạt thay đổi ng&ocirc;n ngữ để đ&aacute;p ứng nhu cầu trải nghiệm một c&aacute;ch tốt nhất.</em></p>
                <hr>
                <h2 id="ii-cach-su-dung-dev-mode-hieu-qua" data-appended="true">II. C&aacute;ch sử dụng Dev Mode hiệu quả</h2>
                <h3>2.1 C&aacute;ch bật Dev Mode</h3>
                <p>Dev Mode chỉ hỗ trợ b&agrave;i học video. Tr&ecirc;n Header, bạn nhấn v&agrave;o biểu tượng sau để bật Dev Mode:</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f00b6da9f09.png" alt="image.png"><em>Trong Dev Mode, bạn vừa c&oacute; thể học qua video, vừa thực h&agrave;nh code.</em></p>
                <h3>2.2 Phải th&agrave;nh thạo c&uacute; ph&aacute;p để sử dụng</h3>
                <p>Dev Mode kh&ocirc;ng hỗ trợ gợi &yacute;, bắt buộc bạn phải th&agrave;nh thạo c&uacute; ph&aacute;p.</p>
                <blockquote>
                <p><em><strong>Theo m&igrave;nh, khi mới học tập th&igrave; th&agrave;nh thạo c&uacute; ph&aacute;p l&agrave; một trong những yếu tố quan trọng nhất. Tự g&otilde; to&agrave;n bộ l&agrave; c&aacute;ch duy nhất gi&uacute;p bạn th&agrave;nh thạo c&uacute; ph&aacute;p.</strong></em></p>
                </blockquote>
                <p>Dev Mode c&oacute; hỗ trợ Emmet:</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f00bf4267f9.png" alt="image.png"></p>
                <p>Kết quả sau khi nhấn&nbsp;<em>Tab</em>:</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f00c106e3b2.png" alt="image.png"></p>
                <p>Hoặc viết&nbsp;<em>CSS</em>&nbsp;thế n&agrave;y:</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f00c522259e.png" alt="image.png"></p>
                <p>Kết quả l&agrave;:</p>
                <p><img src="https://files.fullstack.edu.vn/f8-prod/blog_posts/8333/64f00c60c43b0.png" alt="image.png"></p>
                <blockquote>
                <p><em><strong>C&aacute;c bạn học Emmet tại đ&acirc;y:&nbsp;<a href="https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fdocs.emmet.io%2Fcheat-sheet%2F" target="_blank" rel="noopener noreferrer">https://docs.emmet.io/cheat-sheet/</a>. Lưu &yacute; l&agrave; kh&ocirc;ng cần học tất cả, khi cần c&aacute;i n&agrave;o th&igrave; v&agrave;o tra cứu c&aacute;i đ&oacute;. L&acirc;u dần bạn sẽ thuộc hết những Emmet thường d&ugrave;ng, vậy l&agrave; đủ.</strong></em></p>
                </blockquote>
                <h3>2.3 Giảm tốc độ video hoặc pause khi cần thiết</h3>
                <p>Khi video đang ph&aacute;t, nếu bạn chưa th&agrave;nh thạo c&uacute; ph&aacute;p th&igrave; rất kh&oacute; để g&otilde; code theo kịp. V&igrave; vậy, c&aacute;c bạn cần phải:</p>
                <ol>
                <li>Giảm tốc độ video hoặc pause video. G&otilde; lại c&aacute;c d&ograve;ng code v&agrave; trải nghiệm</li>
                <li>Luyện tập th&ecirc;m thật nhiều để th&agrave;nh thạo c&uacute; ph&aacute;p code, c&uacute; ph&aacute;p Emmet</li>
                <li>H&atilde;y tự t&ograve; m&ograve; th&ecirc;m, tự sửa code để xem n&oacute; chạy như thế n&agrave;o</li>
                </ol>
                <blockquote>
                <p><em><strong>T&ograve; m&ograve;, tự kh&aacute;m ph&aacute;/tự trải nghiệm l&agrave; điều kiện ti&ecirc;n quyết để trở th&agrave;nh một kỹ sư t&agrave;i giỏi trong tương lai</strong></em>.</p>
                </blockquote>
                <hr>
                <h3>III. Tổng kết</h3>
                <p>Dev Mode l&agrave; c&ocirc;ng cụ rất mạnh gi&uacute;p bạn học tập tốt hơn th&ocirc;ng qua trải nghiệm song song c&ugrave;ng với xem video. Tuy nhi&ecirc;n, bạn phải th&agrave;nh thạo c&uacute; ph&aacute;p code để Dev Mode thực sự ph&aacute;t huy sức mạnh.</p>
                <p>C&aacute;c kh&oacute;a học Pro hiện tại của F8 (hỗ trợ rất nhiều t&iacute;nh năng hiện đại m&agrave; c&aacute;c nền tảng kh&aacute;c kh&ocirc;ng c&oacute;):</p>
                <ol>
                <li>Kh&oacute;a học HTML CSS Pro:&nbsp;<a href="https://fullstack.edu.vn/landing/htmlcss/" target="_blank" rel="noopener noreferrer">https://fullstack.edu.vn/landing/htmlcss/</a></li>
                <li>Kh&oacute;a học ng&ocirc;n ngữ Sass:&nbsp;<a href="https://fullstack.edu.vn/landing/sass/" target="_blank" rel="noopener noreferrer">https://fullstack.edu.vn/landing/sass/</a></li>
                <li>C&aacute;c kh&oacute;a học kh&aacute;c, t&igrave;m hiểu th&ecirc;m tại trang chủ F8:&nbsp;<a href="https://fullstack.edu.vn/" target="_blank" rel="noopener noreferrer">https://fullstack.edu.vn/</a></li>
                </ol>`}
              />
            </Box>
            {/* <Editor
              apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
            initialValue={``}
              init={{
               
              }}
              disabled
            /> */}
          </Box>
        </Box>
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

export default DetailBlogView;

const Container = styled.div`
  margin: auto;
  padding: auto;
  all: unset; /* Remove all inherited styles */
  font-family: "Roboto Slab", serif;
`;

const Content = ({ html }: { html: string }) => (
  <Container dangerouslySetInnerHTML={{ __html: html }} />
);
