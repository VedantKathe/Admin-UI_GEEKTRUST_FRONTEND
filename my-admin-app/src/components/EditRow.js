import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Close";

function EditRow(props) {
    const { api, id } = props;
    const isInEditMode = api.getRowMode(id) === "edit";
  
    /**
     * Set the mode of the row to edit.
     *
     * @param {{ id: string, field: string, row: object, ... }} event
     *  Object with values of the cell that has been clicked..
     *
     */
  
    const handleEdit = (event) => {
      event.stopPropagation();
      api.setRowMode(id, "edit");
    };
  
    /**
     * To save the changes made to the editing row and updating it to the rows variable.
     *
     * @param {{ id: string, field: string, row: object, ... }} event
     *  Object with values of the cell that has been clicked.
     *
     */
  
    const handleSave = (event) => {
      event.stopPropagation();
      api.commitRowChange(id);
      api.setRowMode(id, "view");
  
      const row = api.getRow(id);
      api.updateRows([{ ...row, isNew: false }]);
      console.log(row);
      const newRows = props.rows.map((item) => {
        if (item.id === id) {
          return { ...item, ...row };
        }
        return item;
      });
      props.setRows(newRows);
      props.setFilteredRows(newRows);
    };
  
    /**
     * Set the mode of the row back again to view, to cancel the editing.
     *
     * @param {{ id: string, field: string, row: object, ... }} event
     *  Object with values of the cell that has been clicked.
     *
     */
  
    const handleCancel = (event) => {
      event.stopPropagation();
      api.setRowMode(id, "view");
  
      const row = api.getRow(id);
      if (row.isNew) {
        api.updateRows([{ id, _action: "delete" }]);
      }
    };
  
    if (isInEditMode) {
      return (
        <div>
          <IconButton aria-label="save" onClick={handleSave}>
            <CheckIcon className="check" />
          </IconButton>
          <IconButton aria-label="cancel" onClick={handleCancel}>
            <CancelIcon className="cancel" />
          </IconButton>
        </div>
      );
    }
  
    return (
      <IconButton aria-label="edit" onClick={handleEdit}>
        <EditIcon className="edit" />
      </IconButton>
    );
  };

  export default EditRow;