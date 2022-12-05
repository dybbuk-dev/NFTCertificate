import Header from "./components/Header";
import { Box, Typography, useMediaQuery, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/participantAction";
import profile from "../assets/profile.png";
import { useEffect, useState } from "react";
import Spinner from "./components/spinner";
import axios from "axios";

export default function Index() {
  const desktop = useMediaQuery("(min-width:1024px)");
  const tablet = useMediaQuery("(min-width:768px)");
  const { query } = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.lists.participantData);
  const [loading, setLoading] = useState(true);
  let listLoading = useSelector((state) => state.lists.loading);
  const token = useSelector((state) => state.lists.token);
  const participantId = useSelector((state) => state.lists.participantId);
  useEffect(() => {
    if (query?.token) {
      if (token !== query.token || participantId !== query.participantId) {
        dispatch(actions.setParticipantId(query.participantId));
        dispatch(actions.setToken(query.token));
        dispatch(actions.validateAccessToken(query.token, query.participantId));
        dispatch(actions.getParticipantData(query.participantId));
      } else setLoading(false);
    } else setLoading(false);
  }, [query?.token]);
  return (
    <div>
      <Header />
      {loading && listLoading ? (
        <Spinner label="verificando usuário" />
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
                  {data.minted ? (
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
                    href={`/certificatePage?token=${token}&participantId=${participantId}`}
                    style={{
                      fontSize: "32px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {data.minted ? "Ver NFT" : "Obter NFT"}
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
                          <strong>{data.name} </strong>
                        </Typography>
                      </Box>
                    </Box>
                    <Box gap={2} mt={desktop ? "4rem" : "3rem"}>
                      <Typography fontSize={desktop ? "32px" : "24px"}>
                        Participação: <strong>{data.role}</strong>
                      </Typography>
                      <Typography fontSize={desktop ? "32px" : "24px"}>
                        Token NFT:{" "}
                        <strong>
                          {data.minted ? "Resgatado" : "Disponível"}
                        </strong>
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
                          <strong>{data.name}</strong>
                        </Typography>
                      </Box>
                    </Box>
                    <Box mt="2rem" mb="3rem">
                      <Typography fontSize="12px" mb="6px">
                        Participação: <strong>{data.role}</strong>
                      </Typography>
                      <Typography fontSize="12px">
                        Token NFT:{" "}
                        <strong>
                          {data.minted ? "Resgatado" : "Disponível"}
                        </strong>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} className="mockupLeft">
                <Box display="flex" justifyContent="center" my="70px">
                  {data.minted ? (
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
                    href={`/certificatePage?token=${token}&participantId=${participantId}`}
                    style={{
                      fontSize: "12px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {data.minted ? "Ver NFT" : "Obter NFT"}
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
