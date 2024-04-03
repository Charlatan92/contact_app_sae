import axios from 'axios';

// Configurez Axios avec l'URL de base de votre API et d'autres paramètres
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/', // Votre URL de base API
  // Vous pouvez ajouter d'autres paramètres par défaut ici
});

export default axiosInstance;
