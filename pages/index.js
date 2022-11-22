import Header from "./components/Header";
import { Box, Typography, useMediaQuery, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import profile from "../assets/profile.png";
import { useEffect, useState } from "react";
import Spinner from "./components/spinner";
import axios from "axios";

export default function Index() {
  const desktop = useMediaQuery("(min-width:1024px)");
  const tablet = useMediaQuery("(min-width:768px)");
  const [loading, setLoading] = useState(true);
  let { query } = useRouter();
  const [available, setAvailable] = useState("Indisponível");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setLoading(true);
    if (query.participantId !== undefined) {
      axios
        .get(
          `https://amazonia-cripto.onrender.com/validateAccessToken/${query.token}/${query.participantId}`
        )
        .then((res) => {
          if (res.status === 200) {
            axios
              .get(
                `https://amazonia-cripto.onrender.com/getParticipantData/${query.participantId}`
              )
              .then((result) => {
                setRole(result.data.role);
                if (result.data.minted === true) {
                  setAvailable("Disponível");
                } else {
                  setAvailable("Indisponível");
                }
                setName(result.data.name);
                setLoading(false);
              })
              .catch((err, res) => {
                window.location.href = `https://nftcertificate.herokuapp.com/errorPage?error=${"Error 400 - Error while getting Participant data"}&token=${
                  query.token
                }&participantId=${query.participantId}`;
              });
          }
        })
        .catch((err, res) => {
          window.location.href = `https://nftcertificate.herokuapp.com/errorPage?error=${"Error 400 - Not Matched"}&token=${
            query.token
          }&participantId=${query.participantId}`;
        });
    }
  }, [query.participantId]);
  return (
    <div>
      <Header token={query.token} participantId={query.participantId} />
      {loading && <Spinner />}
      <Grid container>
        {tablet ? (
          <>
            <Grid
              item
              xs={6}
              className="mockupLeft"
              sx={{ paddingY: { sm: 2, md: 4 } }}
            >
              <Box display="flex" justifyContent="center" mt="90px">
                <Box
                  className="box"
                  sx={{
                    width: desktop ? 450 : 360,
                    height: desktop ? 300 : 240,
                  }}
                >
                  <Box
                    ml="45%"
                    mt="23%"
                    mr="5%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      fontSize={desktop ? "32px" : "24px"}
                      textAlign="center"
                    >
                      {name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box justifyContent="center" display="flex" pt="90px" mb="25px">
                <a
                  className="btn"
                  href={`/certificatePage?token=${query.token}&participantId=${query.participantId}&name=${name}`}
                  style={{
                    fontSize: "32px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Obter NFT
                </a>
              </Box>
            </Grid>
            <Grid item xs={6} className="mockupRight">
              <Box display="flex" justifyContent="center">
                <Box>
                  <Box
                    className="profile"
                    height={desktop ? "130px" : "100px"}
                    width="40vw"
                    pt={2}
                    pl={desktop ? 23 : 17}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Image src={profile} className="avatar" alt="profile" />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <Typography fontSize={desktop ? "32px" : "24px"}>
                        <strong>{name} </strong>
                      </Typography>
                    </Box>
                  </Box>
                  <Box gap={2} mt={desktop ? "4rem" : "3rem"}>
                    <Typography fontSize={desktop ? "32px" : "24px"}>
                      Participação: <strong>{role}</strong>
                    </Typography>
                    <Typography fontSize={desktop ? "32px" : "24px"}>
                      Token NFT: <strong>{available}</strong>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} className="mockupRight">
              <Box display="flex" justifyContent="center" sx={{ mt: "10%" }}>
                <Box>
                  <Box
                    className="profile"
                    pl={13}
                    pt={2}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Image
                      src={profile}
                      alt="profile"
                      className="avatar"
                    ></Image>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <Typography fontSize="18px">
                        <strong>{name}</strong>
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt="2rem" mb="3rem">
                    <Typography fontSize="12px" mb="6px">
                      Participação: <strong>{role}</strong>
                    </Typography>
                    <Typography fontSize="12px">
                      Token NFT: <strong>{available}</strong>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} className="mockupLeft">
              <Box display="flex" justifyContent="center" my="70px">
                <Box
                  className="box"
                  sx={{
                    width: 300,
                    height: 200,
                  }}
                >
                  <Box
                    ml="45%"
                    mt="25%"
                    mr="5%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography fontSize="16px" textAlign="center">
                      {name}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                <a
                  className="btn"
                  href={`/certificatePage?token=${query.token}&participantId=${query.participantId}&name=${name}`}
                  style={{
                    fontSize: "12px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Obter NFT
                </a>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
