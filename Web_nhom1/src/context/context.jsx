import { createContext, useEffect, useState } from "react";
import { getUser } from "../api/Auth";
import { setRestAuth } from "../api/AxiosClient";
import { getCarts } from "../api/CartApi";

export const Context = createContext();
// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);

  const handleGetCarts = () =>
    getCarts().then((resp) => setCart(resp?.carts || [])).catch((error) => {
      console.error("Failed to get carts:", error);
      setCart([]);
    });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("accessToken");

    console.log("Context init - User ID:", userId);
    console.log("Context init - Token:", accessToken ? "Present" : "Missing");

    accessToken && setRestAuth(accessToken);
    if (userId) {
      getUser(userId).then((resp) => {
        console.log("User loaded:", resp?.user);
        setUser(resp?.user);
      });
      handleGetCarts();
    }
  }, []);

  return (
    <Context.Provider value={{ user, cart, setUser, setCart, handleGetCarts }}>
      {children}
    </Context.Provider>
  );
};
