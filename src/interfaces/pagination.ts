export interface IPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  onPageChange?: (page: number, limit: number) => void;
}

export interface IPaginate {
  page: number;
  limit: number;
}
