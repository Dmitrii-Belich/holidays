export interface Employee {
    "id": number;
    "name": string;
    "color": string;
}

export interface HolidayItem {
    "uuid": string;
    "start_at": string;
    "end_at": string;
    "duration": number;
    "employee_info": Employee,
    "holiday": {
        "id": number;
        "name": string;
    }
}

export class Holidays {
    holidays: HolidayItem[]

    constructor(items: HolidayItem[]) {
        this.holidays = items
    }

    getFilteredHolidays(activeEmployees: number[]): HolidayItem[] {
        return this.holidays.filter(({employee_info}) => activeEmployees.includes(employee_info.id))
    }

    getUniqueEmployees() {
        return this.holidays.reduce((emp: Employee[], item: HolidayItem) => {
            if (!emp.find((e: Employee) => e.id === item.employee_info.id)) {
                emp.push(item.employee_info)
            }
            return emp
        }, [])
    }

    getUniqueEmployeesId() {
        return this.getUniqueEmployees().map((item: Employee ) => item.id)
    }
}
