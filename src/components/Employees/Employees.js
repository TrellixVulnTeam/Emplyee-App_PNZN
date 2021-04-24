import React from 'react';
import styles from './Employees.module.css';
import Employee from './Employee/Employee';

const Employees = ({showSelectedEmployee}) => {

        // Tu tworzeni są pracownicy, przerabiani są pracownicy z tablicy na obiekty javascript-owi
        // console.log(employees);
        const employees = employees.map((employee, index) => {
            //zwracany komponent Employee
            return (<Employee key={employee.id} name={employee.employee_name} showSelectedEmployee={showSelectedEmployee} id={employee.id}/>);
            // do pojedyńczego  komponentu przekazywana dalej jest metoda showEmployeeHandler a nazwa propsa to: 'showSelectedEmployee'
        });

        //Tu znajdują się pracownicy     
        return (<div className={styles.Employees}> 
            {employees} 
        </div>)
    }

export default Employees;