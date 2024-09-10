import ButtonBox from '../components/ButtonBox';
import Wrapper from '../components/Wrapper';
import React, { useState  } from 'react'
import { lengthConversionFactors } from '../data/LengthConversionFactors'; 
import { temperatureConversionFactors } from '../data/TemperatureConversionFactors';
import { timeConversionFactors } from '../data/TimeConversionFactors';
import ButtonConverter from '../components/ButtonConverter';

const Converter = () => {
    const [inputValue, setInputValue] = useState("")
    const [inputStr, setInputStr] = useState("")
    const [fromUnit, setFromUnit] = useState("cm")
    const [toUnit, setToUnit] = useState("inch")
    const [result, setResult] = useState("")
    const [mode, setMode] = useState("length");

    const btnValues = [
        ["c", "<-"],
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        [".", "0", "="]
    ]

    const getUnits = () => {
        if (mode === "length") {
            return Object.keys(lengthConversionFactors)
        } else if (mode === "temperature") {
            return Object.keys(temperatureConversionFactors)
        } else if (mode === "time") {
            return Object.keys(timeConversionFactors)
        }
    }

    const convert = () => {
        const conversionFactors = 
            mode === "temperature" ? temperatureConversionFactors 
            : mode === "time" ? timeConversionFactors 
            : lengthConversionFactors
    
        const conversionFunction = conversionFactors[fromUnit][toUnit]
        
        if (typeof conversionFunction === "function") {
            const convertedResult = conversionFunction(inputValue);
            setResult(!isNaN(convertedResult) ? convertedResult.toFixed(4) : "")
        } else {
            const convertedResult = inputValue * conversionFunction;
            setResult(!isNaN(convertedResult) ? convertedResult.toFixed(4) : "")
        }
    }

    const handleInputUpdate = (newInputStr, parsedValue) => {
        setInputStr(newInputStr)
        setInputValue(parsedValue)
    }

    const clearInput = () => {
        setInputStr("")
        setInputValue("")
        setResult("")
    }

    const removeLastChar = () => {
        const newStr = inputStr.slice(0, -1)
        setInputStr(newStr)
        const parsedValue = parseFloat(newStr)
        if (!isNaN(parsedValue)) {
            setInputValue(parsedValue)
        } else {
            setInputValue("")
        }
    }

    return (
        <Wrapper>
            <div className='container_options'>
                <button 
                    id='length' 
                    className={mode === "length" ? "selected" : ""} 
                    onClick={() => { 
                        setMode("length"); 
                        setFromUnit("cm"); 
                        setToUnit("inch"); 
                        clearInput(); 
                }}>
                    Length
                </button>
                <button 
                    id='temperature' 
                    className={mode === "temperature" ? "selected" : ""} 
                    onClick={() => { 
                        setMode("temperature"); 
                        setFromUnit("Celsius"); 
                        setToUnit("Fahrenheit"); 
                        clearInput(); 
                }}>
                    Temperature
                </button>
                <button 
                    id='time'
                    className={mode === "time" ? "selected" : ""} 
                    onClick={() => { 
                        setMode("time"); 
                        setFromUnit("Minutes"); 
                        setToUnit("Hours"); 
                        clearInput(); 
                }}>
                    Time
                </button>
            </div>
            
            <div className='container_unit'>
                <input
                    type="text"
                    value={inputStr}
                    readOnly
                    placeholder="Enter value"
                    className="input-field"
                />
                <select
                    className="unit-selectors"
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                >
                    {getUnits().map((unit) => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>

            <div className='container_unit'>
                <input
                    type="text"
                    value={String(result)}
                    readOnly
                    className="input-field"
                />
                <select
                    className="unit-selectors"
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                >
                    {Object.keys(
                        mode === "length" 
                        ? lengthConversionFactors[fromUnit] 
                        : mode === "temperature" 
                        ? temperatureConversionFactors[fromUnit] 
                        : timeConversionFactors[fromUnit]
                    ).map((unit) => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>

            <ButtonBox className="buttonBoxConverter">
                {btnValues.flat().map((btn, i) => 
                    <ButtonConverter
                        value ={btn}
                        key={i}
                        onButtonClick={handleInputUpdate}
                        onConvert={convert}
                        onClear={clearInput}
                        onRemoveLast={removeLastChar}
                        inputStr={inputStr}
                    />
                )}
            </ButtonBox>
        </Wrapper>
    )
}

export default Converter