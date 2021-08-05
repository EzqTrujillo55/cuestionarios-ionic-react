import { IonButton, IonCard, IonContent, IonInput, IonLabel } from '@ionic/react';
import React, { useContext } from 'react';
import CuestionaryContext from '../context/CuestionaryContext';


const DetalleCuestionario:React.FC = () => {
    const cuestionary = useContext(CuestionaryContext); 
    return(
        <IonContent>
            <IonCard>
                <IonLabel> Nombre del cuestionario </IonLabel>
                <IonInput/>
                <IonButton> Siguiente </IonButton>
            </IonCard>
        </IonContent>
    )
}

export default DetalleCuestionario; 