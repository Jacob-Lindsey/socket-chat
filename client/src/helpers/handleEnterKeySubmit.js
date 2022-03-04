import { handleSubmit } from "./handleSubmit";

export const handleEnterKeySubmit = (event, socket, message, setMessage) => {
    if (event.key === 'Enter') {
        handleSubmit(event, socket, message, setMessage);
    }
  };