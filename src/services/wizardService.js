import axios from 'axios'
const http = axios.create({
    baseURL: 'https://test.wanqara.com/api',
    headers: {
        'Content-Type': 'application/json'
      }
})

export const sendCode = async () => {
    try {
      const response = await http.get('/send-code');
      return response.data.status;
    } catch (error) {
      return false; 
    }
  };

  export const compareCode = async (code) => {
    try {
      const response = await http.post('/verify-code',  code );
      return response.data.status;
    } catch (error) {
      return false; 
    }
  };

  export const sendRucCode = async (ruc) => {
    try {
      const response = await http.get(`/ruc/${ruc}`);
      return response.data;
    } catch (error) {
      return false; 
    }
  };

  export const saveLead = async (data) => {
    try {
      const response = await http.post('/lead',  data );
      return response.data.status;
    } catch (error) {
      return false; 
    }
  };