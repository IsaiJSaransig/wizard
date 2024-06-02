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
      console.log('Respuesta del servidor:', response.data);
      return response.data.status;
    } catch (error) {
      console.error('Error al enviar el código:', error);
      return false; 
    }
  };

  export const compareCode = async (code) => {
    try {
      const response = await http.post('/verify-code',  code );
      console.log('Respuesta del servidor2:', response.data);
      return response.data.status;
    } catch (error) {
      console.error('Error al validar el código2:', error);
      return false; 
    }
  };