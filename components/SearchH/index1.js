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

import getHistorieSearch from "../../services/getHistorieSearch";

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
  const cedula = search;
  const [histories, setHistories] = useState([]);
  useEffect(() => {
    setLoading(true);
    console.log("Histories1 dentro nuseEffect", cedula);
    getHistorieSearch(cedula).then((resp) => {
      setLoading(false);
      setHistories(resp);
      console.log("Histories dentro nuseEffect", resp);
    });
  }, [setHistories, cedula]);

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
                <StyledTableCell align="left">Cedulaaa</StyledTableCell>
                <StyledTableCell align="left">Nombre</StyledTableCell>
                <StyledTableCell align="left">Apellido</StyledTableCell>
                <StyledTableCell align="left">Accion</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left" component="th" scope="row">
                    {row.cedula}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.apellido}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="w-1/5 inline-block text-gray-700 text-right px-1 py-1 m-1">
                      <Link
                        to={`/histoclinixr/dashboard/${encodeURIComponent(
                          row.cedula
                        )}`}
                      >
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Link>
                    </div>{" "}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
