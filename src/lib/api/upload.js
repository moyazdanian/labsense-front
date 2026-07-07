import axios from "../axios";

export const uploadImage = async ({ image }) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post("/upload", formData);

  return data;
};
