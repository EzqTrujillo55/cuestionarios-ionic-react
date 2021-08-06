import { IonButton, IonCard, IonCheckbox, IonContent, IonInput, IonLabel, IonPage, IonTitle } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import CuestionaryContext from '../context/CuestionaryContext';


interface PreguntaProps extends RouteComponentProps<{
    id: string;
}> {}


const Pregunta: React.FC<PreguntaProps> = ({ match, history }) => {
    const cuestionary = useContext(CuestionaryContext);
    const [enunciado, setEnunciado] = useState('');
    const [opcion1, setOpcion1] = useState({ id: 1, valor: "", correcta: false });
    const [opcion2, setOpcion2] = useState({ id: 2, valor: "", correcta: true });
    const [opcion3, setOpcion3] = useState({ id: 3, valor: "", correcta: false });
    const [opcion4, setOpcion4] = useState({ id: 4, valor: "", correcta: false }); 


    function handleSiguiente(){

        if(enunciado===""){
            alert('Debe existir un enunciado!')
            return; 
        }

        if(opcion1.valor === "" || opcion2.valor === "" || opcion3.valor === "" || opcion4.valor === "" ){
            alert("Debe completar las opciones!"); 
            return; 
        }


        if(opcion1.correcta === false && opcion2.correcta === false && opcion3.correcta === false && opcion4.correcta === false){
            alert("Debe existir almenos una opción correcta!");
            return;
        }


        /*cuestionary.setCuestionario({
            id: cuestionary.cuestionario.id,
            nombre: cuestionary.cuestionario.nombre,
            preguntas: [
                {
                    id: 1, 
                    enunciado: enunciado,
                    opciones: [opcion1, opcion2, opcion3, opcion4]
                }
            ]
        })*/


        let preguntasActuales = cuestionary.cuestionario.preguntas; 
        preguntasActuales.push({
            id: preguntasActuales.length + 1, //aumento el id en base a la cantidad de preguntas actuales
            enunciado: enunciado,
            opciones: [opcion1, opcion2, opcion3, opcion4]
        })

        cuestionary.setCuestionario((prevState:any) => ({ 
            ...prevState, 
            preguntas: preguntasActuales
        }))

        setEnunciado("");
        setOpcion1({ id: 1, valor: "", correcta: false });
        setOpcion2({ id: 2, valor: "", correcta: false });
        setOpcion3({ id: 3, valor: "", correcta: false });
        setOpcion4({ id: 4, valor: "", correcta: false });
        history.push(`/cuestionario/pregunta/${parseInt(match.params.id)+1}`);
    }

    

  
    return(
        <IonPage>
            <IonContent>
                <IonTitle>  {cuestionary.cuestionario.nombre}  </IonTitle>

                <IonCard>
                    <IonLabel>Enunciado</IonLabel>
                    <IonInput value={enunciado} onIonChange={(e) => setEnunciado(e.detail.value!)} />
                </IonCard>
                <IonCard>
                    
                    <IonLabel> Opcion 1</IonLabel>
                    <IonCheckbox checked={opcion1.correcta} onIonChange={e =>  setOpcion1(prevState => ({...prevState, correcta: e.detail.checked, })) } />
                    <IonInput value={opcion1.valor} onIonChange={(e) => setOpcion1(prevState => ({ ...prevState, valor: e.detail.value!})) } />
                    
                    <IonLabel> Opcion 2</IonLabel>
                    <IonCheckbox checked={opcion2.correcta} onIonChange={e =>  setOpcion2(prevState => ({...prevState, correcta: e.detail.checked, })) } />
                    <IonInput value={opcion2.valor} onIonChange={(e) => setOpcion2(prevState => ({ ...prevState, valor: e.detail.value!})) } />
                    
                    <IonLabel> Opcion 3</IonLabel>
                    <IonCheckbox checked={opcion3.correcta} onIonChange={e =>  setOpcion3(prevState => ({...prevState, correcta: e.detail.checked, })) } />
                    <IonInput value={opcion3.valor} onIonChange={(e) => setOpcion3(prevState => ({ ...prevState, valor: e.detail.value!})) } />
                    
                    <IonLabel> Opcion 4</IonLabel>
                    <IonCheckbox checked={opcion4.correcta} onIonChange={e =>  setOpcion4(prevState => ({...prevState, correcta: e.detail.checked, })) } />
                    <IonInput value={opcion4.valor} onIonChange={(e) => setOpcion4(prevState => ({ ...prevState, valor: e.detail.value!})) } />
                    
                </IonCard>
                <IonButton onClick={handleSiguiente}>Siguiente</IonButton>

              

                <IonCard>
                    Preguntas creadas: 
                    {
                        cuestionary.cuestionario.preguntas.map((pregunta:any) => 
                            <IonLabel key={pregunta.id}> {pregunta.enunciado} </IonLabel>
                        )
                    }
                
                </IonCard>

            </IonContent>
        </IonPage>
    )
}

export default Pregunta;