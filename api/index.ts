import axios from "axios";

export const expensesApi = axios.create({
  baseURL: "https://react-native-course-5b2cb-default-rtdb.firebaseio.com",
});

export const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
});
