import axios from "axios";
import { useHistory } from "react-router-dom";

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");
        config.headers.authorization = access_token;

        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response.status;
        const url = window.location.href.split("/").at(-1);
        console.log("status is: ", status);
        console.log("url is: ", url);
        if (status == 401 && url != "login") {
            window.location.href = "/login";
        }
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
