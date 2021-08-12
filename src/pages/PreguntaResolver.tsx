//@ts-ignore
//@ts-nocheck
import { IonPage, IonContent, IonTitle, IonCard, IonLabel, IonCheckbox, IonButton} from '@ionic/react';
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
    const [cuestionarioSeleccionado, setCuestionarioSeleccionado] = useState({
        id: 1,
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
                        id: 3,
                        valor: 'Miami',
                        correcta: false
                    },
                    {
                        id: 4,
                        valor: 'Chicago',
                        correcta: false
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
    })
    useEffect(() => {
        
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


    function seleccionar(opcion, checked){
        console.log('checked', checked);
        opcion['seleccionUsuario'] = checked

        if(typeof(opcion['seleccionUsuario'])!= "undefined"){    
            if(opcion['seleccionUsuario']){
                
                console.log('agregando')
        
                setSeleccionadas([...seleccionadas, opcion])
            }else{
                console.log('eliminando')
                let restantes = seleccionadas.filter(seleccionada => seleccionada.id != opcion.id)
                setSeleccionadas(restantes);
            }
        }
    }

    function siguiente(){        
        const idPregunta = parseInt(match.params.idPregunta); 
        const posicionPregunta = idPregunta - 1; 
        //Obtenemos pregunta actual, para actualizar el objeto con sus selecciones
        const preguntaActual = cuestionarioSeleccionado.preguntas[posicionPregunta]
        preguntaActual['seleccionadas'] = seleccionadas
        //Actualizamos el cuestionario con la pregunta actualizada, es decir con sus opciones
        cuestionarioSeleccionado.preguntas[posicionPregunta] = preguntaActual
        console.log('cuestonario actualizado', cuestionarioSeleccionado); 
        //Almacenamos el cuestioanrio respondido en el contexto
        cuestionary.setCuestionarioRespondido(cuestionarioSeleccionado);


        const idActual = parseInt(match.params.idPregunta)
        const idSiguiente = idActual + 1
        const posicionSiguiente = idSiguiente-1
        
        
        
        console.log('preguntas',  cuestionarioSeleccionado.preguntas.length);
        if( cuestionarioSeleccionado.preguntas.length === idActual){
            console.log('ultima pregunta, aqui mostrar resumen')
            history.push(`/cuestionario/${cuestionarioSeleccionado.id}/resolver/resumen`);
        }else{
            const siguientePregunta = cuestionarioSeleccionado['preguntas'][posicionSiguiente]
            setEnunciado(siguientePregunta.enunciado);
            setOpcion1(siguientePregunta.opciones[0]);
            setOpcion2(siguientePregunta.opciones[1]);
            setOpcion3(siguientePregunta.opciones[2]);
            setOpcion4(siguientePregunta.opciones[3]);
            //setSeleccionadas([]);
            history.push(`/cuestionario/${cuestionarioSeleccionado.id}/resolver/pregunta/${idSiguiente}`);
        }
        
    }


  

    return(
        <IonPage >
        <IonContent>
            <IonTitle>  {cuestionary.cuestionario.nombre}  </IonTitle>
            <IonTitle> Pregunta: {parseInt(match.params.idPregunta) } </IonTitle>
            <IonCard>
                <IonLabel>Enunciado</IonLabel>
                <IonLabel> {enunciado} </IonLabel>
            </IonCard>
            
                <IonCard>
                <IonLabel> {opcion1.valor} </IonLabel>
                <IonCheckbox
                    checked = {opcion1.seleccionUsuario}
                    onIonChange={ (e) => seleccionar(opcion1, e.detail.checked)}
                />

            </IonCard>

            <IonCard  >
                <IonLabel> {opcion2.valor} </IonLabel>
                 <IonCheckbox  
                 checked = {opcion2.seleccionUsuario}                                   
                    onIonChange={ (e) => seleccionar(opcion2, e.detail.checked)}
                />
            </IonCard>

            <IonCard>
                <IonLabel> {opcion3.valor} </IonLabel>
                <IonCheckbox 
                checked = {opcion3.seleccionUsuario}
                onIonChange={ (e) => seleccionar(opcion3, e.detail.checked)} />

            </IonCard>

            <IonCard>
                <IonLabel> {opcion4.valor} </IonLabel>
                <IonCheckbox 
                checked = {opcion4.seleccionUsuario}
                onIonChange={ (e) => seleccionar(opcion4, e.detail.checked)}
                />
            </IonCard>

            <IonButton onClick={siguiente} > Siguiente </IonButton>

        </IonContent>

       

        </IonPage>
    )
}


export default PreguntaResolver; 