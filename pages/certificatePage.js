import Header from "./components/Header";
import { Box, Typography, useMediaQuery, Grid, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions/participantAction";
import Image from "next/image";
import copy from "../assets/Copy.png";
import arrow from "../assets/arrow.png";
import check from "../assets/check.png";
import { useEffect, useState } from "react";
import Spinner from "./components/spinner";
import axios from "axios";

export default function certificatePage() {
  const desktop = useMediaQuery("(min-width:1018px)");
  const tablet = useMediaQuery("(min-width:768px)");
  const [loading, setLoading] = useState(true);
  setLoading(useSelector((state) => state.lists.loading));
  const participantId = useSelector((state) => state.lists.participantId);
  const minted = useSelector((state) => state.lists.minted);
  const data = useSelecotr((state) => state.lists.nftData);
  useEffect(() => {
    if (!minted) {
      dispatch(actions.getNFTCertificate(participantId));
    }
    dispatch(actions.getNFTData(participantId));
  }, [dispatch, participantId]);
  const copyClipboard = () => {
    navigator.clipboard.writeText(data.address);
    alert("Copied address");
  };
  return (
    <div>
      <Header />
      {loading ? (
        <Spinner label="Mintando NFT. Pode levar aproximadamente 1 minuto" />
      ) : (
        <Grid container>
          <Grid item xs={tablet ? 6 : 12} className="signLeft">
            <Box sx={{ padding: tablet ? "10%" : "20px" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ mb: "50px" }}
              >
                <Typography
                  fontSize={desktop ? "32px" : tablet ? "26px" : "20px"}
                  color="white"
                >
                  {data.address.substring(0, 5)} ......{" "}
                  {data.address.substring(data.address.length - 5)}
                </Typography>
                <Box display="flex" gap={1}>
                  <Image
                    src={copy}
                    alt="copy"
                    onClick={copyClipboard}
                    style={{ cursor: "pointer" }}
                  />
                  <Link
                    href={`https://polygonscan.com/address/${data.address}`}
                    target="_blank"
                  >
                    <Image
                      src={arrow}
                      width="auto"
                      height="auto"
                      alt="arrow"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" mt="30px">
                <Image
                  src={url}
                  width={desktop ? 450 : tablet ? 360 : 300}
                  height={desktop ? 300 : tablet ? 240 : 200}
                  alt="NFT URL"
                />
              </Box>
              <Box gap={2} mt="50px" mb={tablet ? "10px" : "40px"}>
                <Box display="flex" gap={2} sx={{ mb: "20px" }}>
                  <Typography
                    fontSize={desktop ? "32px" : tablet ? "26px" : "20px"}
                    color="white"
                  >
                    {data.collectionName}
                  </Typography>
                  <Image src={check} width="auto" height="auto" alt="check" />
                </Box>
                <Typography
                  fontSize={desktop ? "40px" : tablet ? "32px" : "22px"}
                  fontWeight="700"
                  color="white"
                >
                  {data.name}
                </Typography>
              </Box>
              <Box
                display={tablet ? "flex" : "none"}
                justifyContent="space-between"
                alignItems="center"
                marginX={desktop ? 3 : 1}
              >
                <a
                  className="btn"
                  href={"/"}
                  style={{
                    fontSize: desktop ? "32px" : tablet ? "26px" : "20px",
                    color: "white",
                  }}
                >
                  Voltar
                </a>
                <button
                  className="btn"
                  style={{
                    border: "none",
                    fontSize: desktop ? "32px" : tablet ? "26px" : "20px",
                    color: "white",
                    paddingTop: tablet ? "18px" : "12px",
                    paddingBottom: tablet ? "18px" : "12px",
                  }}
                  onClick={() => dispatch(actions.downloadImage(participantId))}
                >
                  Babar
                </button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={tablet ? 6 : 12} className="mockupRight">
            <Box
              sx={{
                padding: tablet ? "30px" : "50px",
                mt: tablet ? "3%" : "2%",
                width: tablet ? "90vw" : "100%",
              }}
            >
              <Typography
                fontSize={desktop ? "32px" : tablet ? "26px" : "20px"}
                fontWeight="600"
              >
                Detalhes Blockchain
              </Typography>
              <Box sx={{ padding: desktop ? "30px" : "10px" }} mt={2} mb={4}>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    Endereço do Smart Contract
                  </Typography>
                  <Typography
                    color="#43793F"
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    {data.address.substring(0, 5)} ......{" "}
                    {data.address.substring(data.address.length - 5)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="20px">
                  <Typography
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    {" "}
                    ID do token
                  </Typography>
                  <Typography
                    color="#43793F"
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    {data.tokenID}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="20px">
                  <Typography
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    Standard dos tokens
                  </Typography>
                  <Typography
                    color="#43793F"
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    ERC-721
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="20px">
                  <Typography
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    Blockchain
                  </Typography>
                  <Typography
                    color="#43793F"
                    fontSize={desktop ? "18px" : tablet ? "15px" : "12px"}
                  >
                    {" "}
                    Polygon
                  </Typography>
                </Box>
              </Box>
              <Typography
                pt={2}
                fontSize={desktop ? "32px" : tablet ? "26px" : "20px"}
                fontWeight="600"
              >
                Descrição da Coleção
              </Typography>
              <Box sx={{ padding: desktop ? "30px" : "10px" }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize={desktop ? "18px" : "15px"}>
                    {data.description}
                  </Typography>
                </Box>
              </Box>
              <Box
                display={tablet ? "none" : "flex"}
                justifyContent="space-around"
                alignItems="center"
              >
                <a
                  className="btn"
                  href={"/"}
                  style={{
                    fontSize: desktop ? "32px" : tablet ? "26px" : "20px",
                    color: "white",
                  }}
                >
                  Voltar
                </a>
                <button
                  className="btn"
                  style={{
                    border: "none",
                    fontSize: desktop ? "32px" : tablet ? "26px" : "20px",
                    color: "white",
                    paddingTop: tablet ? "18px" : "12px",
                    paddingBottom: tablet ? "18px" : "12px",
                  }}
                  onClick={() => dispatch(actions.downloadImage(participantId))}
                >
                  Babar
                </button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
