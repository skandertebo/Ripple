"use client";
import { FaLocationArrow } from "react-icons/fa6";
import Message from "./message";
import { type MessageProps } from "./message";
import { useState } from "react";

export default function InteractiveSearch() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<string>("You");
  const onMessageSubmit = (message: string) => {
    setMessages([...messages, { type: "user", message, user }]);
    setInput("");
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <div className="fixed bottom-12 left-[35%] mx-auto w-[55%]">
        <input
          type="text"
          title="description"
          placeholder="Search for ..."
          className="h-12 w-full rounded-md border-2 border-gray-300 px-4 py-2 text-xl font-semibold focus:border-primary"
          value={input}
          onChange={onInputChange}
        />
        <FaLocationArrow
          className="absolute right-4 top-[10px] rotate-45 animate-pulse cursor-pointer text-3xl text-primary"
          onClick={() => onMessageSubmit(input)}
        />
      </div>
      <div className="flex flex-col gap-2 px-[15%] pt-8">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>
    </div>
  );
}
