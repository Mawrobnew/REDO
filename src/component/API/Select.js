import {useEffect, useState} from "react";
import {Request} from "../../utils/WebRequestMiddleware";


export default function Select({onChange, name, value, route, method = "GET"}){
    const [options, setOptions] = useState([])

    useEffect(() => {
        const asyncFetch = async () => {
            const [result, code] = await Request(method, route)
            if(code === 200) setOptions(result);
        }
        asyncFetch()
    }, [])

    const handleChange = (e) =>{
        onChange(e)
    }

    return(
        <select name={name} onChange={handleChange} value={value}>
            <option defaultValue>Seleccionar</option>
            {options.map((option)=>(
                //Since the api is not standarized the this select tries with matching the attribute that is on the json response
                <option
                    value={option.Id}>{option.Rol || option.Sucursal || option.Municipio || option.Frecuencia || option.Comunidad}</option>
            ))}
        </select>
    )
}