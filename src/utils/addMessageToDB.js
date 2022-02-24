const addMessageToDB = (room, data) => {
    fetch(`http://localhost:4000/${room}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
    .then(res => res.json())
    .catch((error) => {
        console.error('Error:', error);
    });
};

export default addMessageToDB;