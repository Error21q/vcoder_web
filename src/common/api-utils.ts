export const getAccessToken = () => {
  const access_token: any = localStorage.getItem("access_token");
  // const parsedUser: any = JSON.parse(user);
  return access_token;
};
