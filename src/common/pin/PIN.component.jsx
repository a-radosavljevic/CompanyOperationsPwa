import { useState } from "react";
import { MainContainer } from "../layout/Layout.style";
import { PinInputForm, SquareInput } from "./PIN.style";
import { useRef } from "react";
import http from "../../api/http";
import { ErrorMessage } from "../../utils/messager";

const PIN = ({ length, submitAction }) => {
    const [pin, setPin] = useState('');
    const inputRefs = useRef([]);

    const handleInputChange = (index, value) => {
        if (value.length > 1) {
            value = value.charAt(1);
        }

        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }

        const newPin = pin.split('');
        newPin[index] = value;
        setPin(newPin.join(''));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            let response = await http.get(`/user/check-pin?pin=${parseInt(pin)}`);
            if (response.status === 200) {
                submitAction();
            }
        }
        catch (err) {
            ErrorMessage("Uneti PIN kod nije validan", '');
        }
    }

    return <>
        <MainContainer>
            <PinInputForm onSubmit={handleSubmit}>
                {[...Array(length)].map((_, index) => (
                    <SquareInput
                        key={index}
                        type="password"
                        maxLength={1}
                        value={pin[index] || ''}
                        onChange={e => handleInputChange(index, e.target.value)}
                        ref={el => inputRefs.current[index] = el}
                    >
                    </SquareInput>
                ))
                }
            </PinInputForm>
        </MainContainer>
        <MainContainer>
            <div className="text-right">
                <button className="btn btn-primary block-btn" onClick={handleSubmit}>Potvrdi</button>
            </div>
        </MainContainer>
    </>
}

export default PIN;