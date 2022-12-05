import {
  GET_NFT_CERTIFICATE_START,
  GET_NFT_CERTIFICATE_FAILED,
  GET_NFT_CERTIFICATE_SUCCESS,
  GET_NFT_DATA_START,
  GET_NFT_DATA_SUCCESS,
  GET_NFT_DATA_FAILED,
  GET_PARTICIPANT_DATA_FAILED,
  GET_PARTICIPANT_DATA_START,
  GET_PARTICIPANT_DATA_SUCCESS,
  SET_PARTICIPANT_ID,
  SET_TOKEN,
  VALIDATE_ACCESS_TOKEN_FAILED,
  VALIDATE_ACCESS_TOKEN_START,
  VALIDATE_ACCESS_TOKEN_SUCCESS,
} from "../types";

const initialState = {
  participantData: {},
  nftData: {},
  minted: false,
  token: "",
  participantId: "",
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_PARTICIPANT_ID:
      return {
        ...state,
        participantId: action.payload,
      };

    case VALIDATE_ACCESS_TOKEN_START:
      return {
        ...state,
      };

    case VALIDATE_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
      };

    case VALIDATE_ACCESS_TOKEN_FAILED:
      return {
        ...state,
      };

    case GET_PARTICIPANT_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case GET_PARTICIPANT_DATA_SUCCESS:
      return {
        ...state,
        minted: action.payload.minted,
        participantData: action.payload,
        loading: false,
      };

    case GET_PARTICIPANT_DATA_FAILED:
      return {
        ...state,
        loading: false,
      };

    case GET_NFT_CERTIFICATE_START:
      return {
        ...state,
      };

    case GET_NFT_CERTIFICATE_SUCCESS:
      return {
        ...state,
        minted: true,
      };

    case GET_NFT_CERTIFICATE_FAILED:
      return {
        ...state,
      };

    case GET_NFT_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case GET_NFT_DATA_SUCCESS:
      return {
        ...state,
        nftData: action.payload,
        loading: false,
      };

    case GET_NFT_DATA_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
