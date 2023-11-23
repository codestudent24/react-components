import DetailedItem from "@/components/DetailedItem";
import SearchResults from "@/components/SearchResults";
import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function Detailed() {
    const router = useRouter();
    return (
        <Layout>
          <SearchResults />
          <DetailedItem />
        </Layout>
    )
}