import { IonContent, IonPage, IonText, IonTitle, IonLabel, IonCard } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import CuestionaryContext from '../context/CuestionaryContext';


const ResumenCuestionario = () => {
    const cuestionary = useContext(CuestionaryContext);   

    useEffect(() => {
        console.log('cues', cuestionary.cuestionario);
    }, [])
    
    return(
        <IonPage>
            <IonContent>
                <IonTitle> Resumen de Cuestionario</IonTitle> 
                <IonText> Nombre: </IonText>
                <IonText> {cuestionary.cuestionario.nombre} </IonText>
                <IonText>Preguntas:</IonText> 
                    {
                        cuestionary.cuestionario.preguntas.map((pregunta:any) => 
                            <IonCard>
                                <IonLabel key={pregunta.id}> {pregunta.enunciado} </IonLabel>
                                <IonLabel> Opción correcta: </IonLabel>
                                <IonLabel> 
                                    {
                                        pregunta.opciones.map( 
                                            (opcion:any) => opcion.correcta && <IonLabel> {opcion.valor} </IonLabel>
                                        )
                                    }
                                </IonLabel>
                            </IonCard>
                        )
                    }
            </IonContent>
        </IonPage>
    )   
}

export default ResumenCuestionario; 