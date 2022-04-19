import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import React, {useState } from "react";
import PriorityButton from "./PriorityButton";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import { visuallyHidden } from "@mui/utils";
import Confirm from "./Confirm";
import EditJob from "./EditJob";
import JobConsumer from '../context/context';

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "priority",
    numeric: true,
    disablePadding: false,
    label: "Priority",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{backgroundColor:"#A4C7F0"}}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = ({onSearch}) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...{
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      }}
    >
      <TextField
      sx={{backgroundColor:"white"}}
        fullWidth
        size="small"
        id="outlined-basic"
        label="Job Name"
        variant="outlined"
        value={name}
        onChange={(e)=>{
          setName(e.target.value);
          onSearch({name:e.target.value,priority:priority});
        }}
      />
      <Select
      sx={{backgroundColor:"white"}}
        fullWidth
        size="small"
        labelId="demo-simple-select-label1"
        id="demo-simple-select"
        value={priority}
        onChange={(event) => {
          setPriority(event.target.value);
          onSearch({name:name,priority:event.target.value});
        }}
      >
        <MenuItem value={0}>Choose</MenuItem>
        <MenuItem value={1}>Urgent</MenuItem>
        <MenuItem value={2}>Regualar</MenuItem>
        <MenuItem value={3}>Trivial</MenuItem>
      </Select>
    </Toolbar>
  );
};


const Joblist = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("priority");
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openJobEdit, setOpenJobEdit] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [filters, setFilter] = useState(null);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleFilter=(array)=>{
    if(filters){
      if(filters.name !== ''){
        array = array.filter(job=>job.name.includes(filters.name))
      }
      if(filters.priority>0){
          array = array.filter(job=>job.priority === filters.priority)
      }
    }

    return array;
  }
  const onSearchLocal=(item)=>{
    setFilter({name:item.name,priority:item.priority});
  }
  const openConfirm=()=>{
    setOpenDeleteConfirm(true);
  }
  const handleClose=()=>{setOpenDeleteConfirm(false); setOpenJobEdit(false)}

  const onClose = ()=>{
    setOpenJobEdit(false)

  }

  return <JobConsumer>
    {value=>{
      const {jobs} = value;
        return (
          <div>
            <Confirm open={openDeleteConfirm} handleClose={handleClose} selected={selected}/>
            <EditJob job={selected} open={openJobEdit} handleCancel={handleClose} onClose={onClose}  />
            <Grid container sx={{ marginTop: "10px" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "left",
                }}
              >
                <h3>Job List</h3>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box sx={{ width: "100%" }}>
                  <Paper sx={{ width: "100%", mb: 2 }}>
                    <EnhancedTableToolbar onSearch={onSearchLocal} />
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                      >
                        <EnhancedTableHead
                          
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          
                        />
                        <TableBody>
                          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                       jobs.slice().sort(getComparator(order, orderBy)) */}
                          {jobs && handleFilter(stableSort(jobs, getComparator(order, orderBy))).map(
                            (row, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;
      
                              return (
                                <TableRow hover tabIndex={-1} key={row.id}>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {<PriorityButton priority={row.priority} />}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Tooltip title="Delete">
                                      <IconButton
                                        onClick={() => {
                                          setSelected(row);
                                          openConfirm()
                                        }}
                                      >
                                        <Delete />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        onClick={() => {
                                          setSelected(row);
                                          setOpenJobEdit(true)
                                        }}
                                      >
                                        <Edit />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </div>
        );
    }}
  </JobConsumer>
};

export default Joblist;
