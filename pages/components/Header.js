import { Box, useMediaQuery, Typography, Link } from "@mui/material";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import Image from "next/image";
export default function Header(props) {
  const desktop = useMediaQuery("(min-width: 1024px)");
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
          {desktop ? "Desenvolvido por:" : ""}
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
          {desktop ? "Em parceria com" : " "}
        </Typography>
        <Link
          href={`/?token=${props.token}&participantId=${props.participantId}`}
        >
          <Image
            src={logo2}
            alt="logo2"
            width={tablet ? 300 : 150}
            height={tablet ? 100 : 50}
          />
        </Link>
      </Box>
    </>
  );
}
