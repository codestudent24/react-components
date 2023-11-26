import DetailedItem from '@/components/DetailedItem';
import SearchResults from '@/components/SearchResults';
import Layout from '@/components/layout';
import { wrapper } from '@/redux/store';
import { IStarshipResponse, IStarship } from '@/types/starship';
import getStarships, { getStarshipByIndex, getRealPage } from '@/utils/api';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const initialState: IStarshipResponse = {
  count: 0,
  results: [],
  previous: null,
  next: null,
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNumber = context.params?.pageNumber;
    const detailedIndex = context.params?.detailedIndex;
    let result = initialState;
    let item: IStarship | null = null;
    if (typeof pageNumber === 'string') {
      const { input, itemsPerPage } = store.getState().search;
      const page = getRealPage(Number(pageNumber), itemsPerPage);
      result = await getStarships(input, page);
    }
    if (typeof detailedIndex === 'string') {
      item = await getStarshipByIndex(detailedIndex);
    }
    return {
      props: {
        propsData: result,
        item,
      },
    };
  }
) satisfies GetServerSideProps<{
  propsData: IStarshipResponse;
  item: IStarship | null;
}>;

export default function Detailed({
  propsData,
  item,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <SearchResults propsData={propsData} />
      <DetailedItem item={item} />
    </Layout>
  );
}
