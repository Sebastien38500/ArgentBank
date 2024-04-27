import React from 'react'
import "./App.scss";
import Home from "./pages/Home";
import { Provider } from 'react-redux'

const { MongoClient } = require('mongodb');

// URL de connexion
const url = 'mongodb://localhost:27017';

// Nom de la base de données
const dbName = 'populate-db';

// Utiliser le nouveau moteur de découverte et de surveillance des serveurs
const client = new MongoClient(url, { useUnifiedTopology: true });

// Se connecter au serveur
client.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    return;
  }

  console.log('Connecté à MongoDB');

  // Vous pouvez maintenant utiliser l'objet 'client' pour interagir avec la base de données

  // Exemple : Accéder à une base de données spécifique
  const db = client.db(dbName);

  // ...

  // Fermer la connexion lorsque vous avez terminé
  client.close();
});
function App(){
  return (
    <Provider>
    <Router>
      <Header />
      <section className="elementsToDisplay">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage/signIn" element={<SignIn />} />
          <Route path="/profilePage/Profile" element={<PrivateRoute />}>
       
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
      <Footer />
    </Router>
  </Provider>
  );



}

export default App;
