import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { getLessons, getUser } from "./api";

const AppContext = React.createContext();

const initState = {
  loading: true,
  user: null,
  lessons: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetchUser = async (userId) => {
    dispatch({ type: "LOADING" });
    const res = await getUser(userId);

    dispatch({
      type: "STORE_USER",
      payload: res.data,
    });
  };

  const fetchLessons = async () => {
    dispatch({ type: "LOADING" });
    const res = await getLessons();

    dispatch({
      type: "STORE_LESSONS",
      payload: res.data.lessons
    });
  };

  useEffect(() => {
    // here to fetch userProgress: id = 1 here
    fetchUser("61b1cb9f81c41c229c1a99d9");
    fetchLessons();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
