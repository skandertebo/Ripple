import InteractiveSearch from "@/app/_components/interactiveSearch/interactiveSearch";
import SearchHistory from "@/app/_components/interactiveSearch/searchHistory";
import { getServerAuthSession } from "@/server/auth";
import { SearchModel } from "@/models/search.model";
import { api } from "@/trpc/server";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const user = session.user;
  const searchHistory = await api.search.getAllByUserId({ userId: user.id });
  return (
    <div className="flex flex-row bg-background">
      <SearchHistory searchHistory={searchHistory} userId={user.id} />
      <div className="relative -mt-16 h-screen flex-1 overflow-y-scroll pt-16">
        <InteractiveSearch />
      </div>
    </div>
  );
}
