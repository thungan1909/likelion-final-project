import axios from "axios";

//set up default config for http requests here
const AxiosClient = axios.create({
  baseURL: "http://localhost:8000/v1/",
  //common header
  headers: {
    "Content-Type": "application/json",
  },
  //parse params by queryString lib
  //because sometime axios default have some issues about null/undifined params
  // paramsSerializer: params => queryString.stringify(params),
});

//interceptor request 
AxiosClient.interceptors.request.use(
  (config) => {
    //iểm tra xem token đã được lưu trữ trước đó trong ứng dụng hay không,
    // sau đó gắn token này vào header của yêu cầu API.
    const token = localStorage.getItem("access_token");
    const additional = config;
    additional.headers = additional.headers ?? {};
    additional.headers.token = token ? `Bearer ${token}` : "";
    return additional;
  },
  (error) => {
    //Do something with request error
    // console.log(error);
    return Promise.reject(error);
  }
);


//interceptor response
//because almost return response.data 
// so if response have data => return response.dat
//if not, return response
AxiosClient.interceptors.response.use(
  (respone) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return respone.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// AxiosClient.interceptors.response.use((response) => {
//    if (response & response.data)
//    {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   }
//   return response;
// },
//   (error) => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     // return Promise.reject(error);
//     throw error;
//   }
// );
export default AxiosClient;
