"use client";
import { FaLocationArrow } from "react-icons/fa6";
import Message from "./message";
import { type MessageProps } from "./message";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { type ISearch } from "@/models/search.model";
import { set } from "mongoose";

interface InteractiveSearchProps {
  search: ISearch | null;
  setSearches: React.Dispatch<React.SetStateAction<ISearch[]>>;
}

export default function InteractiveSearch({
  search,
  setSearches,
}: InteractiveSearchProps) {
  const searchMutation = api.search.addMessage.useMutation();
  const [disabled, setDisabled] = useState(true);
  const messagesHistory = search ? search.messages : [];
  const [messages, setMessages] = useState<MessageProps[]>(
    messagesHistory ?? [],
  );
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    if (search === null) return;
    setMessages(search.messages);
    if (search === null || search.result.length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [search]);
  const onMessageSubmit = (content: string) => {
    if (disabled) return;
    setMessages([...messages, { type: "user", content }]);
    setInput("");
    if (search?._id === undefined) return;
    searchMutation.mutate({
      searchId: search._id,
      type: "user",
      content: content,
    });
    setSearches((prevSearches) => {
      return prevSearches.map((prevSearch) => {
        if (prevSearch._id === search._id) {
          return {
            ...prevSearch,
            messages: [...prevSearch.messages, { type: "user", content }],
          };
        }
        return prevSearch;
      });
    });
    //send to microservice
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
          disabled={disabled}
        />
        <FaLocationArrow
          className={
            disabled
              ? "text-primaryLight absolute right-4 top-[10px] rotate-45 cursor-not-allowed text-3xl"
              : "absolute right-4 top-[10px] rotate-45 cursor-pointer text-3xl text-primary"
          }
          onClick={() => onMessageSubmit(input)}
        />
      </div>
      {search === null ? (
        <div className="mt-40 flex flex-col gap-2 px-[15%] pt-8">
          <h1 className="text-center text-4xl font-bold text-primary">
            Add a search to start
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-[15%] pt-8">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </div>
      )}
    </div>
  );
}
