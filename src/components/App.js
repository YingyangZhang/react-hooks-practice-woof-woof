import React, { useEffect, useState } from "react";
import Info from "./Info";

function App() {
  const [pups, setPups] = useState([]);
  const [selectedPup, setSelectedPup] = useState(null);
  const [filter, setFilter] = useState(false);
  
  function handleClick(pup) {
    setSelectedPup(pup)
  }

  function handleFilter() {
    setFilter(filter => !filter)
    setSelectedPup()
  }

  const filterPups = pups.filter(pup => {
    if(filter){
      return pup.isGoodDog === true;
    } else{
      return true;
    }
  })

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(r => r.json())
    .then(data => {
      console.log(data);
      setPups(data);
    })
  },[])

  function handleUpdate(pup) {
    setSelectedPup(pup)
  }

  function handleDisplay(obj) {
    const newArr = pups.map(pup => {
      if(pup.id === obj.id){
        return obj
      } else{
        return pup
      }
    })
    setPups(newArr)
  } 

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>Filter good dogs: {filter ? 'ON' : 'OFF'}</button>
      </div>
      <div id="dog-bar">
        {filterPups.map(pup => {
          return <span key={pup.id} onClick={() => handleClick(pup)}>{pup.name}</span>
        })}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {selectedPup ? <Info pup={selectedPup} handleUpdate={handleUpdate} handleDisplay={handleDisplay} /> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
