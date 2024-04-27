import axios from 'axios';
import { setUserName } from '../pages/Users/profileSlice';

/**
 * Fonction pour récupérer les données du profil utilisateur
 * @param {string} token - Jeton d'authentification de l'utilisateur
 * @returns {Promise<any>} Promesse avec les données de l'utilisateur
 */
export const fetchUserDatas = (token) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status >= 200 && res.status < 300) {
      const json = res.data.body;

      if (json.result && json.result.status === 'error') {
        dispatch(errorOccurred(json.result));
        dispatch(logOut());
      } else {
        const userName = json.result.userName;
        dispatch(setUserName(userName));
        dispatch(setUserName(userName));
        dispatch(verified(json.result));
      }

      // Vous pouvez également appeler vos actions setProfileUserName et setUserName ici si nécessaire
    } else {
      throw new Error('Échec de la requête avec le code de statut : ' + res.status);
    }
  } catch (error) {
    dispatch(warningOccurred(error.message));
  }
};
