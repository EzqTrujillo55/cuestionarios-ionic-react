import {IonHeader, IonToolbar, IonButtons, IonMenuButton, IonPage, IonCard, IonTitle, IonLabel, IonText, IonContent, IonInput, IonButton } from '@ionic/react';
import React, {useEffect, useState} from 'react';
import { RouteComponentProps } from 'react-router';
import { db } from '../firebase/config';


interface ListaProps extends RouteComponentProps <{}> {}

const ListaCuestionarios : React.FC<ListaProps> = ({ match, history }) => {
    const [cuestionarios, setCuestionarios] = useState([]); 
    const [busqueda, setBusqueda ] = useState(""); 
    /*const cuestionarios = [
        {
            nombre: 'Cuestionario 1',
            preguntas: [
                {
                    id: 1,
                    enunciado: 'Cuál es la capitald de USA',
                    opciones: [
                        {
                            id: 1,
                            valor: 'NY',
                            correcta: false
                        },
                        {
                            id: 2,
                            valor: 'Washington',
                            correcta: true
                        }
                    ]
                },
                {
                    id: 2,
                    enunciado: 'Cuál es la capital de Brasil',
                    opciones: [
                        {
                            id: 1,
                            valor: 'Rio',
                            correcta: false
                        },
                        {
                            id: 2,
                            valor: 'Brasilia',
                            correcta: true
                        }
                    ]
                }
            ]
        }
    ]*/

    useEffect(() => {
        db.collection("cuestionarios").get()
        .then((respuesta) => {
            let aux:any = []
            respuesta.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let documentoCompleto = doc.data();
                documentoCompleto['id'] = doc.id; 
                aux.push(documentoCompleto)
            });
            setCuestionarios(aux); 
        });
    }, [])
    

    function handleBuscar(){
        if(busqueda === ""){
            alert('Debe llenar el campo!')
            return;
        }
        db.collection("cuestionarios").where("nombre", "==", busqueda).get()
        .then((respuesta) => {
            let aux:any = []
            respuesta.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let documentoCompleto = doc.data();
                documentoCompleto['id'] = doc.id; 
                aux.push(documentoCompleto)
            });
            setCuestionarios(aux); 
        });

    }

    return(
        <IonPage>
             <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cuestionarios</IonTitle>
        </IonToolbar>
      </IonHeader>
            
            <IonContent>
                <IonLabel> Buscar por texto </IonLabel>
                <IonInput onIonChange={(e) => setBusqueda(e.detail.value!)}  />
                <IonButton onClick={ handleBuscar } > Buscar </IonButton>
                <IonText> Lista de cuestionarios </IonText>
                {
                    cuestionarios.map((cuestionario:any, index:number) => <IonCard key={index} onClick={() => history.push('1/resolver/pregunta/1')} >
                            <IonTitle> {cuestionario.nombre} </IonTitle>
                            <IonLabel> Preguntas: {cuestionario.preguntas.length} </IonLabel>
                        </IonCard>    
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default ListaCuestionarios; 