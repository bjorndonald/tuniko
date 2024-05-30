import { getCorpus } from "@/actions/corpus";
import { CorpusGrid } from "@/components/Common/Corpus";
import Filters from "@/components/Common/Filters";

export default async function Home() {
  const corpusList = await getCorpus()
  
  return ( 
    <main className="min-h-screen pt-[65px]">
      <div className="container px-4 mx-auto w-auto max-w-[1376px] md:px-12 transition-all">
        <Filters />
        <CorpusGrid corpusList={corpusList} />
      </div>
    </main>
  );
}
