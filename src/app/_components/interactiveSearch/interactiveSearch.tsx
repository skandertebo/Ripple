"use client";
import { FaLocationArrow } from "react-icons/fa6";
import Message from "./message";
import { type MessageProps } from "./message";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { type ISearch } from "@/models/search.model";
import { type IInfluencer } from "@/models/influencer.model";
import SuggestedCard from "../influencer/suggested-card";

interface InteractiveSearchProps {
  search: ISearch | null;
  setSearches: React.Dispatch<React.SetStateAction<ISearch[]>>;
}

export default function InteractiveSearch({
  search,
  setSearches,
}: InteractiveSearchProps) {
  const [findByIds, setFindByIds] = useState<string[]>([]);
  const searchMutation = api.search.addMessage.useMutation();
  const influencersQuery = api.influencer.getByIds.useQuery(
    search?.result ?? findByIds,
    {
      enabled: search?.result.length > 0,
      refetchOnMount: false,
    },
  );
  const resultMutation = api.search.addResult.useMutation();
  const interactiveSearch = api.search.search.useMutation({
    onSuccess: (result) => {
      if (result === null) return;
      if (search === null) return;
      if (result.type === "QUESTION") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", content: result.data },
        ]);
        setSearches((prevSearches) => {
          return prevSearches.map((prevSearch) => {
            if (prevSearch._id === search._id) {
              return {
                ...prevSearch,
                messages: [
                  ...prevSearch.messages,
                  { type: "bot", content: result.data },
                ],
              };
            }
            return prevSearch;
          });
        });
        if (search._id === undefined) return;
        searchMutation.mutate({
          searchId: search._id,
          type: "bot",
          content: result.data,
        });
      } else if (result.type === "RESULT") {
        const resultD = result.data.map((influencer) => influencer.id);
        setSearches((prevSearches) => {
          return prevSearches.map((prevSearch) => {
            if (prevSearch._id === search._id) {
              return {
                ...prevSearch,
                result: resultD,
              };
            }
            return prevSearch;
          });
        });
        if (search._id === undefined) return;
        resultMutation.mutate({
          searchId: search._id,
          result: resultD,
        });
        setFindByIds(resultD);
        influencersQuery.refetch().then((res) => {
          if (!res.data) return;
          setInfluencers(res.data);
        });
      }
      setLoading(false);
    },
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesHistory = search ? search.messages : [];
  const [messages, setMessages] = useState<MessageProps[]>(
    messagesHistory ?? [],
  );
  const [influencers, setInfluencers] = useState<IInfluencer[]>(
    influencersQuery.data ?? [],
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
    if (disabled || loading) return;
    setLoading(true);
    setMessages([...messages, { type: "user", content }]);
    setInput("");
    if (search?.sessionId === undefined) return;
    console.log("Sending req to micro", search?.sessionId, content);
    interactiveSearch.mutate({
      sessionId: search?.sessionId,
      query: content,
    });
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
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  let arrowStyle;
  if (disabled) {
    arrowStyle =
      "text-primaryLight absolute right-4 top-[10px] rotate-45 cursor-not-allowed text-3xl";
  } else if (loading) {
    arrowStyle =
      "text-primary absolute right-4 top-[10px] -rotate-45 cursor-not-allowed  text-3xl animate-pulse ";
  } else {
    arrowStyle =
      "absolute right-4 top-[10px] rotate-45 cursor-pointer text-3xl text-primary";
  }
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
          className={arrowStyle}
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
          <div className="flex w-full flex-row gap-2">
            {influencers.map((influencer, index) => (
              <SuggestedCard key={index} influencer={influencer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
