import Pagination from '@mui/material/Pagination';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';

function AdminPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        showFirstButton={true}
        showLastButton={true}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  export default AdminPagination