import { CorpusGrid } from "@/components/Common/Corpus";
import Filters from "@/components/Common/Filters";

export default function Home() {
  return (
    <main className="min-h-screen pt-[65px]">
      <div className="container mx-auto w-auto max-w-[1376px] px-12 transition-all">
        <Filters />
        <CorpusGrid />
      </div>
    </main>
  );
}
