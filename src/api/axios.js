import axios from 'axios';

console.log("This is the api!", process.env);

let axiosInstance = axios;

// If you need a different configuration for production, 
// you can use env variables: https://create-react-app.dev/docs/adding-custom-environment-variables
// if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
//     //https://github.com/axios/axios#creating-an-instance 
//     axiosInstance = axios.create({
//         withCredentials: true,
//         baseURL: process.env.REACT_APP_BACKEND
//     });
// }


export default axiosInstance;