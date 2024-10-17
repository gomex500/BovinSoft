import axios from "axios";
import { createContext, useEffect, useState } from "react";

 // creando context para variables globales
export const GlobalContext = createContext();


export const ProviderGlobalContext = ({children}) => {
    //estados para las funciones
    const [user,setUser] = useState('Jorge')
    const [vacas, setVacas] = useState([])
    const [finca, setFinca] = useState([])

    //token de autenticacion
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJGcmVkZHkiLCJhcGVsbGlkbyI6IkdvbWV6IiwiZmVjaGFfbmFjaW1pZW50byI6IllZWVktTU0tREQiLCJlbWFpbCI6ImRkZmRmZGZAZ21haWwuY29tIiwidGVsZWZvbm8iOiIrNTA1IDgyMTgxIDY2MyIsInJvbCI6ImFkbWluIiwiZGlyZWNjaW9uIjoianVpZ2FscGEsIGNob250YWxlcyIsInRpcG9TdXNjcmlwY2lvbiI6Im1lbnN1YWwiLCJleHAiOjE3MjkyNzcwNTd9.UhAE-hKI9H74g-ksrDmA8qlQfsi9NMyrQgY49kLy2J4'
    
    //obtener Ganados
    const ObtenerGanado =async () => { 
        try {
            const {data} = await axios.get('')
            setVacas(data)
        } catch (error) {
            
        }
     }
     
     //obtener listado de fincas
     const ObtenerFinca =async () => { 
        try {
            const {data} = await axios.get('')
            setFinca(data)
        } catch (error) {
            
        }
     }

     //obtener usuario por Id
     const ObtenerUsuario =async () => { 
        try {
            const {data} = await axios.get('https://bovinsoft-backend.onrender.com/user/66ff6c787a81ade5258dc6e6',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUser(data)
        } catch (error) {
            
        }
     }

     //peticion la primera ves que se cargue la vista
     useEffect( () => {
        
        const fetchData = async ()=>{
            await ObtenerUsuario();
            await ObtenerFinca()
        }
        
        fetchData();
       
    }, []);

    return (
        <GlobalContext.Provider
        //pasando variables de estado a las vistas
            value={{
                user,
                vacas,
                finca,
                ObtenerUsuario
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
