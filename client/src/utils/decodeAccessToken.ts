import { AccessToken } from "../types/auth";

const decodeAccessToken = (accessToken: string | null): AccessToken =>
  accessToken ? JSON.parse(atob(accessToken.split(".")[1])) : null;

export default decodeAccessToken;
