import React from 'react'

const getStyleName = btn => {
    const className = {
        '=' : 'equals equals-converter',
        '.' : 'opt-2',
        'c' : 'delete',
        '<-': 'removeLast'
    }
    return className[btn]
}

const ButtonConverter = ({ value, onButtonClick, onConvert, onClear, onRemoveLast, inputStr }) => {

    const handleButtonClick = (buttonValue) => {
        if (buttonValue === "=") {
            onConvert();
        } else if (buttonValue === "c") {
            onClear();
        } else if (buttonValue === "<-") {
            onRemoveLast();
        } else if (buttonValue === ".") {
            if (!inputStr.includes(".")) {
                const newStr = inputStr + "."
                onButtonClick(newStr, parseFloat(newStr))
            }
        } else {
            const newStr = inputStr + buttonValue
            const parsedValue = parseFloat(newStr)
            onButtonClick(newStr, parsedValue)
        }
    };

    return (
        <button className={`${getStyleName(value)} button`} onClick={() => handleButtonClick(value)}>
            {value}
        </button>
    )
}

export default ButtonConverter