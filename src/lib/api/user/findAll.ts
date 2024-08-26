import { ApiManager } from "../ApiManager";

export const findAllUser = async () => {
  try {
    const data = await ApiManager(`/user/find/find-all`);

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find All User", error);
    throw new Error(error)
  }
};
