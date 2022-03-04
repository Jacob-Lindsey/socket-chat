const fetchData = (setMessages) => {
    fetch(window.location.search).then(data => {
        data.json().then((data) => {
          setMessages(data.messages);
        });
      });
};

module.exports = { fetchData };

