import {Calendar, Tooltip} from 'antd';
import './index.css';
import {HolidayItem} from '../../types/holidays';

const locale = {
    lang: {
        locale: 'ru_RU',
        /** Display month before year in date panel header */
        yearFormat: 'YYYY',
        today: 'Today',
        now: 'Now',
        backToToday: 'Back to today',
        ok: 'Ok',
        timeSelect: 'Select time',
        dateSelect: 'Select date',
        clear: 'Clear',
        month: 'Месяц',
        year: 'Год',
        previousMonth: 'Previous month (PageUp)',
        nextMonth: 'Next month (PageDown)',
        monthSelect: 'Choose a month',
        yearSelect: 'Choose a year',
        decadeSelect: 'Choose a decade',
        dayFormat: 'D',
        dateFormat: 'M/D/YYYY',
        dateTimeFormat: 'M/D/YYYY HH:mm:ss',
        previousYear: 'Last year (Control + left)',
        nextYear: 'Next year (Control + right)',
        previousDecade: 'Last decade',
        nextDecade: 'Next decade',
        previousCentury: 'Last century',
        nextCentury: 'Next century',
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        placeholder: 'Select date'
    },
    timePickerLocale: {
        placeholder: 'Select time'
    }
}

export default function HolidaysCalendar({holidays}: { holidays: HolidayItem[] }) {
    function reducer(emp: HolidayItem[], item: HolidayItem) {
        const existed = emp.find((e: HolidayItem) => e.employee_info.id === item.employee_info.id)
        if (!existed) {
            emp.push(item)
        } else if (!existed.holiday.name.includes(item.holiday.name)) {
            existed.holiday.name += `, ${item.holiday.name}`
        }
        return emp
    }

    function getListData(value: string) {
        const currentDate = new Date(value)

        return holidays.filter((item: HolidayItem) => {
            const startDate = new Date(item.start_at)
            const endDate = new Date(item.end_at)
            return currentDate >= startDate && currentDate <= endDate
        })
    }

    function dateCellRender(value: {
        format(dddd: string): string;
    }) {
        const listData = getListData(value.format('YYYY-MM-DD'));
        return (
            <div className="holidays">
                {listData.map((item: HolidayItem) => {
                    return <Tooltip key={item.uuid} title={item.holiday.name}>
                        <div className="month-cell"
                             style={{background: item.employee_info.color}}>{item.employee_info.name}</div>
                    </Tooltip>
                })}
            </div>
        );
    }

    function getMonthData(value: string) {
        const currentDate = new Date(value)
        const currentMonth = `${currentDate.getFullYear()}.${currentDate.getMonth()}`

        return holidays.filter((item: HolidayItem) => {
            const startDate = new Date(item.start_at)
            const startMonth = `${startDate.getFullYear()}.${startDate.getMonth()}`
            const endDate = new Date(item.end_at)
            const endMonth = `${endDate.getFullYear()}.${endDate.getMonth()}`
            return currentMonth === startMonth || currentMonth === endMonth
        }).reduce(reducer, [])
    }

    function monthCellRender(value: { format(dddd: string): string }) {
        const listData = getMonthData(value.format('YYYY-MM-DD'));
        return (<div>
            {listData.map((item: HolidayItem) =>
                <Tooltip key={item.uuid} title={item.holiday.name}>
                    <div className="month-cell" key={item.uuid}
                         style={{background: item.employee_info.color}}>{item.employee_info.name}</div>
                </Tooltip>)}
        </div>)
    }

    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} locale={locale}/>
    )
}

