import { ADD_RATE, REMOVE_RATE, GET_RATE } from "../constants";

import baseURL from "../../assets/baseURL";
import axios from "axios";

export const getRates = () => {
  try {
    return async (dispatch) => {
      const res = await axios.get(`${baseURL}rates`);
      //console.log(res.data)
      if (res.data) {
        dispatch({
          type: GET_RATE,
          payload: res.data,
        });
      } else {
        console.log("Unable to fetch");
      }
    };
  } catch (error) {
    console.log("Api rates call error");
  }
};

// export const addRate = (rate) => (dispatch) => {
//     let rates = {
//       day: day,
//       value: value,
//     };

//   axios
//     .post(`${baseURL}rates`)
//     .then((res) => {
//       console.log(res);
//       if (res.status == 200) {
//         alert("rate added");
//         dispatch({
//           type: ADD_RATE,
//           payload: rate,
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const removeRate = (rate) => (dispatch) => {
  dispatch({
    type: REMOVE_RATE,
    payload: rate,
  });
};
