import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API


const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken){
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
    }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data

    return response;
    }, async function (error) {
        const originalRequest = error.config
        if (error.response.status===401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh:refreshToken})
                localStorage.setItem('accessToken', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                console.log(error)
            }
        }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default axiosInstance;