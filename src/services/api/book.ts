import { request } from '@/utils/http';

enum Api {
  GET_AUTO_COMPLETE = '/library/api/opacservice/getAutoComplete',
  GET_QUERY_RESULT = '/library/api/opacservice/getQueryResult',
  GET_BOOK_DETAIL = '/library/api/opacservice/getBookDetail',
}

/**
 * 获取查询书籍信息
 */
export function getAutoComplete(params: GetBooksParams) {
  return request.Get<AutoCompleteAPI>(Api.GET_AUTO_COMPLETE, {
    params,
    meta: { ignoreAuth: true, noAuthorization: true },
  });
}

/**
 * 获取查询书籍信息
 */
export function getQueryResult(params: GetBooksParams) {
  return request.Get<BooksResultAPI>(Api.GET_QUERY_RESULT, {
    params,
    meta: { ignoreAuth: true, noAuthorization: true },
  });
}

/**
 * 获取查询书籍信息
 */
export function getBookDetail(params: GetBookDetailParams) {
  return request.Get<GetBookDetailRes>(Api.GET_BOOK_DETAIL, {
    params,
    meta: { ignoreAuth: true, noAuthorization: true },
  });
}
