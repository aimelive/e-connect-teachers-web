import { FormEvent, useState } from "react";

const InputMessageBox = ({ onSend }: { onSend: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;
    onSend(message.trimEnd());
    setMessage("");
  };
  return (
    <form
      className="flex items-center w-full p-2 rounded-full bg-gray-100"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value.trimStart())}
        placeholder="Type your text message here"
        className="py-3 p-6 bg-gray-100 w-full outline-none"
      />
      <button
        className="bg-black  flex items-center font-[500]  text-white rounded-full px-4"
        type="submit"
      >
        Send&nbsp;&nbsp;
        <img
          src="/icons/send.svg"
          alt=""
          className="w-10 h-10 p-3  rounded-lg"
        />
      </button>
    </form>
  );
};

export default InputMessageBox;
