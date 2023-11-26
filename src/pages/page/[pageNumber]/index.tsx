import  type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import getStarships from "@/utils/api";
import { wrapper } from "@/redux/store";
import SearchResults from "@/components/SearchResults";
import Layout from "@/components/layout";
import { getRealPage } from "@/utils/functions";
import { IStarshipResponse } from "@/types/starship";

const initialState: IStarshipResponse = {
  count: 0,
  results: [],
  previous: null,
  next: null,
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNumber = context.params?.pageNumber;
    let result = initialState;
    if (typeof pageNumber === "string") {
      const { input, itemsPerPage } = store.getState().search;
      const page = getRealPage(Number(pageNumber), itemsPerPage)
      result = await getStarships(input, page)
    }
    return { props: { propsData: result } };
  }
) satisfies GetServerSideProps<{ propsData: IStarshipResponse}>

export default function Page({ propsData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <SearchResults propsData={propsData}/>
    </Layout>
  )
}