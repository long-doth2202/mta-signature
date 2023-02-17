const ImageApi = {
  postSigImage(id, data) {
    fetch("/upload-sig-image/" + id, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  },

  async getSignatureList(id) {
    return fetch("/get-signature-list/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => console.log(error));
  },
};

export default ImageApi;
