const updateRoom = (hasPassword, password) => {
    fetch(window.location.search, {
        method: 'POST',
        body: JSON.stringify({
            hasPassword: hasPassword,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Room updated: ', data);
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
};

module.exports = { updateRoom };

