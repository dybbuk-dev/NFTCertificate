import Header from "./components/Header";
import { Box, Typography, useMediaQuery, Grid, Link } from "@mui/material";
import Image from "next/image";
import copy from "../assets/Copy.png";
import arrow from "../assets/arrow.png";
import check from "../assets/check.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./components/spinner";
import axios from "axios";

export default function certificatePage() {
  const desktop = useMediaQuery("(min-width:1018px)");
  const tablet = useMediaQuery("(min-width:768px)");
  let { query } = useRouter();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [description, setDescription] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setLoading(true);
    if (query.participantId !== undefined) {
      axios
        .get(
          `https://amazonia-cripto-back-end.onrender.com/getNFTCertificate/${query.participantId}`
        )
        .then((res) => {
          axios
            .get(
              `https://amazonia-cripto-back-end.onrender.com/getParticipantNFTData/${query.participantId}`
            )
            .then((res) => {
              setAddress(res.data.collectionAddress);
              setTokenID(res.data.tokenId);
              setDescription(res.data.description);
              setName(res.data.name);
              setUrl(res.data.pinataImageURL);
              setCollectionName(res.data.collectionName);
              setLoading(false);
            })
            .catch((err) => {
              window.location.href = `http://localhost:3000/errorPage?error=${"Error 400 - This participant has none NFTs"}&token=${
                query.token
              }&participantId=${query.participantId}`;
            });
        })
        .catch((err) => {
          axios
            .get(
              `https://amazonia-cripto-back-end.onrender.com/getParticipantNFTData/${query.participantId}`
            )
            .then((res) => {
              setAddress(res.data.collectionAddress);
              setTokenID(res.data.tokenId);
              setDescription(res.data.description);
              setName(res.data.name);
              setCollectionName(res.data.collectionName);
              setUrl(res.data.pinataImageURL);
              setLoading(false);
            })
            .catch((err) => {
              window.location.href = `http://localhost:3000/errorPage?error=${"Error 400 - This participant has none NFTs"}&token=${
                query.token
              }&participantId=${query.participantId}`;
            });
        });
    }
  }, [query.participantId]);

  const copyClipboard = () => {
    navigator.clipboard.writeText(address);
    alert("Copied address");
  };
  return (
    <div>
      <Header token={query.token} participantId={query.participantId} />
      {loading ? (
        <Spinner />
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
                  {address.substring(0, 5)} ......{" "}
                  {address.substring(address.length - 5)}
                </Typography>
                <Box display="flex" gap={1}>
                  <Image
                    src={copy}
                    alt="copy"
                    onClick={copyClipboard}
                    style={{ cursor: "pointer" }}
                  />
                  <Link
                    href={`https://polygonscan.com/address/${address}`}
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
                <Image src={url} alt="NFT URL" />
              </Box>
              <Box gap={2} mt="50px" mb={tablet ? "10px" : "40px"}>
                <Box display="flex" gap={2} sx={{ mb: "20px" }}>
                  <Typography
                    fontSize={desktop ? "32px" : tablet ? "26px" : "20px"}
                    color="white"
                  >
                    {collectionName}
                  </Typography>
                  <Image src={check} width="auto" height="auto" alt="check" />
                </Box>
                <Typography
                  fontSize={desktop ? "40px" : tablet ? "32px" : "22px"}
                  fontWeight="700"
                  color="white"
                >
                  {name}
                </Typography>
              </Box>
              <Box
                display={tablet ? "flex" : "none"}
                justifyContent="center"
                alignItems="center"
              >
                <a
                  className="btn"
                  href={`/?token=${query.token}&participantId=${query.participantId}`}
                  style={{
                    fontSize: desktop ? "32px" : tablet ? "26px" : "20px",
                    color: "white",
                  }}
                >
                  Voltar
                </a>
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
                    {address.substring(0, 5)} ......{" "}
                    {address.substring(address.length - 5)}
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
                    {tokenID}
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
                    {description}
                  </Typography>
                </Box>
              </Box>
              <Box
                display={tablet ? "none" : "flex"}
                justifyContent="center"
                alignItems="center"
              >
                <a
                  className="btn"
                  href={`/?token=${query.token}&participantId=${query.participantId}`}
                  style={{
                    fontSize: desktop ? "32px" : tablet ? "26px" : "20px",
                    color: "white",
                  }}
                >
                  Voltar
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
