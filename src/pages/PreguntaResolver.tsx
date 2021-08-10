//@ts-ignore
//@ts-nocheck
import { IonPage, IonContent, IonTitle, IonCard, IonLabel, IonCheckbox} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react'; 
import { RouteComponentProps } from 'react-router';
import CuestionaryContext from '../context/CuestionaryContext';

interface PreguntaProps extends RouteComponentProps  <{
    idCuestionario: string;
    idPregunta: string; 
}> {}


const PreguntaResolver: React.FC<PreguntaProps> = ({ match, history }) => {
    const cuestionary = useContext(CuestionaryContext);
    const [enunciado, setEnunciado] = useState(''); 
    const [opcion1, setOpcion1] = useState({ id: 1, valor: "", correcta: false }); 
    const [opcion2, setOpcion2] = useState({ id: 2, valor: "", correcta: false }); 
    const [opcion3, setOpcion3] = useState({ id: 3, valor: "", correcta: false }); 
    const [opcion4, setOpcion4] = useState({ id: 4, valor: "", correcta: false }); 
    
    const [seleccionadas, setSeleccionadas ] = useState([]); 

    useEffect(() => {
        const cuestionarioSeleccionado = {
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
                        },
                        {
                            id: 1,
                            valor: 't',
                            correcta: false
                        },
                        {
                            id: 2,
                            valor: 'Wington',
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
                            correcta: false
                        },
                        {
                            id: 3,
                            valor: 'Brasilia',
                            correcta: false
                        },
                        {
                            id: 4,
                            valor: 'Brasilia',
                            correcta: false
                        }
                    ]
                }
                
            ]
        }
        cuestionary.setCuestionario(cuestionarioSeleccionado);
        
        const idPregunta = parseInt(match.params.idPregunta); 
        const posicionPregunta = idPregunta - 1; 

        const preguntaActual = cuestionarioSeleccionado.preguntas[posicionPregunta]
        console.log('pregunt actual', preguntaActual)
        setEnunciado(preguntaActual.enunciado);
        
        setOpcion1(preguntaActual.opciones[0]);
        setOpcion2(preguntaActual.opciones[1]);
        setOpcion3(preguntaActual.opciones[2]);
        setOpcion4(preguntaActual.opciones[3]);
        
        console.log('selecnads', seleccionadas);

    }, [seleccionadas])


    const seleccionar = (opcion) => {
        setSeleccionadas([...seleccionadas, opcion ]); 
    }


    function check(opcion){
        seleccionadas.map(op => {
            if(op.valor === opcion.valor){
                return true; 
            }
            return false; 
        })
    }

    return(
        <IonPage >
        <IonContent>
            <IonTitle>  {cuestionary.cuestionario.nombre}  </IonTitle>

            <IonCard>
                <IonLabel>Enunciado</IonLabel>
                <IonLabel> {enunciado} </IonLabel>
            </IonCard>

            
                <IonCard>
                <IonLabel> {opcion1.valor} </IonLabel>
                <IonCheckbox 
                   
                    onIonChange={ () => seleccionar(opcion1)}
                />

            </IonCard>

            <IonCard  >
                <IonLabel> {opcion2.valor} </IonLabel>
                 <IonCheckbox 
                   
                    onIonChange={ () => seleccionar(opcion2)}
                />
            </IonCard>

            <IonCard>
                <IonLabel> {opcion3.valor} </IonLabel>
                <IonCheckbox checked={opcion3.correcta} 
                onIonChange={ () => seleccionar(opcion3)} />

            </IonCard>

            <IonCard>
                <IonLabel> {opcion4.valor} </IonLabel>
                <IonCheckbox checked={opcion4.correcta} 
                onIonChange={ () => seleccionar(opcion4)}/>
            </IonCard>
            <IonCard>
            {
                seleccionadas.length > 0 &&
                seleccionadas.map(opcion =>  <IonLabel>{opcion.valor}</IonLabel> )
            }
        </IonCard>
        </IonContent>

       

        </IonPage>
    )
}


export default PreguntaResolver; 