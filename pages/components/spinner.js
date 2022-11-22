import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import spin from "../../assets/spin.gif";

export default function Spinner() {
  const desktop = useMediaQuery("(min-width:1024px)");
  const tablet = useMediaQuery("(min-width:768px)");
  return (
    <div>
      <Box className="banner">
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pt={desktop ? "12.5%" : tablet ? "12%" : "150px"}
            position="relative"
          >
            <Image
              src={spin}
              alt="spin"
              style={
                desktop
                  ? { width: "200px", height: "200px" }
                  : tablet
                  ? { width: "160px", height: "160px" }
                  : { width: "120px", height: "120px" }
              }
            />
          </Box>
          <Typography
            color="white"
            mt={tablet ? "50px" : "20px"}
            fontSize={desktop ? "32px" : tablet ? "24px" : "16px"}
            fontWeight="600"
            fontStyle="italic"
            sx={{ textAlign: "center" }}
          >
            Aportando na retirada de créditos de carbono...
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
