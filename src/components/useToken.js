import { useState } from "react";

const useToken = () => {
  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  const [token, setToken] = useState(getToken());

  const storeToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: storeToken,
    token,
  };
};

export default useToken;
