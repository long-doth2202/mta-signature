const UserApi = {
  postUserData(data) {
    fetch("/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },

  async getUserList() {
    return fetch("/get-user-list", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => console.log(error));
  },

  deleteUser(id) {
    return fetch("/user/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => console.log(error));
  },
};

export default UserApi;
