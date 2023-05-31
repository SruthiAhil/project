const userApi = (userData) => {
  fetch("/api", {
    method: "POST",
    body: userData,
  })
    .then((response) => response.json())
    .then((data) => {
      //return JSON.stringify(data.message);
      alert(JSON.stringify(data.message));
    })
    .catch((error) => {
      //return JSON.stringify(error);
      alert(JSON.stringify(error));
    });
};

export default userApi;
