import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, useIonViewWillEnter, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonInput, IonCheckbox, IonText, IonRouterLink } from '@ionic/react';
import React, {useState} from 'react';
import { useHistory,Redirect, Route } from "react-router-dom";
import { authentication } from '../firebase/config';


const Login: React.FC = () => {
   
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit = async () => {
      var aux:any;
      aux = await authentication(email,password);
      console.log('dentro isAuth',aux);
      if(aux){
        localStorage.setItem('isAuth', aux); 
        history.push("/home/");
        window.location.reload(); //sirve para detectar cambios del localstorage
        } else {
        localStorage.setItem('isAuth','');
        alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <IonPage>
       <IonContent>
          <IonText className="ion-text-top">
            <h1> Iniciar sesión </h1>
          </IonText>
            <IonItem>
              <IonLabel position="floating">Correo electrónico</IonLabel>
              <IonInput type="email" name="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput type="password" name="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Recordarme</IonLabel>
              <IonCheckbox defaultChecked={false} slot="start" />
            </IonItem>
            <IonButton className="ion-margin-top" type="submit" expand="block" onClick={submit}>
              Iniciar sesión
            </IonButton>
        </IonContent>
        </IonPage>
    );
}

export default Login;