import axios from "axios";

export const expensesApi = axios.create({
  baseURL: "https://react-native-course-5b2cb-default-rtdb.firebaseio.com",
});
