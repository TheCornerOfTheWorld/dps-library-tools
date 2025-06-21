import { defineStore } from 'pinia';
import { getAutoComplete, getQueryResult } from '@/services/api/book';

export const useBookStore = defineStore('BookStore', () => {
  const autoCompleteList = ref<AutoCompleteResData[]>([]);

  const bookList = ref<BooksModel[]>([]);
  const total = ref(0);
  const qryBookListParams = reactive<GetBooksParams>({
    v_index: 'title',
    v_value: '',
    library: 'all',
    v_tablearray: 'bibliosm,serbibm,apabibibm,mmbibm,',
    cirtype: '',
    sortfield: 'ptitle',
    sorttype: 'desc',
    pageNum: 10,
    v_page: 1,
    v_startpubyear: '',
    v_endpubyear: '',
    v_secondquery: '',
    client_id: 't1',

  });

  // 输入建议
  const { send: sendAutoComplete } = useRequest(getAutoComplete, { immediate: false });
  async function qryAutoComplete(params: GetBooksParams) {
    try {
      const res = await sendAutoComplete(params);
      const { data } = res || {};
      autoCompleteList.value = data;
    } catch (error) {
      throw error;
    }
  }

  // 书籍查询结果
  const { send: sendQueryResult } = useRequest(getQueryResult, { immediate: false });
  async function qryBookList(keyword: string) {
    try {
      qryBookListParams.v_value = keyword;
      const res = await sendQueryResult(qryBookListParams);
      console.log('🚀 ~ qryBookList ~ res:', res);

      const { data } = res || {};
      const { numFound, docs } = data || {};
      bookList.value = docs;
      total.value = numFound;
      qryBookListParams.v_page += 1;
    } catch (error) {
      throw error;
    }
  }

  return {
    autoCompleteList,
    qryAutoComplete,
    bookList,
    total,
    qryBookList,
  };
});
