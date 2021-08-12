import { IonPage, IonContent, IonText, IonCard, IonLabel, IonButton} from '@ionic/react';
import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import CuestionaryContext from '../context/CuestionaryContext';

interface ResumenCuestionarioResueltoProps extends RouteComponentProps  <{}> {}
const ResumenCuestionarioResuelto:React.FC<ResumenCuestionarioResueltoProps> = ({ match, history }) => {
    const cuestionary = useContext(CuestionaryContext); 



    return(
        <IonPage>
            <IonContent>
                <IonText> Resumen </IonText>
                <IonText> Nombre: </IonText>
                <IonText> {cuestionary.cuestionarioRespondido.nombre} </IonText>
                <IonText>Preguntas:</IonText> 
                    {
                        cuestionary.cuestionarioRespondido.preguntas.map((pregunta:any) => 
                            <IonCard>
                                <IonLabel key={pregunta.id}> {pregunta.enunciado} </IonLabel>
                                <IonLabel> Opciones seleccionadas: </IonLabel>
                                <IonLabel> 
                                    {
                                        pregunta.seleccionadas.map( 
                                            (seleccionada:any) => <IonLabel> {seleccionada.valor} </IonLabel>
                                        )
                                    }
                                </IonLabel>
                            </IonCard>
                        )
                    }

                    <IonButton onClick={() => history.push(`/cuestionario/calificacion`)} > Siguiente </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default ResumenCuestionarioResuelto; 