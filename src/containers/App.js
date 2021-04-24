import React, {useState, useEffect } from 'react';
import './App.css';
import Employees from '../components/Employees/Employees';
// import axios from 'axios';
import EmployeeDetails from '../components/Employees/EmployeeDetails/EmployeeDetails';
// Pobieranie danych z komponetu Reacta wymaga zastosaowania zaczepów useState, useEffect

const App = () => {
  // Zaczep useState służy do przechowywania odpowiedzi w danych 
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // w SelectedEmployee przechowywana jest informacja o jednym konkretnym pracowniku, dopóki żaden nie zostanie wybrany będzie wyświetlany 'null'

  // Zaczep useEffect służy do wykonania żądania
  useEffect(()=> {   
    // Na adres puszczam żądanie GET aby dostać listę z pracownikami, która będzie zapisywana w stacie App, która będzie przekazywana do komponentu <Employees/>, najpierw komponenty się wyrenderują a potem zostanie puszczone zapytanie HTTP, po otrzymaniu odpowiedzi asynchronicznie zaktualizuje się nasz stan
    fetch('http://dummy.restapiexample.com/api/v1/employees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
    .then(res => {
      res.json()
    })
    .then(res => {
      console.log(res);
      console.log(res.data.data);

      const employeeArray = res.data.data;
      // W stałek employees zapisuje to co nam zwraca ta metoda
      setEmployees({employees: employeeArray});
      // Teraz pracownicy z  początkowego stanu tablicy 'useState' employees -> zostają przypsiani do stałej employeeArray
    })
    .catch(error => console.log(error))
  })

  // Metoda która będzie się wywoływała po wciśnięciu jednego pracownika (wciśnięciu jednego przycisku), przekazywane jest do niej id bo endpoint wymaga id
  const showSelectedEmployeeHandler = (id) => {
    console.log("Employee nr: " + id);
    fetch("http://dummy.restapiexample.com/api/v1/employee/" + id , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
    .then(res => {
      res.json()
    })
    .then(res => {
      // po przekazaniu argumentu z żądania metoda then określa co ma się stać kiedy otrzyma odpowiedź, która po otrzymaniu przypiszemy do funkcji w stacie 
      setSelectedEmployee({
        selectedEmployee: res.data.data
        //Tutaj zaszeregowane będą dane dotyczą imienia, wieku itd.
      });
    });
  }

  const saveEmployeeHandler = () => {
    // obiekt JavaScriptowy (pracownik) do zapisu
    const employeeToSave = {
      "name": "Tomek123",
      "salary": "4500",
      "age": "25"
    }
    // Żądanie POST
    fetch("http://dummy.restapiexample.com/api/v1/create",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: {"name":"test","salary":"123","age":"23"},//Dane które będziemy zapisywać,
      // Jak powinno wyglądać ciało obiektu JavaScriptowego
    }
      ).then(response => {
      console.log(response);
    });
  }

  const deleteEmployeeHandler = () => {
    // Będzie wysyłało zapytanie http z id na sztywno wpisanym w kodzie
    const id = 2; // Stała id obiektu do usunięcia
    fetch("http://dummy.restapiexample.com/api/v1/delete/" + id, {
      method: "DELETE",
    })  
    .then(r => r.json())
    .then(
      res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }
  // Sprawdzenie aktualnej wartości selectedEmployee, jeżeli będzie różna od zera , to będzie tworzony komponent EmplyeeDetails
  if(selectedEmployee !== null){ 
    return (
    selectedEmployee = <EmployeeDetails 
    name={selectedEmployee.employee_name}
    salary={selectedEmployee.employee_salary}
    age={selectedEmployee.employee_age}
    /> )
  }
  return (

// W <Employees/> odwołuje się do stat-a employess
// Dopóki żadne pracownik nie zostanie wybrany będzie wyświetlany null ze stat-a
      // "saveEmployeeHandler" Przycisk który na sztywno wpisuje dane pracownika w kod
      <div className='App'> 
        {selectedEmployee}
        <h1>Employees</h1>
        <Employees employees={employees} showSelectedEmployee={showSelectedEmployeeHandler}/>
        <button onClick={saveEmployeeHandler} className="UpdateButton">Save Employee</button>
        <button onClick={deleteEmployeeHandler} className="UpdateButton">Delete Employee</button>
      </div>
        // W propsach przekazywana jest metoda showSelectedEmployeeHandler nazwa propsa to: 'showSelectedEmployee' 
        // metoda showSelectedEmployeeHandler przekazywana jest do komponentu employees
    );
  }

export default App;