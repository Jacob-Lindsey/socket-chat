const fetchData = (setMessages, setRoomData) => {
    fetch(window.location.search).then(data => {
        data.json().then((data) => {
          setMessages(data.messages);
          setRoomData({
            creator: data.creator,
            hasPassword: data.hasPassword,
            password: data.password
          })
          
        });
      });
};

module.exports = { fetchData };

