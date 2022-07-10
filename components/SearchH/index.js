import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Edit, Delete } from "@material-ui/icons";
import Link from "next/link";

// import getHistorieSearch from "../../services/getHistorieSearch";
import getBitacora from "../../services/getBitacora";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 480,
  },
  iconos: {
    cursor: "pointer",
  },
});

export default function SearchH({ search }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const id = search;
  console.log("id", id);

  const [author, setAuthor] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [totalEvents, setTotalEvents] = useState("");
  useEffect(() => {
    setLoading(true);
    console.log("Histories1 dentro nuseEffect", id);
    getBitacora(id).then((resp) => {
      setLoading(false);
      console.log("Histories dentro nuseEffect", resp);
      setAuthor(resp.author.name);
      setBitacoraDate(resp.bitacora_date);
      setTotalEvents(resp._count.bita_events);
    });
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Fecha</StyledTableCell>
                <StyledTableCell align="left">Author</StyledTableCell>
                <StyledTableCell align="left">BitaEvents</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" component="th" scope="row">
                  {id}
                </StyledTableCell>
                <StyledTableCell align="left">{bitacoraDate}</StyledTableCell>
                <StyledTableCell align="left">{author}</StyledTableCell>
                <StyledTableCell align="left">{totalEvents}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
