import React from 'react';
import Wrapper from '../components/Wrapper';
import Screen from '../components/Screen';
import ButtonBox from '../components/ButtonBox';
import Button from '../components/Button';
import CalcProvider from '../context/CalcContext';

const btnValues = [
    ["H", "$", "$", "<-"],
    ["C", "+-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
]

const Calculator = () => {
    return (
        <CalcProvider>
            <Wrapper>
                <Screen/>
                <ButtonBox>
                    {btnValues.slice(0).flat().map((btn, i) => (
                        <Button
                            value={btn}
                            key={i}
                        />
                    ))}
                </ButtonBox>
            </Wrapper>
        </CalcProvider>
    )
}

export default Calculator