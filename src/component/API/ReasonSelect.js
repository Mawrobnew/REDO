import {useEffect, useState} from "react";
import {Request} from "../../utils/WebRequestMiddleware";


//Receives the type of reason that wants to be fetched
export default function ReasonSelect({onChange, id, name}) {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const asyncFetch = async () => {
            const [result, code] = await Request('POST', '/reasons', {id})
            if (code === 200) setOptions(result);
        }
        asyncFetch()
    }, [])

    const handleChange = (e) => {
        onChange(e)
    }

    return (
        <select name={name} onChange={handleChange}>
            <option defaultValue>Seleccionar</option>
            {options.map((option) => (
                //Since the api is not standarized the this select tries with matching the attribute that is on the json response
                <option
                    value={option.Id}>{option.Motivo}</option>
            ))}
        </select>
    )
}
