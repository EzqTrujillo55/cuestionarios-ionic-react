import { IonCard, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react'; 
import CuestionaryContext from '../context/CuestionaryContext';

const Calificacion = () => {
    const cuestionary = useContext(CuestionaryContext);
    const [puntaje, setPuntaje] = useState(0);
    
    useEffect(() => {
        let estado:any = [];
        cuestionary.cuestionarioRespondido.preguntas.forEach( (pregunta:any) => {
            estado[pregunta.id-1] = true 
            pregunta.opciones.forEach((opcion:any) => {
                pregunta.seleccionadas.forEach( (seleccionada:any)  => {
                    if(!opcion.correcta && opcion.id===seleccionada.id){
                        estado[pregunta.id-1] = false
                    }
                });
            });
        });


        console.log('estado', estado);

        let respuestasCorrectas = estado.filter((est:any) => est===true);
        console.log('respuestas correctas', respuestasCorrectas); 
        let puntajeT = respuestasCorrectas.length; 
        setPuntaje(puntajeT);
    }, [])


    return(
        <IonPage>
            <IonContent>
                <IonCard>
                    <IonCardTitle> Puntaje: {puntaje} </IonCardTitle>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Calificacion; 