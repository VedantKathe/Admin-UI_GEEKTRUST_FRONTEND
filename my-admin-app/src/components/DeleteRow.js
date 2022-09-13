import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import "./DeleteRow.css";

function DeleteRow(props) {

  const { id } = props;

   /**
   * 
   * Delete the specific row, when dlete icon is clicked.
   *
   */

  const handleDelete = () => {
    const newRows = props.rows.filter((item) => {
      return item.id !== id;
    });
    props.setRows(newRows);
    props.setFilteredRows(newRows);
  };

    return (
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon className="delete"/>
        </IconButton>
      );

  };

  export default DeleteRow;