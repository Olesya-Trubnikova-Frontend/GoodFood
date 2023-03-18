import { DOGFOOD_LS_KEY } from "./constants";

export const initState = {
  user: {
    group: "sm9",
    email: "",
    token: "",
    name: "",
    about: "",
    avatar: "",
  },
  cart: [],
  filter: {
    search: "",
  },
  favorites: [],
};

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(DOGFOOD_LS_KEY);
  return dataFromLS ? JSON.parse(dataFromLS) : initState;
};
