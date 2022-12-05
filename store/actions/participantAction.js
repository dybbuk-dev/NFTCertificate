import Router from "next/router";
import {
  SET_TOKEN,
  SET_PARTICIPANT_ID,
  VALIDATE_ACCESS_TOKEN_START,
  VALIDATE_ACCESS_TOKEN_SUCCESS,
  VALIDATE_ACCESS_TOKEN_FAILED,
  GET_PARTICIPANT_DATA_START,
  GET_PARTICIPANT_DATA_SUCCESS,
  GET_PARTICIPANT_DATA_FAILED,
  GET_NFT_CERTIFICATE_START,
  GET_NFT_CERTIFICATE_SUCCESS,
  GET_NFT_CERTIFICATE_FAILED,
  GET_NFT_DATA_START,
  GET_NFT_DATA_SUCCESS,
  GET_NFT_DATA_FAILED,
} from "../types";
import axios from "axios";

export const setToken = (token) => async (dispatch) => {
  try {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
  } catch (error) {}
};

export const setParticipantId = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_PARTICIPANT_ID,
      payload: id,
    });
  } catch (error) {}
};

export const validateAccessToken = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: VALIDATE_ACCESS_TOKEN_START,
    });

    const response = await axios.get(
      `https://api-2-amazoniacripto.herokuapp.com/validateAccessToken/${token}/${id}`
    );

    dispatch({
      type: VALIDATE_ACCESS_TOKEN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VALIDATE_ACCESS_TOKEN_FAILED,
    });

    Router.push(`/errorPage?error=${"Error 400 - Not Matched"}`);
  }
};

export const getParticipantData = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PARTICIPANT_DATA_START,
    });

    const response = await axios.get(
      `https://api-2-amazoniacripto.herokuapp.com/getParticipantData/${id}`
    );

    dispatch({
      type: GET_PARTICIPANT_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PARTICIPANT_DATA_FAILED,
    });

    Router.push(
      `/errorPage?error=${"Error 400 - Error while getting Participant data"}`
    );
  }
};

export const getNFTCertificate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NFT_CERTIFICATE_START,
    });

    const response = await axios.get(
      `https://api-2-amazoniacripto.herokuapp.com/getNFTCertificate/${id}`
    );

    dispatch({
      type: GET_NFT_CERTIFICATE_SUCCESS,
    });
  } catch {
    dispatch({
      type: GET_NFT_CERTIFICATE_FAILED,
    });

    Router.push(`/errorPage?error=${"NFT certificate error!"}`);
  }
};

export const getNFTData = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NFT_DATA_START,
    });

    const response = await axios.get(
      `https://api-2-amazoniacripto.herokuapp.com/getParticipantNFTData/${id}`
    );

    dispatch({
      type: GET_NFT_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_NFT_DATA_FAILED,
    });

    Router.push(`/errorPage?error=${"Erro ao obter detalhes do NFT"}`);
  }
};

export const downloadImage = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api-2-amazoniacripto.herokuapp.com/downloadImage/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};
