import { Box, useMediaQuery, Typography, Link } from "@mui/material";
import logo from "../../assets/logo.png";
import Image from "next/image";
export default function Header(props) {
  const tablet = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={10}
      >
        <Typography fontSize={tablet ? "24px" : "8px"} fontStyle="italic">
          Desenvolvido por:
        </Typography>
        <Link
          href={`/?token=${props.token}&participantId=${props.participantId}`}
        >
          <Image
            src={logo}
            alt="logo"
            width={tablet ? 300 : 150}
            height={tablet ? 100 : 50}
          />
        </Link>
        <Typography fontSize={tablet ? "24px" : "8px"} fontStyle="italic">
          Em parceria com
        </Typography>
      </Box>
    </>
  );
}
