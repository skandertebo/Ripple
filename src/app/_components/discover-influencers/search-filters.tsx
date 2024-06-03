"use client";

import { useRouter } from "next/navigation";
import { useReducer, useRef } from "react";

interface FormState {
  search: string;
  minFollowers: string;
  platform: string;
  category: string;
}

interface Action {
  name: keyof FormState;
  value: string;
}

const reducer = (state: FormState, action: Action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function SearchFilters({
  searchParams,
  categories,
}: {
  searchParams: Record<string, string>;
  categories: string[];
}) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    search: searchParams.search ?? "",
    minFollowers: searchParams.minFollowers ?? "",
    platform: searchParams.platform ?? "",
    category: searchParams.category ?? "",
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch({ name: e.target.name as keyof FormState, value: e.target.value });
  };
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedSearch = new URLSearchParams(searchParams);
    if (state.search) {
      updatedSearch.set("search", state.search);
    } else {
      updatedSearch.delete("search");
    }
    if (state.minFollowers) {
      updatedSearch.set("minFollowers", state.minFollowers);
    } else {
      updatedSearch.delete("minFollowers");
    }
    if (state.platform) {
      updatedSearch.set("platform", state.platform);
    } else {
      updatedSearch.delete("platform");
    }
    if (state.category) {
      updatedSearch.set("category", state.category);
    } else {
      updatedSearch.delete("category");
    }
    router.push("/influencers?" + updatedSearch.toString());
  };
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <input
          id="search"
          name="search"
          type="text"
          value={state.search}
          className="flex-[3] rounded-xl border border-slate-400 px-4 py-2"
          onChange={handleChange}
          placeholder="Search for influencers"
          onKeyDown={(e) => {
            if (e.key === "Enter" && buttonRef.current) {
              buttonRef.current?.click?.();
            }
          }}
        />
        <input
          type="number"
          name="minFollowers"
          placeholder="Min followers"
          className="w-[150px] flex-1 rounded-xl border border-slate-400 px-4 py-2"
          onChange={handleChange}
          value={state.minFollowers}
          onKeyDown={(e) => {
            if (e.key === "Enter" && buttonRef.current) {
              buttonRef.current?.click?.();
            }
          }}
        />
        <select
          name="platform"
          className="w-fit flex-1 rounded-xl border border-slate-400 px-4 py-2.5"
          onChange={handleChange}
          value={state.platform}
        >
          <option value="">Select a platform</option>
          <option value="tiktok">Tiktok</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">Youtube</option>
        </select>
        <select
          name="category"
          className="w-fit flex-1 rounded-xl border border-slate-400 px-4 py-2.5"
          onChange={handleChange}
          value={state.category}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button
        ref={buttonRef}
        className="rounded-xl bg-primary px-6 py-2 text-white"
        onClick={onSubmit}
      >
        Apply
      </button>
    </div>
  );
}
