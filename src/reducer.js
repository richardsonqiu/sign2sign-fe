const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "STORE_USER") {
    return {
      ...state,
      user: action.payload,
      loading: false,
    };
  }

  if (action.type === "STORE_LESSONS") {
    return {
      ...state,
      lessons: action.payload,
    };
  }
};

export default reducer;
