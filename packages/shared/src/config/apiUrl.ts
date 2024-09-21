const baseUrl = "http://thezivagroup.com/game/public/api/";
const version = "v1/";

const buildUrl = (endpoint: string) => {
  return `${baseUrl}${version}${endpoint}`;
};

export default {
  AUTH: {
    LOGIN: buildUrl("login"),
    SIGNUP: buildUrl("register"),
    FORGOT: buildUrl("forget-password"),
    FORGOTCONFIRM: buildUrl("update-password"),
    GOOGLE: buildUrl("google-login"),
  },
};
