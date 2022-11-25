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
  const [minted, setMinted] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    setLoading(true);
    if (query.participantId !== undefined) {
      axios
        .get(
          `https://amazonia-cripto-back-end.onrender.com/validateAccessToken/${query.token}/${query.participantId}`
        )
        .then((res) => {
          if (res.status === 200) {
            axios
              .get(
                `https://amazonia-cripto-back-end.onrender.com/getParticipantData/${query.participantId}`
              )
              .then((result) => {
                setRole(result.data.role);
                setMinted(result.data.minted);
                setName(result.data.name);
                if (result.data.minted) {
                  axios
                    .get(
                      `https://amazonia-cripto-back-end.onrender.com/getParticipantNFTData/${query.participantId}`
                    )
                    .then((res) => {
                      setUrl(res.data.pinataImageURL);
                    })
                    .catch((err) => {
                      window.location.href = `http://localhost:3000/errorPage?error=${"Error 400 - This participant has none NFTs"}&token=${
                        query.token
                      }&participantId=${query.participantId}`;
                    });
                }
                setLoading(false);
              })
              .catch((err, res) => {
                window.location.href = `http://localhost:3000/errorPage?error=${"Error 400 - Error while getting Participant data"}&token=${
                  query.token
                }&participantId=${query.participantId}`;
              });
          }
        })
        .catch((err, res) => {
          window.location.href = `http://localhost:3000/errorPage?error=${"Error 400 - Not Matched"}&token=${
            query.token
          }&participantId=${query.participantId}`;
        });
    }
  }, [query.participantId]);
  return (
    <div>
      <Header token={query.token} participantId={query.participantId} />
      {loading ? (
        <Spinner />
      ) : (
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
                  {minted ? (
                    <Image
                      src={url}
                      alt="NFT URL"
                      width={desktop ? 450 : 360}
                      height={desktop ? 300 : 240}
                    />
                  ) : (
                    <Box
                      className="box"
                      sx={{
                        width: desktop ? 450 : 360,
                        height: desktop ? 300 : 240,
                      }}
                    />
                  )}
                </Box>
                <Box justifyContent="center" display="flex" pt="90px" mb="25px">
                  <a
                    className="btn"
                    href={`/certificatePage?token=${query.token}&participantId=${query.participantId}`}
                    style={{
                      fontSize: "32px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {minted ? "Ver NFT" : "Obter NFT"}
                  </a>
                </Box>
              </Grid>
              <Grid item xs={6} className="mockupRight">
                <Box display="flex" justifyContent="center">
                  <Box>
                    <Box
                      className="profile"
                      width="40vw"
                      py={2}
                      pl={desktop ? 23 : 17}
                      display="flex"
                    >
                      <Image src={profile} className="avatar" alt="profile" />
                      <Box>
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
                        Token NFT:{" "}
                        <strong>{minted ? "Resgatado" : "Disponível"}</strong>
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
                    <Box className="profile" pl={13} py={1} display="flex">
                      <Image
                        src={profile}
                        alt="profile"
                        className="avatar"
                      ></Image>
                      <Box>
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
                        Token NFT:{" "}
                        <strong>{minted ? "Resgatado" : "Disponível"}</strong>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} className="mockupLeft">
                <Box display="flex" justifyContent="center" my="70px">
                  {minted ? (
                    <Image src={url} alt="NFT URL" width={300} height={200} />
                  ) : (
                    <Box
                      className="box"
                      sx={{
                        width: 300,
                        height: 200,
                      }}
                    ></Box>
                  )}
                </Box>
                <Box display="flex" justifyContent="center">
                  <a
                    className="btn"
                    href={`/certificatePage?token=${query.token}&participantId=${query.participantId}`}
                    style={{
                      fontSize: "12px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {minted ? "Ver NFT" : "Obter NFT"}
                  </a>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </div>
  );
}
