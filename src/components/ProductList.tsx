import { Box, Grid, Typography } from "@mui/material";
import Product from "./Product";

const ProductList = ({ title ,type}: { title: string,type?:string }) => {
  return (
    <Box mt={"20px"} px={"40px"}>
      <Typography fontSize={30} fontWeight={"bold"}>
        {title}
      </Typography>
      <Grid container mt={"3px"} spacing={3}>
        {Array.from({ length: 4 }, (value, index) => (
          <Grid item xs={12} sm={6} md={3}>
            <Product type={type} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
