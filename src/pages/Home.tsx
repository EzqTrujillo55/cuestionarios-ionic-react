import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem } from '@ionic/react';
import { useState } from 'react';
import Contador from '../components/Contador';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {

  const [numero, setNumero] = useState(5); 



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        
       {/* <Contador numero={numero} setNumero={setNumero} letra="M" /> */} 
        <IonItem routerLink="/cuestionario/detalle">
          <IonButton> Crear Cuestionario </IonButton>
        </IonItem>
        <IonItem routerLink="/cuestionario/lista">
          <IonButton> Cuestionarios </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
