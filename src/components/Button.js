import React, { useContext, useState, useEffect } from 'react'
import { CalcContext } from '../context/CalcContext.js'
import { evaluate, im } from 'mathjs';

const getStyleName = btn => {
    const className = {
        '$' : 'unvisible',
        'H' : 'history',
        '<-' : 'removeLastCalc',
        '=' : 'equals',
        '*' : 'opt',
        '-' : 'opt',
        '+' : 'opt',
        '/' : 'opt',
        '%' : 'opt-2',
        '+-' : 'opt-2',
        '.' : 'opt-2',
        'C' : 'delete'
    }
    return className[btn]
}

const Button = ({ value }) => {

    const { calc, setCalc } = useContext(CalcContext)

    const [history, setHistory] = useState([])
    const [expressionResultToSave, setExpressionResultToSave] = useState(null)

    const handleBtnClick = () => {

        const actions = {
            'H': toggleHistory,
            '<-': removeLastSign,
            '.': commaClick,
            'C': resetClick,
            '/': signClick,
            '*': signClick,
            '-': signClick,
            '+': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+-': invertClick
        }

        if (actions[value]) {
            return actions[value]()
        } else {
            return handleClickButton()
        }
    }

    const toggleHistory = () => {
        console.log(history)
    }

    const removeLastSign = () => {
        setCalc(() => {
            const {expression} = calc

            if(expression) {
                const newExpression = expression.slice(0, -1)
                return {
                    ...calc,
                    expression: newExpression
                }
            }

            return calc
        })
    }

    const commaClick = () => {
        setCalc(() => {
            const lastChar = calc.expression.slice(-1)
    
            if (calc.num === 0 || ['+', '-', '*', '/'].includes(lastChar)) {
                return {
                    ...calc,
                    num: "0.", 
                    expression: calc.expression + "0.",  
                    isAfterResult: false  
                }
            }
            if (calc.num.toString().includes('.')) {
                return calc
            }

            return {
                ...calc,
                num: calc.num.toString()+ '.' ,  
                expression: calc.expression + '.',  
                isAfterResult: false  
            }
    
        })
    }

    const resetClick = () => {
        setCalc({
            sign: '',
            num: 0,
            res: 0,
            expression: ''
        })
    }

    const signClick = () => {
        setCalc(() => {
            const lastChar = calc.expression.slice(-1)
            if(lastChar === '.') {
                return calc
            }

            if(!calc.res && !calc.num) {
                return calc
            }
           
            if (calc.isAfterResult) {
                return {
                    ...calc,
                    sign: value,
                    num: 0,
                    expression: calc.expression + value,
                    isAfterResult: false  
                }
            } else {
                if (calc.sign && calc.num === 0) {
                    return {
                        ...calc,
                        sign: value,
                        expression: replaceLastSign(calc.expression, value)
                    }
                } else {
                    return {
                        ...calc,
                        sign: value,
                        res: !calc.res && calc.num ? calc.num : calc.res,
                        num: 0,
                        expression: calc.expression + value
                    }
                }
            }
        })
    }

    const percentClick = () => {
        setCalc(() => {
            const lastChar = calc.expression.slice(-1);
            if(lastChar === '%') { return calc }

            const calculatePercent = (value) => value / 100

            if (calc.num) {
                const newNum = calculatePercent(calc.num)

                let num = calc.sign ? (calc.res * calc.num) / 100 : newNum
                let res = calc.sign ? calc.res : newNum    
                
                return {
                    ...calc,
                    num,
                    res: res,  
                    expression: calc.expression + "%",
                    isResult: true,
                    isAfterResult: true
                }
            }
            return calc
        })
    }

    const invertClick = () => {
        setCalc(() => {
            if (calc.res !== 0 && !calc.sign) {
                return {
                    ...calc,
                    res: calc.res * -1,
                    expression: calc.res.toString().includes("-") ? calc.res.toString().slice(1) : "-" + calc.res.toString()
                }
            }

            if (calc.num !== 0) {
                return {
                    ...calc,
                    num: calc.num * -1,
                    expression: calc.expression.slice(0, -calc.num.toString().length) +  (calc.num * -1).toString()
                }
            }

            return calc
        })
    }

    const equalsClick = () => {
        setCalc((prevCalc) => {
            const lastChar = prevCalc.expression.slice(-1)  

            // Проверка: если выражение, знак и результат не изменились, игнорируем повторное нажатие на "="\
            // Проверка: если нет операции (знака), игнорируем нажатие на "="
            // Проверка: если последний символ — точка и нет знаков операций, игнорируем нажатие на равно
            if ((prevCalc.isAfterResult && prevCalc.num === prevCalc.res && prevCalc.sign === "" && lastChar !== '%') 
                || (!prevCalc.sign && lastChar !== '%')
                || (lastChar === '.'  && !/[+\-*/]/.test(prevCalc.expression))
                || /[+\-*/]/.test(lastChar)) {
                    return prevCalc  
            }

            console.log(prevCalc.expression)
            
            if (prevCalc.res && prevCalc.num) {
             

                const result = calculateExpression(prevCalc.expression)

                setExpressionResultToSave([prevCalc.expression, result])

                console.log(result)

                return {
                    ...prevCalc,
                    res: result,  
                    sign: "",  
                    num: result,  
                    expression: result.toString(),  
                    isAfterResult: true,  
                    isResult: true  
                }
            }
    
            return prevCalc
        })
    }

    useEffect(() => {
        if (expressionResultToSave) {
            setHistory((prevHistory) => {
                const [expression, result] = expressionResultToSave
                if (prevHistory.length === 0 || prevHistory[prevHistory.length - 1][0] !== expression) {
                    return [...prevHistory, expressionResultToSave]
                }
                return prevHistory
            });

            setExpressionResultToSave(null)
        }
    }, [expressionResultToSave])

    const calculateExpression = (expression) => {
        expression = expression.trim();
    
        expression = expression.replace(/([0-9]+(?:\.[0-9]+)?)%/g, (match, number) => {
            return `(${number} / 100)`
        })
    
        const validCharacters = /^[0-9+\-*/.%() ]+$/;
        if (!validCharacters.test(expression)) {
            throw new Error("Invalid characters in expression");
        }
    
        try {
            const result = evaluate(expression);
            return result
        } catch (e) {
            console.error("Error evaluating expression:", e.message)
            return "Error"
        }
    }

    const replaceLastSign = (expression, newSign) => {
        const regex = /[+\-*/]$/

        if(regex.test(expression)) {
            return expression.slice(0, -1) + newSign
        }

        return expression + newSign
    }

    const handleClickButton = () => {
        const numberString = value.toString()
    
        setCalc((prevCalc) => {
            const lastChar = prevCalc.expression.slice(-1)
            
            if (lastChar === '%') {
                return {
                    ...prevCalc,
                    sign: '*', 
                    num: Number(numberString),  
                    expression: `${prevCalc.expression} * ${numberString}`,  
                    percentPressed: false  
                }
            }

            if (prevCalc.num === 0 && numberString === '0') return prevCalc;

            const numberValue =
                prevCalc.num === 0 && numberString !== '0'
                    ? Number(numberString)
                    : Number(prevCalc.num.toString() + numberString);

            return {
                ...prevCalc,
                num: numberValue,
                expression:
                    prevCalc.expression === '0'
                        ? numberString
                        : prevCalc.expression + numberString,
            }         
        })
    }
     

    return (
        <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
    )
}

export default Button