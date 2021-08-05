import { IonButton, IonCard, IonText } from '@ionic/react';
import React, {useEffect, useState} from 'react';

interface ContadorProps { 
    numero: number,
    letra: string,
    setNumero: Function
}

const Contador: React.FC<ContadorProps> = (props) => {
    //Destrucuturacion de objetos en javascript 
    const {numero, setNumero} = props; 
    
    const [broma, setBroma] = useState({ value: 'Cargando broma..'})

    const obtenerBroma = async () => {
        const request = await fetch('https://api.chucknorris.io/jokes/random')
        const json =  await request.json()
        setBroma(json);
    }

    useEffect(() => {
        console.log('Se ha cargado componente contador!')
        obtenerBroma()
    }, [])

    /*
        props = {
            numero: 2,
            letra: "M"
        }

        //Si yo quiero acceder a la prop numero --> props.numero
        //Si yo quiero acceder a la prop letra --> props.letra
    */

       

    return(
        <IonCard>
            <IonText> Contador </IonText>
            <IonText> {numero}  </IonText>
            <IonButton onClick={ ()  =>  setNumero(props.numero+1) } > Aumentar Número </IonButton>
            <IonButton onClick={ ()  =>  setNumero(props.numero-1) } > Restar Número </IonButton>
            <IonText> {broma.value} </IonText>
        </IonCard>
    )
}

export default Contador; 