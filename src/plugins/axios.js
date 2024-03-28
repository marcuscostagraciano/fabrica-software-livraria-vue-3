import axios from "axios";

// axios.defaults.baseURL = "http://0.0.0.0:19003/api";
axios.defaults.baseURL = "http://localhost:19003/";
const token = "";
axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
// axios.defaults.baseURL = "https://livraria-drf.herokuapp.com/api";
