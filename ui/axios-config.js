// axios-config.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Assurez-vous que c'est la bonne URL de base
  // autres configurations si nécessaire
});

export default instance;
