import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { RiUploadCloudFill, RiUserSettingsFill } from "react-icons/ri";
import user from "../../images/user.png";

const SettingProfileView = () => {
  const [disableName, setDisableName] = useState(true);
  const [image, setImage] = useState(true);
  const [bio, setBio] = useState(true);

  const handleClickFocus = () => {
    setDisableName(!disableName);
  };
  const handleClickBio = () => {
    setBio(!bio);
  };
  const handleClickImage = () => {
    setImage(!image);
    setImageUrl(user)
    
  };
  const [imageUrl, setImageUrl] = useState(user);

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    if(image){
        setImage(!image);
    }
    if (!file) return;

    const reader: any = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={"bold"} fontSize={"27px"}>
        Cài đặt
      </Typography>
      <Stack direction={"row"} mt={"30px"} gap={"5%"}>
        <Box
          width={"30%"}
          bgcolor={"#EEEEEE"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderRadius: "6px",
          }}
          padding={"10px"}
          height={"48px"}
        >
          <RiUserSettingsFill size={25} color={"#ff5117"} />{" "}
          <Typography>Cài đặt tài khoản</Typography>
        </Box>
        <Box width={"47%"}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            paddingBottom={"8px"}
            borderBottom={"1px solid #666666"}
            fontSize={"20px"}
          >
            Thông tin cá nhân
          </Typography>
          <Box mt={"40px"}>
            <Typography fontWeight={"600"}>Họ tên</Typography>
            <Stack direction={"row"}>
              <Box width={"50%"}>
                <TextField
                  sx={{
                    mt: "8px",
                    width: "100%",
                    opacity: disableName ? ".5" : 1,
                    pointerEvents: disableName ? "none" : "auto",
                  }}
                  focused={!disableName}
                  id="standard-basic"
                  value={"Bùi văn toản"}
                  variant="standard"
                />
              </Box>
              <Box width={"50%"}>
                {!disableName ? (
                  <Box>
                    <Button
                      onClick={handleClickFocus}
                      sx={{
                        borderRadius: "30px",
                        border: "1px solid rgba(0, 0, 0, .15)",
                        color: "rgba(0, 0, 0, .54)",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "30px",
                        border: "1px solid #ff5117",
                        color: "#ff5117",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      Lưu
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={handleClickFocus}
                    sx={{
                      borderRadius: "30px",
                      border: "1px solid rgba(0, 0, 0, .15)",
                      color: "rgba(0, 0, 0, .54)",
                      fontSize: "12px",
                      float: "right",
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                )}
              </Box>
            </Stack>
            <Typography fontSize={"12px"} color={"#757575"} mt={"20px"}>
              Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận
              của bạn.
            </Typography>
          </Box>
          <Box mt={"40px"}>
            <Typography fontWeight={"600"}>Bio</Typography>
            <Stack direction={"row"}>
              <Box width={"50%"}>
                <TextField
                  sx={{
                    mt: "8px",
                    width: "100%",
                    opacity: bio ? ".5" : 1,
                    pointerEvents: bio ? "none" : "auto",
                  }}
                  focused={!bio}
                  id="standard-basic"
                  placeholder="Thêm giới thiệu"
                  variant="standard"
                />
              </Box>
              <Box width={"50%"}>
                {!bio ? (
                  <Box>
                    <Button
                      onClick={handleClickBio}
                      sx={{
                        borderRadius: "30px",
                        border: "1px solid rgba(0, 0, 0, .15)",
                        color: "rgba(0, 0, 0, .54)",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "30px",
                        border: "1px solid #ff5117",
                        color: "#ff5117",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      Lưu
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={handleClickBio}
                    sx={{
                      borderRadius: "30px",
                      border: "1px solid rgba(0, 0, 0, .15)",
                      color: "rgba(0, 0, 0, .54)",
                      fontSize: "12px",
                      float: "right",
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                )}
              </Box>
            </Stack>
            <Typography fontSize={"12px"} color={"#757575"} mt={"20px"}>
              Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của
              bạn.
            </Typography>
          </Box>
          <Box mt={"40px"}>
            <Typography fontWeight={"600"}>Avatar</Typography>
            <Stack direction={"row"}>
              <Box
                width={"50%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography fontSize={"12px"} color={"#757575"} mt={"20px"}>
                  Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
                </Typography>
                <Box sx={{ width: "28%" }}>
                  <div
                    className="container"
                    style={{
                      width: "100%",
                    }}
                  >
                    <label
                      htmlFor="input-img"
                      className="preview"
                      style={{
                        border: "2px dashed  #ff5117",
                        width: "100%",
                        height: "100px",
                        color: " #ff5117",
                        fontSize: "22px",
                        position: "relative",
                        borderRadius: "6px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      { imageUrl ? (
                        <img
                          src={imageUrl}
                          width={"100%"}
                          height={"100%"}
                          style={{
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            background: "white",
                          }}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                      <RiUploadCloudFill size={"27px"} />
                      <Typography fontSize={"14px"}>
                        Upload to image 
                      </Typography>

                    </label>
                    {!image?<Typography textAlign={"center"} mt={"10px"} fontSize={"12px"}>Nhấn vào đây để chọn ảnh khác</Typography>:""}
                    <input
                      onChange={handleImageChange}
                      type="file"
                      hidden
                      id="input-img"
                    />
                  </div>
                </Box>
              </Box>
              <Box width={"50%"}>
                {!image ? (
                  <Box>
                    <Button
                      onClick={handleClickImage}
                      sx={{
                        borderRadius: "30px",
                        border: "1px solid rgba(0, 0, 0, .15)",
                        color: "rgba(0, 0, 0, .54)",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      sx={{
                        borderRadius: "30px",
                        border: "1px solid #ff5117",
                        color: "#ff5117",
                        fontSize: "12px",
                        float: "right",
                      }}
                    >
                      Lưu
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={handleClickImage}
                    sx={{
                      borderRadius: "30px",
                      border: "1px solid rgba(0, 0, 0, .15)",
                      color: "rgba(0, 0, 0, .54)",
                      fontSize: "12px",
                      float: "right",
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>
          <Box mt={"40px"}>
            <Typography fontWeight={"600"}>Email/Phone</Typography>
            <Stack direction={"row"}>
              <Box width={"100%"}>
                <TextField
                  sx={{
                    mt: "8px",
                    width: "100%",
                    opacity: ".5",
                    pointerEvents: "none",
                  }}
                  id="standard-basic"
                  value={"toanbui219@gmail.com"}
                  variant="standard"
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default SettingProfileView;
