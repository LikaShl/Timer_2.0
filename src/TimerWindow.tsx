import {Button} from "./Button.tsx";


type TimerWindowPropsType = {
    count: number,
    maxValue: number,
    setMode: boolean,
    minValueError: boolean,
    maxValueError: boolean,
    startCount: (count: number, maxValue: number) => void;
    resetTimer: () => void;
}

export const TimerWindow = ({
                                count,
                                maxValue,
                                setMode,
                                minValueError,
                                maxValueError,
                                startCount,
                                resetTimer,
                            }: TimerWindowPropsType) => {


    const startCountHandler = () => {
        startCount(count, maxValue)
    }

    const resetTimerHandler = () => {
        resetTimer()
    }

    return (
        <div className="window-container">
            <div className="settings-block">
                {
                    setMode
                        ? minValueError || maxValueError
                            ? <span className="set-title red">incorrect value!</span>
                            : <span className="set-title">enter values end press "set"</span>
                        : <span className={count >= maxValue ? "counter-value red" : "counter-value"}>{count}</span>
                }
            </div>
            <div className="button-block">
                <Button title={"inc"} disabled={count >= maxValue} onClick={startCountHandler}/>
                <Button title={"reset"} onClick={resetTimerHandler}/>
            </div>
        </div>
    )
}


