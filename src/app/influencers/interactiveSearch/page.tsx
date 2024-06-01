import InteractiveSearch from "@/app/_components/interactiveSearch/interactiveSearch";
import SearchHistory from "@/app/_components/interactiveSearch/searchHistory";

export default function Page() {
  return (
    <div className="flex flex-row bg-background">
      <SearchHistory />
      <div className="relative -mt-16 h-screen flex-1 overflow-y-scroll pt-16">
        <InteractiveSearch />
      </div>
    </div>
  );
}
