import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";

type SettingsWindowPropsType = {
    minValue: number,
    maxValue: number,
    disabled: boolean,
    minValueError: boolean,
    maxValueError: boolean,
    changeMinValue: (newMinValue: number, maxValue: number) => void,
    changeMaxValue: (newMaxValue: number, minValue: number) => void,
    setNewValues: (minValue: number, maxValue: number) => void,
    onSetMode: () => void,
    offSetMode: () => void
}


export const SettingsWindow = ({
                                   minValue,
                                   maxValue,
                                   disabled,
                                   minValueError,
                                   maxValueError,
                                   changeMinValue,
                                   changeMaxValue,
                                   setNewValues,
                                   onSetMode,
                                   offSetMode
                               }: SettingsWindowPropsType) => {


    const setValuesOnclickHandler = (minValue: number, maxValue: number) => {
        setNewValues(minValue, maxValue)
        offSetMode()

    }
    const takeMinValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeMinValue(event.currentTarget.valueAsNumber, maxValue)
    }
    const takeMaxValueOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeMaxValue(event.currentTarget.valueAsNumber, minValue)
    }
    const onFocusHandler = () => {
        onSetMode()
    }

    return (
        <div className="window-container ">
            <div className="settings-block">
                <div>
                    <span className="input-title">min value</span>
                    <input type="number"
                           className={minValueError ? "error" : ""}
                           value={minValue}
                           onChange={takeMinValueOnChangeHandler}
                           onFocus={onFocusHandler}
                    />
                </div>
                <div>
                    <span className="input-title">max value</span>
                    <input type="number"
                           className={maxValueError ? "error" : ""}
                           value={maxValue}
                           onChange={takeMaxValueOnChangeHandler}
                           onFocus={onFocusHandler}
                    />
                </div>
            </div>
            <div className="button-block">
                <Button title={'set'} disabled={disabled}
                        onClick={() => setValuesOnclickHandler(minValue, maxValue)}/>
            </div>
        </div>
    )
}


