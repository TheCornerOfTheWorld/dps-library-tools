declare interface BooksModel {
  publisher: string
  all: string[]
  u_publish: string
  u_isbn: string
  author: string
  f_author: string[]
  callno: string
  isbn: string
  u_page: string
  id: string
  u_title: string
  local_reserve: number
  u_price: string
  tablename: string
  library: string
  local_children: string
  publishyear: string
  ptitle: string
  recordid: number
  serviceaddr: string
  cirtype_l: number
  classno: string
  cirtype_r: number
  subject: string
  f_subject: string[]
  title: string
  u_abstract: string
  _version_: string
  cover_path: string
}
declare interface BookModel {
  title: string
  author: string
  publish: string
  publishyear: string
  callno: string
  series: string
  page: string
  price: string
  subject: string
  classno: string
  abstract: string
  isPreloan: boolean
  isbn: string
  img: string
  districtList: any[]
  CanLoanBook: any[]
  OnlyReadBook: any[]
  BorrowedBook: any[]
}

declare interface AutoCompleteResData {
  value: string
  u_title: string
  bookURL: string
  cover_path: string
}

declare interface GetBooksParams {
  v_index: string
  v_value: string
  library: string
  v_tablearray: string
  cirtype: string
  sortfield: string
  sorttype: string
  pageNum: number
  v_page: number
  v_startpubyear: string
  v_endpubyear: string
  v_secondquery: string
  client_id: string
}

declare interface BooksResultAPI {
  data: {
    numFound: number
    docs: BooksModel[]
  }
}

declare interface AutoCompleteAPI {
  data: AutoCompleteResData[]
}
