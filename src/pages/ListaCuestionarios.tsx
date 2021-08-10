import { IonPage, IonCard, IonTitle, IonLabel, IonText, IonContent} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

interface ListaProps extends RouteComponentProps <{}> {}

const ListaCuestionarios : React.FC<ListaProps> = ({ match, history }) => {
    
    const cuestionarios = [
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
    ]
    
    return(
        <IonPage>
            <IonContent>
                <IonText> Lista de cuestionarios </IonText>
                {
                    cuestionarios.map(cuestionario => <IonCard onClick={() => history.push('1/resolver/pregunta/1')} >
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