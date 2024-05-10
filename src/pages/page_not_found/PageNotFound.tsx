import React from "react";
import sad from "../../images/768px-Emojione_1F613.svg.png";
import "../../App.css";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import logo from "../../images/f8-icon.18cd71cfcfa33566a22b.png"
const PageNotFound = () => {
  return (
    <Box>
        <header style={{display: "flex", padding: "25px", alignItems: "center", fontWeight: "600", gap: "15px"}}>
            <Link to='/'><img src={`${logo}`} alt="logo f8" width={50} height={50} style={{borderRadius: "10px"}}/></Link>
            <Link to='/' style={{textDecoration: "none",fontSize: "16px", color: "black"}}><p>Học lập trình để đi làm</p></Link>
        </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "50px",
          marginTop: "30px"
        }}
      >
        <div>
          <h1 className="not-found">404</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <h1 style={{ fontSize: "45px", fontWeight: "900" }}>
            Không tìm thấy nội dung
          </h1>
          <img src={`${sad}`} alt="icon-sad" width={50} height={50} />
        </div>
        <div
          style={{ textAlign: "center", lineHeight: "35px", fontWeight: "500" }}
        >
          <span>
            URL của nội dung này đã bị thay đổi hoặc không còn tồn tại. <br />
            Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì
            dùng URL đã lưu.
          </span>
        </div>
        <Button
          style={{
            backgroundColor: "#fa4619",
            borderRadius: "999px",
            padding: "14px 28px",
            fontWeight: "500",
            marginBottom: "25px"
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Truy cập trang chủ
          </Link>
        </Button>
        <div
          style={{
            fontWeight: "700",
            color: "#7a7c7d",
            //   position: "absolute",
            //   bottom: "0",
            flex: "1 1",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p>© 2018 - 2024 F8. Nền tảng học lập trình hàng đầu Việt Nam</p>
        </div>
      </div>
    </Box>
  );
};

export default PageNotFound;
