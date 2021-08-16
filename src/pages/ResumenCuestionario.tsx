import { IonContent, IonPage, IonText, IonTitle, IonLabel, IonCard, IonButton } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import CuestionaryContext from '../context/CuestionaryContext';
import { db } from '../firebase/config';


const ResumenCuestionario = () => {
    const cuestionary = useContext(CuestionaryContext);   

    useEffect(() => {
        console.log('cues', cuestionary.cuestionario);
    }, [])

    const guardar = () => {
        var cuestionarioRef = db.collection('cuestionarios');
        cuestionarioRef.add(cuestionary.cuestionario)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('Cuestionario creado exitosamente!');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert('Algo ha salido mal, intenta luego de nuevo!')
        });
    }
    
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
                <IonButton onClick={() => guardar()} > Finalizar</IonButton>
            </IonContent>
        </IonPage>
    )   
}

export default ResumenCuestionario; 