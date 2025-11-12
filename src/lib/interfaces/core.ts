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