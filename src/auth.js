// auth.js
import { LinkedIn } from "react-linkedin-login-oauth2";
const config = {
  clientId: "77l6aqdk67rw1w",
  redirectUri: "http://localhost:3000/auth/callback",
};

const LinkedInAuth = new LinkedIn(config);

export default LinkedInAuth;
