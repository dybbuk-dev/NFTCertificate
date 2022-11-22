import { Box, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import Header from "./components/Header";

export default function Spinner() {
  const desktop = useMediaQuery("(min-width:1024px)");
  const tablet = useMediaQuery("(min-width:768px)");
  const { query } = useRouter();
  return (
    <div>
      <Header token={query.token} participantId={query.participantId} />
      <Box className="banner">
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pt={desktop ? "12.5%" : tablet ? "12%" : "150px"}
            position="relative"
          ></Box>
          <Typography
            color="white"
            mt={tablet ? "90px" : "50px"}
            fontSize={desktop ? "32px" : tablet ? "24px" : "16px"}
            fontWeight="600"
            fontStyle="italic"
            sx={{ textAlign: "center" }}
          >
            {query.error}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
