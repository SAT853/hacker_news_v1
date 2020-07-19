export const setUrl = (url) => {
  return url.replace("https://", "").replace("http://", "").split(/[/*]/)[0];
};
