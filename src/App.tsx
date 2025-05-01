import './App.css'
import {TimerWindow} from "./TimerWindow.tsx";
import {SettingsWindow} from "./SettingsWindow.tsx";
import {useEffect, useState} from "react";
import useLocalStorage from 'use-local-storage'
import {Button} from "./Button.tsx";


function App() {

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
    const [minValue, setMinValue] = useLocalStorage<number>('min value', 0);
    const [maxValue, setMaxValue] = useLocalStorage<number>('max value', 5);
    const [count, setCount] = useState<number>(minValue);
    // const [endCount, setEndCount] = useState(maxValue);
    const [disabled, setDisabled] = useState(true);
    const [setMode, setSetMode] = useState<boolean>(false)
    const [minValueError, setMinValueError] = useState<boolean>(false)
    const [maxValueError, setMaxValueError] = useState<boolean>(false)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(()=> localStorage.setItem('min value', JSON.stringify(minValue)), [minValue]);
    useEffect(()=> localStorage.setItem('max value', JSON.stringify(maxValue)), [maxValue]);

    useEffect( ()=> {
        const minValueAsString = localStorage.getItem('min value')
        if (minValueAsString) {
            const newMinValue = JSON.parse(minValueAsString)
            setMinValue(newMinValue)
        }
    } ,[])

    useEffect( ()=> {
        const maxValueAsString = localStorage.getItem('max value')
        if (maxValueAsString) {
            const newMaxValue = JSON.parse(maxValueAsString)
            setMaxValue(newMaxValue)
        }
    } ,[])

    const startCount = (count: number, maxValue: number) => {
        if (count < maxValue) {
            setCount(count + 1)
        }
    }

    const resetTimer = () => {
        setCount(minValue)

    }

    const onSetMode = () => {
        setSetMode(true)
        setDisabled(false)
    }
    const offSetMode = () => {
        setSetMode(false)
        setDisabled(true)
    }
    const setNewValues = (minValue: number, maxValue: number) => {
        setCount(minValue)
        setMaxValue(maxValue)
    }
    const changeMinValue = (newMinValue: number, maxValue: number) => {
        if (newMinValue < 0 || newMinValue >= maxValue) {
            setMinValueError(true)
            setDisabled(true)
        } else {
            setMinValueError(false)
            setDisabled(false)
        }
        setMinValue(newMinValue)
    }
    const changeMaxValue = (newMaxValue: number, minValue: number) => {
        if (newMaxValue < 0 || newMaxValue <= minValue) {
            setMaxValueError(true)
            setDisabled(true)
        } else {
            setMaxValueError(false)
            setDisabled(false)
        }
        setMaxValue(newMaxValue)
    }


    return (
        <div className="app" >
            <h1>Timer 2.0</h1>
            <div className="container">
                <SettingsWindow
                    minValue={minValue}
                    maxValue={maxValue}
                    disabled={disabled}
                    minValueError={minValueError}
                    maxValueError={maxValueError}
                    changeMinValue={changeMinValue}
                    changeMaxValue={changeMaxValue}
                    setNewValues={setNewValues}
                    onSetMode={onSetMode}
                    offSetMode={offSetMode}
                />
                <TimerWindow
                    count={count}
                    maxValue={maxValue}
                    setMode={setMode}
                    minValueError={minValueError}
                    maxValueError={maxValueError}
                    startCount={startCount}
                    resetTimer={resetTimer}/>
            </div>
            <Button title={'light/dark theme'} className={'switch-btn'} onClick={()=>{setTheme(theme === 'light'? 'dark' : 'light')}}/>
        </div>
    )
}

export default App
