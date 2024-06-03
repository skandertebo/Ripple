"use client";
import { type IInfluencer } from "@/models/influencer.model";
import { type ISearch } from "@/models/search.model";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import SuggestedCard from "../influencer/suggested-card";
import Message, { type MessageProps } from "./message";
import { type SearchResponse } from "@/server/api/routers/search";
import { FiAperture } from "react-icons/fi";

interface InteractiveSearchProps {
  search: ISearch | null;
  searches: ISearch[];
  setSearches: React.Dispatch<React.SetStateAction<ISearch[]>>;
}

export default function InteractiveSearch({
  search,
  searches,
  setSearches,
}: InteractiveSearchProps) {
  const [nameUpdated, setNameUpdated] = useState(false);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<string>("");
  const messagesHistory = search ? search.messages : [];
  const [messages, setMessages] = useState<MessageProps[]>(
    messagesHistory ?? [],
  );

  const influencersQuery = api.influencer.getByIds.useQuery(foundIds, {
    enabled: foundIds.length > 0,
    refetchOnMount: false,
  });
  const nameMutation = api.search.updateName.useMutation({
    onSuccess: (data) => {
      if (!data) {
        console.error("No data returned from the mutation");
        return;
      }
      const newSearch = data as ISearch;
      console.log("New search:", newSearch);
      //check if the search is updated
      const newSearches = searches.map((prevSearch) => {
        if (prevSearch._id === newSearch._id) {
          return newSearch;
        }
        return prevSearch;
      });
      setSearches(newSearches);
    },
  });
  const [influencers, setInfluencers] = useState<IInfluencer[]>(
    influencersQuery.data ?? [],
  );

  const interactiveSearch = api.search.search.useMutation({
    onSuccess: (result) => {
      if (result === null) return;
      if (search === null) return;
      if (result.type === "QUESTION") {
        if (typeof result.data === "string") {
          setMessages([...messages, { type: "bot", content: result.data }]);
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          const question: string = result.data as string;
          setSearches((prevSearches) => {
            return prevSearches.map((prevSearch) => {
              if (prevSearch._id === search._id) {
                return {
                  ...prevSearch,
                  messages: [
                    ...prevSearch.messages,
                    { type: "bot", content: question },
                  ],
                };
              }
              return prevSearch;
            });
          });
        }
      } else if (result.type === "RESULT") {
        const resultArray = result.data as SearchResponse;
        const influencersIds = resultArray.map((res) => res.id);
        setSearches((prevSearches) => {
          return prevSearches.map((prevSearch) => {
            if (prevSearch._id === search._id) {
              return {
                ...prevSearch,
                result: influencersIds,
              };
            }
            return prevSearch;
          });
        });
        setFoundIds(influencersIds);
      }
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (foundIds.length) {
      influencersQuery.refetch().then((res) => {
        if (!res.data) return;
        setInfluencers(res.data);
      });
    }
  }, [foundIds]);

  useEffect(() => {
    if (search === null) return;
    setMessages(search.messages);
    setFoundIds(search.result);
    // todo check the initial search result
    if (search.result.length > 0) {
      setInfluencers(influencersQuery.data ?? []);
    } else {
      setInfluencers([]);
    }
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
    if (search?._id === undefined) return;
    interactiveSearch.mutate({
      sessionId: search?.sessionId,
      searchId: search?._id,
      query: content,
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
    if (!nameUpdated) {
      //update name of search
      nameMutation.mutate({ searchId: search._id, content });
      setNameUpdated(true);
    }
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
      <div className="fixed bottom-12 left-[31%] mx-auto w-[60%]">
        <input
          type="text"
          title="description"
          placeholder="Search for ..."
          className="h-12 w-full rounded-md border-2 border-gray-300 px-4 py-2 text-xl font-semibold focus:border-primary disabled:cursor-not-allowed disabled:bg-white"
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
            Add a new search to start
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-[10%] pt-8">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
          <div className={search.result.length > 0 ? "" : "hidden"}>
            <div className="text-left">
              <FiAperture className="mb-4 mr-1 inline-block h-8 w-8 text-primary" />
              <span className="inline-block w-fit text-3xl font-semibold text-primary">
                Ripple
              </span>
            </div>
            <p className="ml-10">
              Here are the results that best fit your description.
            </p>
          </div>
          <div className="flex w-full flex-row flex-wrap justify-between">
            {influencers.map((influencer, index) => (
              <SuggestedCard key={index} influencer={influencer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
