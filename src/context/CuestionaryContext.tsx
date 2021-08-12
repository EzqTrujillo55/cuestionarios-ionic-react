import React,{useState, useEffect, ReactNode, Context} from 'react';


interface ICuestionaryContext {
    cuestionario: any,
    setCuestionario: any,
    siguientePregunta: any,
    preguntaActual: any,
    setPreguntaActual: any,
    cuestionarioRespondido: any,
    setCuestionarioRespondido: any
}

interface ICuestionary {
    id: number,
    nombre: string, 
    preguntas: []
}

interface ICuestionaryRespondido{
    id: number,
    nombre: string,
    preguntas: []
}

interface IPregunta {
    id: number,
    enunciado: string, 
    opciones: []
}

//Creando contexto
const CuestionaryContext = React.createContext <ICuestionaryContext>({
    cuestionario: [],
    setCuestionario: null,
    siguientePregunta: null,
    preguntaActual: {},
    setPreguntaActual: null,
    cuestionarioRespondido: [],
    setCuestionarioRespondido: null
});
export default CuestionaryContext; 



 export const CuestionaryProvider: React.FC  = ({children}) => {
     
   
    //1. Inicializacion cuestionario
    //2. Nombre cuestionario
    //3. Pregunta (opciones, la opcion correcta, enunciado)

    const [cuestionario, setCuestionario] = useState <ICuestionary>({
        id: 0, 
        nombre: 'nombre',
        preguntas: [] 
    })


    const [cuestionarioRespondido, setCuestionarioRespondido] = useState <ICuestionaryRespondido>({
        id: 0,
        nombre:'nombre',
        preguntas: []
    }) 

    const [preguntaActual, setPreguntaActual] = useState <IPregunta>({
        id: 0,
        enunciado: '', 
        opciones: []
    })

    const siguientePregunta = (indicePreguntaActual: number) => {
        const siguientePregunta = cuestionario.preguntas[indicePreguntaActual+1]
    }


    const cuestionaryValues: ICuestionaryContext = {
        cuestionario: cuestionario,
        setCuestionario: setCuestionario,
        siguientePregunta: siguientePregunta,
        preguntaActual: preguntaActual,
        setPreguntaActual: setPreguntaActual,
        cuestionarioRespondido: cuestionarioRespondido,
        setCuestionarioRespondido: setCuestionarioRespondido
    };
    
    

    /*cuestionario =  {
            id: 1,
            nombre: 'mi cuestionario', 
            preguntas: [
                {
                    id: 1,
                    enunciado: 'cual es la capitadl de chile',
                    opciones: [
                        {
                            id: 1,
                            valor: 'Santiago',
                            correcta: true
                        },
                        {
                            id:2,
                            valor: 'Quito',
                            correcta: false
                        }  
                    ]
                }
            ]
            
        }
    */
    

    return (
        <CuestionaryContext.Provider value={cuestionaryValues}>
            {children}
        </CuestionaryContext.Provider>
    )
}
 