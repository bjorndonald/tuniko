import { getCorpus } from "@/actions/corpus";
import { CorpusGrid } from "@/components/Common/Corpus";
import Filters from "@/components/Common/Filters";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function HomePage({ searchParams }: Props) {
  const sortBy = searchParams["sort_by"];
  const search = searchParams["search"];
  const page = searchParams["page"] ? parseInt(searchParams["page"]) : 1;
  const corpusList = await getCorpus(page, sortBy, search);
  console.log(corpusList);
  return (
    <main className="min-h-screen pt-[65px]">
      <div className="md:px-12 container mx-auto w-auto max-w-[1376px] px-4 transition-all">
        <Filters />
        <CorpusGrid corpusList={corpusList} />
      </div>
    </main>
  );
}
