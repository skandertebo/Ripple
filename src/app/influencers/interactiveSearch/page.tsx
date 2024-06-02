import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import InteractiveSearchPage from "@/app/_components/interactiveSearch/interactiveSearchPage";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const searchHistory = await api.search.getAllByUserId();
  //sort array by creation date in descending order
  searchHistory.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return (
    <>
      <InteractiveSearchPage searchHistory={searchHistory} />
    </>
  );
}
