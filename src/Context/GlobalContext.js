import { API_URL } from "@env";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

 // creando context para variables globales
export const GlobalContext = createContext();


export const ProviderGlobalContext = ({children}) => {
    //estados para las funciones
    const [user,setUser] = useState({});
    const [vacas, setVacas] = useState([]);
    const [finca, setFinca] = useState([]);

    //obtener Ganados
    const ObtenerGanado =async () => { 
        try {
            const {data} = await axios.get(`${API_URL}/bovino/byFarm/6713a87affe35c5e70d86f8b`,{
                headers:{
                    Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJqdWFuIiwiYXBlbGxpZG8iOiJnb256YWxleiIsImZlY2hhX25hY2ltaWVudG8iOiJZWVlZLU1NLUREIiwiZW1haWwiOiJnb21lemZyZWRkeTg4NkBnbWFpbC5jb20iLCJ0ZWxlZm9ubyI6Iis1MDUgODI4MSA2NjMiLCJyb2wiOiJhZG1pbiIsImRpcmVjY2lvbiI6Imp1aWdhbHBhLCBjaG9udGFsZXMiLCJ0aXBvU3VzY3JpcGNpb24iOiJtZW5zdWFsIiwiZXhwIjoxNzI5NDIxNTI5fQ.kalntEwAY9v52KUm4dQpZ_6JDfc9X2SrdE3LQD6n0yg'
                }
            })
            setVacas(data);
        } catch (error) {
            console.log(error);
        }
     }
     
     //obtener listado de fincas
     const ObtenerFinca = async () => { 
        try {
            const {data} = await axios.get(`${API_URL}/finca/66ff6c787a81ade5258dc6e6`,{
                headers:{
                    Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJqdWFuIiwiYXBlbGxpZG8iOiJnb256YWxleiIsImZlY2hhX25hY2ltaWVudG8iOiJZWVlZLU1NLUREIiwiZW1haWwiOiJnb21lemZyZWRkeTg4NkBnbWFpbC5jb20iLCJ0ZWxlZm9ubyI6Iis1MDUgODI4MSA2NjMiLCJyb2wiOiJhZG1pbiIsImRpcmVjY2lvbiI6Imp1aWdhbHBhLCBjaG9udGFsZXMiLCJ0aXBvU3VzY3JpcGNpb24iOiJtZW5zdWFsIiwiZXhwIjoxNzI5NDIxNTI5fQ.kalntEwAY9v52KUm4dQpZ_6JDfc9X2SrdE3LQD6n0yg'
                }
            })
            setFinca(data);
        } catch (error) {
            console.log(error);
        }
     }

     //obtener usuario por Id
     const ObtenerUsuario = async () => { 
        try {
            const {data} = await axios.get(`${API_URL}/user/66ff6c787a81ade5258dc6e6`,{
                headers:{
                    Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJqdWFuIiwiYXBlbGxpZG8iOiJnb256YWxleiIsImZlY2hhX25hY2ltaWVudG8iOiJZWVlZLU1NLUREIiwiZW1haWwiOiJnb21lemZyZWRkeTg4NkBnbWFpbC5jb20iLCJ0ZWxlZm9ubyI6Iis1MDUgODI4MSA2NjMiLCJyb2wiOiJhZG1pbiIsImRpcmVjY2lvbiI6Imp1aWdhbHBhLCBjaG9udGFsZXMiLCJ0aXBvU3VzY3JpcGNpb24iOiJtZW5zdWFsIiwiZXhwIjoxNzI5NDIxNTI5fQ.kalntEwAY9v52KUm4dQpZ_6JDfc9X2SrdE3LQD6n0yg'
                }
            })
            setUser(data);
        } catch (error) {
            console.log(error);
        }
     }

     //peticion la primera ves que se cargue la vista
     useEffect( () => {
        const fetchData = async ()=> {
            await ObtenerUsuario(); 
            await ObtenerFinca();
            await ObtenerGanado();
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
