export interface DataTableProps {
    data: any[]
    columns: any[]
    sorting: any
    setSorting: any
    isLoading: boolean
    onRowClick?:any
}

export interface PaginationProps {
    paginationInfo: any;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}
export  const formatDateToPayload = (dateString: string) => {
  // Converts "yyyy-mm-dd" to "dd-mm-yyyy"
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return dateString;
  return `${day}-${month}-${year}`;
};