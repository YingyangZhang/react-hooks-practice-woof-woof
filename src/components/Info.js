import React from "react";

function Info({pup, handleUpdate, handleDisplay}) {
    function handleClick() {
        fetch(`http://localhost:3001/pups/${pup.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(
                {
                    ...pup,
                    isGoodDog: !pup.isGoodDog,
                }
            )
        })
        .then(r => r.json())
        .then(data => {
            handleUpdate(data);
            handleDisplay(data);
        })
    }

    return (
        <div>
            <img src={pup.image} alt='dog'/>
            <h2>{pup.name}</h2>
            <button onClick={handleClick}>{pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
        </div>
    )
}

export default Info;