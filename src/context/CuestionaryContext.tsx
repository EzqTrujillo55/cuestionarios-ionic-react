import React,{useState, useEffect, ReactNode, Context} from 'react';


interface ICuestionaryContext {
    preguntas: any,
    setPreguntas: any,
    siguiente: any
}


//Creando contexto
const CuestionaryContext = React.createContext <ICuestionaryContext | {}>({});
export default CuestionaryContext; 

type AuthProviderProps = {
    children: ReactNode
};


 export const CuestionaryProvider: React.FC  = ({children}) => {
     
   
    //1. Inicializacion cuestionario
    //2. Nombre cuestionario
    //3. Pregunta (opciones, la opcion correcta, enunciado)

    const [preguntas, setPreguntas] = useState([])

    const siguiente = (indiceActual: number) => {
        const siguientePregunta = preguntas[indiceActual+1]
    }


    const cuestionaryValues: ICuestionaryContext = {
        preguntas: preguntas,
        setPreguntas: setPreguntas,
        siguiente: siguiente,
    };
    
    

    /*preguntas = [ 
        {
            id: 1,
            enunciado: 'cual es la capital de chile',
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

    */
    

    return (
        <CuestionaryContext.Provider value={cuestionaryValues}>
            {children}
        </CuestionaryContext.Provider>
    )
}
 