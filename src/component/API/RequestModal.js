import {useState, cloneElement} from "react";
import recursiveMap from "../../utils/RecursiveInyection";
import M_Fail from "../M_Fail";
import M_Success from "../M_Success";
import {Request} from "../../utils/WebRequestMiddleware";
import MessageModal from "./MessageModal";

//Component than handles the request to the specified routes, handles the changes on the inputs and select,
// when the button is pressed manage the errors and validations
export default function RequestModal({children, Button, initialState = {}, route, method = 'POST'}) {

    const [modalInfo, setModalInfo] = useState(initialState)
    const [isOpen, setIsOpen] = useState(false)

    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false,
        message: ''
    })

    //Returning the costum button

    if (!isOpen) return (
        <div>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
            {
                cloneElement(Button, {onClick: () => setIsOpen(true)})
            }
        </div>
    )

    const returnToDefault = () => {
        setIsOpen(false)
        setPetitionState({
            ...petitionState,
            successful: true
        })
    }

    const handleSubmit = async () => {
        const [result, code] = await Request(method, route, modalInfo)
        const {done, message} = result[0]
        if (done === 1) {
            returnToDefault()
            return;
        }
        setPetitionState({
            ...petitionState,
            failed: true,
            message
        });
    }

    return (
        <div>
            <div className='wrapper' onClick={() => {
                setIsOpen(false)
            }}/>
            <div className='window'>
                <button className='closeBtn' onClick={() => {
                    setIsOpen(false)
                }}>X
                </button>
                {
                    recursiveMap(children, (child) => {
                        //Inserting the code to close this modal
                        if (child.props.name === "confirmation")
                            return cloneElement(child, {
                                onClick: handleSubmit
                            })
                        if (child.props.name === "cancelation")
                            return cloneElement(child, {
                                onClick: () => setIsOpen(false)
                            })

                        return child
                    })
                }
            </div>
            <MessageModal open={petitionState.failed}
                          onClose={() => setPetitionState({...petitionState, failed: false})}
                          message={petitionState.message}/>
        </div>
    )
}
