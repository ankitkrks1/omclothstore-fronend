// this will use to store the user details once he logged in/ singup

const initialUserData = JSON.parse(localStorage.getItem("User"))
// const initialUserData = {}
const userReducer = (state = initialUserData, action) => {
  switch (action.type) {
    case "ADD-USER":
      return action.user;
    case "REMOVE-USER":
      return {};
    default:
      return state;
  }
};

export default userReducer;
