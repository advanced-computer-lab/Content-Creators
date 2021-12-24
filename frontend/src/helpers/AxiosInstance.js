import axios from "axios";
import { useHistory } from "react-router-dom";

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        console.log("INTERCEPTORRRRR IS HERE");
        console.log("config", config);
        console.log("config.headers", config.headers);
        const access_token = localStorage.getItem("access_token");
        config.headers.authorization = access_token;

        // if (access_token) {
        //     // Do something before request is sent
        //     config.headers.authorization = access_token;
        //     console.log("config.headers.Authorization", config.headers.authorization);
        //     // config.baseURL = "https://example.io/api/";
        //     console.log("ACCESS TOKEN IS:", access_token);
        // } else {
        //     window.location.href = "/login";
        //     console.log("Not authorized BRUV!");
        //     // history.push("/login");
        // }

        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        // block to handle success case
        return response;
    },
    (error) => {
        console.log("error is:", error);
        console.log("error response is:", error.response);
        console.log("error STATUS is:", error.response.status);
        window.location.href = "/login";
        // window.location.href = "/login";
        // // block to handle error case
        // const originalRequest = error.config;
        // const access_token = localStorage.getItem("access_token");
        // const refresh_token = localStorage.getItem("refresh_token");

        // if (
        //     error.response.status === 401 &&
        //     originalRequest.url === "http://dummydomain.com/auth/token" &&
        //     !access_token &&
        //     !refresh_token
        // ) {
        //     // Added this condition to avoid infinite loop
        //     // Redirect to any unauthorised route to avoid infinite loop...
        //     return Promise.reject(error);
        // }

        // if (
        //     error.response.status === 401 &&
        //     !originalRequest._retry &&
        //     refresh_token
        // ) {
        //     // Code inside this block will refresh the auth token

        //     originalRequest._retry = true;
        //     return axios
        //         .post("/auth/token", {
        //             refresh_token,
        //         })
        //         .then((res) => {
        //             if (res.status === 201) {
        //                 localStorage.setItem("access_token", res.data.access_token);
        //                 axios.defaults.headers.common["Authorization"] =
        //                     "Bearer " + localStorage.getItem("access_token");
        //                 return axios(originalRequest);
        //             }
        //         });
        // }
        return Promise.reject(error);
    }
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
};
