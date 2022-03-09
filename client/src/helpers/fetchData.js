const fetchData = (setMessages, setPersistent) => {
    fetch(window.location.search).then(data => {
        data.json().then((data) => {
          setMessages(data.messages);
          setPersistent(data.persistent);
        });
      });
};

module.exports = { fetchData };

