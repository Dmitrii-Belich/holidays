import React, {useEffect, useState} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import EmployeeSelect from "./EmployeeSelect/EmployeeSelect";
import {Spin} from 'antd';
import HolidaysCalendar from "./HolidaysCalendar/HolidaysCalendar";
import {Holidays, HolidayItem} from "../types/holidays";

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [holidays, setHolidays] = useState(new Holidays([]))
    const [activeEmployees, setActiveEmployees] = useState<number[]>([])
    const [filteredHolidays, setFilteredHolidays] = useState<HolidayItem[]>([])

    const employeesChangesHandler = (value: number[]): void => {
        setActiveEmployees(value)
    }

    useEffect(() => {
        setFilteredHolidays(holidays.getFilteredHolidays(activeEmployees))
        setActiveEmployees(holidays.getUniqueEmployeesId())
    }, [activeEmployees, holidays])

    useEffect(() => {
        fetch('/holidays/holidays.json').then(res => res.json()).then(res => {
            setHolidays(new Holidays(res))
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="App">
            {isLoading ? <Spin/> :
                <>
                    <header>
                        <EmployeeSelect handleChange={employeesChangesHandler} holidays={holidays}/>
                    </header>
                    <main>
                        <HolidaysCalendar holidays={filteredHolidays}/>
                    </main>
                </>
            }
        </div>
    );
}

export default App;
