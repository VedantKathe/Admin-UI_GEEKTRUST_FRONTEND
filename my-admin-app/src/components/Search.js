import SearchBar from "material-ui-search-bar";

function Search(props) {
    /**
   * To filter(search) out the rows, that match the string typed in the search bar.
   *
   * @param { String } searchedRow
   *  String that is typed in the searchbar, that needs to be searched.
   *
   */

  const requestSearch = (searchedRow) => {
    if (searchedRow === "") {
      props.setRows(props.filteredRows);
    } else {
      const filteredRows = props.rows.filter((element) => {
        return Object.keys(element).some((key) =>
          element[key].toLowerCase().includes(searchedRow.toLowerCase())
        );
      });
      props.setRows(filteredRows);
    }
  };

  /**
   *
   * Cancel the search, and set the rows to default value.
   *
   */

  const cancelSearch = () => {
    props.setSearch("");
    requestSearch(props.search);
    props.setRows(props.filteredRows);
  };

    return (
        <SearchBar
        value={props.search}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search by name, email or role"
      />
      );

  };

  export default Search;