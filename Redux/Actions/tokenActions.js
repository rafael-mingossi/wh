export const GET_TOKEN = 'GET_TOKEN';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokens = () => {
  try {
    return async (dispatch) => {
      await AsyncStorage.getItem('jwt')
        .then((res) => {
          if (res) {
            dispatch({
              type: GET_TOKEN,
              payload: res,
            });
          } else {
            console.log('Error to get token');
          }
        })
        .catch((error) => console.log(error));
    };
  } catch (err) {
    console.error(err);
  }
};

// export const getTokens = () => {
//   try {
//     return async (dispatch) => {
//       return await AsyncStorage.getItem('jwt')
//         .then((res) => {
//           if (res) {
//             dispatch({
//               type: GET_TOKEN,
//               payload: res,
//             });
//           } else {
//             console.log('Error to get token');
//           }
//         })
//         .catch((error) => console.log(error));
//     };
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const getUserToken = (token) => (dispatch) => {
//   dispatch({
//     type: GET_TOKEN,
//     payload: token,
//   });
// };
