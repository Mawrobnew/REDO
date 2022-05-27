import React, {cloneElement, useState} from "react";
import recursiveMap from "../../utils/RecursiveInyection";
import M_Fail from "../M_Fail";
import M_Success from "../M_Success";
import {Request} from "../../utils/WebRequestMiddleware";
import Select from "./Select";

//Component than handles the request to the specified routes, handles the changes on the inputs and select,
// when the button is pressed manage the errors and validations
export default function ValidationModal({children, Button, initialState = {}, route, method='POST'}){

    const [modalInfo, setModalInfo] = useState(initialState)
    const [isOpen, setIsOpen] = useState(false)
    const [validationErrors, setValidationErrors] = useState({isError: false, errors:[]})

    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })

    //Returning the costum button

    if (!isOpen) return (
        <div>
            <M_Success open={petitionState.successful} onClose={()=> setPetitionState({...petitionState, successful: false})}/>
            {
                React.cloneElement(Button, {onClick: ()=> setIsOpen(true)})
            }
        </div>
    )
    // updates the state on every change of the inputs or the selects
    const handleInputChange = (event) => {
        const {name,value} = event.target
        console.log(modalInfo)
        setModalInfo({
            ...modalInfo,
            [name]:value
        })
    }

    const returnToDefault = () =>{
        setIsOpen(false)
        setPetitionState({
            ...petitionState,
            successful: true
        })
        window.location.reload();
        setValidationErrors({isError: false, errors: []})
    }

    const handleErrorsFromAPI = (errors) =>{
        //filtering the errors
        errors = errors.map( error =>{
            return error.msg
        })
        setValidationErrors({
            isError: true, errors
        })
    }

    const handleSubmit = async () => {
        const [result, code] = await Request(method, route, modalInfo)
        console.log(result)
        if(code === 200) {
            returnToDefault()
            return;
        }
        if(code=== 422){
            handleErrorsFromAPI(result.errors)
            return;
        }
        setPetitionState({
            ...petitionState,
            failed: true
        });
    }

    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                {
                    recursiveMap(children,(child)=>{
                        //inserting code to modified this state on the changes on every input or select change
                        if(child.type ==='input' || child.type === Select){
                            const {name} = child.props;
                            //if the state is already set the modal will load with the values
                            if(modalInfo.hasOwnProperty(name))
                                return React.cloneElement(child, {
                                    onChange: handleInputChange,
                                    value: modalInfo[name]
                                })
                            // Create a new instance of the object
                            return React.cloneElement(child, {
                                onChange: handleInputChange,
                            })
                        }

                        //Inserting the code to close this modal
                        if(child.props.name === "formButton")
                            return React.cloneElement(child, {
                                onClick: handleSubmit
                            })

                        //Inserting the code to show the validation throwed by the api
                        if(child.props.name === "alert")
                            return React.cloneElement(child, {
                                show: validationErrors.isError ,
                                children: validationErrors.errors[0]
                            })

                        return child
                    })
                }
            </div>
            <M_Fail open={petitionState.failed} onClose={()=> setPetitionState({...petitionState, failed: false})}/>
        </div>
    )
}