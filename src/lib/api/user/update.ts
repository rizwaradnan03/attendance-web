import { ApiManager } from "../ApiManager";

export const updateUser = async ({image}) => {
  try {
    const data = await ApiManager(`/user/update/212014121`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        image: image
      }
    });

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Update User", error);
    throw new Error(error);
  }
};
