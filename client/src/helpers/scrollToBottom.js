export const scrollToBottom = (messagesEndRef) => {
    // Uses a 'dummy' div at the bottom of the viewport to scroll to on page load, or when a new message is recieved
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};