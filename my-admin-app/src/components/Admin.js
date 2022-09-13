import { config } from "../App";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import { useGridApiRef } from "@mui/x-data-grid-pro";
import AdminPagination from "./Pagination";
import red from "@material-ui/core/colors/red";
import "./Admin.css";
import EditRow from "./EditRow";
import DeleteRow from "./DeleteRow";
import Search from "./Search"

/**
 * Stop the event propogation on clicking the cell.
 *
 * @param {{ id: string, field: string, row: object, ... }} event
 *  Object with values of the cell that has been clicked..
 *
 */

const handleCellClick = (event) => {
  event.stopPropagation();
};

/**
 * Stop the event propogation on clicking the row.
 *
 * @param {{ id: string, field: string, row: object, ... }} event
 *  Object with values of the row that has been clicked.
 *
 */

const handleRowClick = (event) => {
  event.stopPropagation();
};

const Admin = () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      editable: true,
      flex: 1,
    },
    { field: "role", headerName: "Role", sortable: false, flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      disableClickEventBubbling: true,
      renderCell: (props) => (
        <EditRow
          api={props.api}
          id={props.id}
          rows={rows}
          setFilteredRows={setFilteredRows}
          setRows={setRows}
        />
      ),
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      disableClickEventBubbling: true,
      renderCell: (props) => (
        <DeleteRow
          id={props.id}
          rows={rows}
          setFilteredRows={setFilteredRows}
          setRows={setRows}
        />
      ),
      flex: 1,
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelect] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  /**
   *
   * Delete the rows, which have been selected, and their values are stored in slectedRows state.
   *
   */

  const bulkDelete = () => {
    const selectedIds = selectedRows.map((event) => event.id);
    const newRows = rows.filter((element) => {
      return !selectedIds.includes(element.id);
    });
    setRows(newRows);
    setFilteredRows(newRows);
    setSelect([]);
  };

  /**
   * To fetch the data from the given API endpoint
   *
   * @param { String } address
   *  String which the endpint that has to be hit, to get the required information.
   *
   */

  const fetchData = async (address) => {
    try {
      const response = await axios.get(address);
      setRows(response.data);
    } catch (e) {
      console.log("error");
      if (e.response && e.response.data.message) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    }
  };

  const apiRef = useGridApiRef();

  const rowEditStart = (event) => {
    event.defaultMuiPrevented = true;
  };

  const rowEditStop = (event) => {
    event.defaultMuiPrevented = true;
  };

  useEffect(() => {
    const address = `${config.endpoint}`;
    fetchData(address);
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Search 
      rows={rows} 
      filteredRows={filteredRows}
      search={search}
      setSearch={setSearch}
      setFilteredRows={setFilteredRows} 
      setRows={setRows} 
      />
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
            {
              display: "none",
            },
        }}
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row.id.toString())
          );
          setSelect(selectedRowData);
        }}
        disableColumnMenu
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={rowEditStart}
        onRowEditStop={rowEditStop}
        components={{
          Pagination: AdminPagination,
        }}
      />
      <Button
        variant="contained"
        sx={{
          margin: "5px",
          position: "absolute",
          left: "2%",
          borderRadius: 10,
          bgcolor: red[400],
        }}
        onClick={() => bulkDelete()}
      >
        Delete Selected
      </Button>
    </Box>
  );
};

export default Admin;
