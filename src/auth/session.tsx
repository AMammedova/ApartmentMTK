export const setSessionVars = async ({
  refresh_token,
  access_token,
}: {
  refresh_token: string;
  access_token: string;
  expires_in: number;
}) => {
  await localStorage.setItem("refreshToken", refresh_token);
  await localStorage.setItem("accessToken", access_token);
  //   const expires: number = new Date().getTime() + params.expires_in * 1000;
  //   await sessionStorage.setItem("expires", `${expires}`);
  return await getSessionVars();
};

export const getSessionVars = async () => {
  const refreshToken = await localStorage.getItem("refreshToken");
  const accessToken = await localStorage.getItem("accessToken");

  //   let expiresStorage = await localStorage.getItem("expires");
  //   let expires = 0;
  //   if (expiresStorage) {
  //     expires = parseInt(expiresStorage, 10);
  //   }

  return { accessToken, refreshToken };
};

export const clearSessionVars = async () => {
  await localStorage.removeItem("refreshToken");
  await localStorage.removeItem("accessToken");
  //   await localStorage.removeItem("expires");
};
