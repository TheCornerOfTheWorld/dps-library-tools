import { request } from '@/utils/http';

enum Api {
  GET_AUTO_COMPLETE = '/library/api/opacservice/getAutoComplete',
  GET_QUERY_RESULT = '/library/api/opacservice/getQueryResult',
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
