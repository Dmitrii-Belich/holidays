import React, {useEffect, useState} from 'react';
import {Select, Tag} from 'antd';
import {Employee, Holidays} from "../../types/holidays";
import {DefaultValueType} from "rc-select/lib/interface/generator";

const {Option} = Select;

export default function EmployeeSelect({
                                           holidays,
                                           handleChange
                                       }: { holidays: Holidays, handleChange(value: number[]): void; }) {
    const [employees, setEmployees] = useState(holidays.getUniqueEmployees())

    useEffect(() => {
        setEmployees(holidays.getUniqueEmployees())
    }, [holidays])

    function tagRender({
                           label,
                           value,
                           closable,
                           onClose
                       }: {
                            label: React.ReactNode;
                            value: DefaultValueType;
                            closable: boolean;
                            onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
                        }) {
        const onPreventMouseDown = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
            event.preventDefault();
            event.stopPropagation();
        };


        const color = employees.find(({id}: Employee) => id === value) // @ts-ignore
            ? employees.find(({id}: Employee) => id === value).color
            : 'gray'
        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
            >
                {label}
            </Tag>
        );
    }

    return (
        <div>
            <Select
                tagRender={tagRender}
                mode="multiple"
                allowClear
                defaultValue={holidays.getUniqueEmployeesId()}
                style={{width: '100%'}}
                placeholder="Выберите сотрудника"
                onChange={handleChange}
            >
                {employees.map(({id, name, color}: Employee) => <Option
                    style={{background: color, color: 'white', marginBottom: '5px'}} key={id}
                    value={id}>{name}</Option>)}
            </Select>
        </div>
    );
}
