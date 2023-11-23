import Search from "@/components/Search/Search";
import SearchResults from "@/components/SearchResults";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <Layout>
      <SearchResults />
    </Layout>
  )
}