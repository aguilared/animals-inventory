import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import dayjs from "dayjs";
import useSWR from "swr";
import BitacoraCard from "../../components/Bitacoras/BitacoraCard";

import MaterialTable from "material-table";
import { resetServerContext } from "react-beautiful-dnd";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Visibility } from "@material-ui/icons";

resetServerContext();

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const convertDate = (date: any) => {
  var d = dayjs(date).format("DD-MM-YYYY");
  return d;
};
const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const columns = [
  { title: "Id", field: "id" },
  { title: "BitacoraDate", field: "bitacora_date" },

  {
    title: "Fecha",
    field: "bitacora_date",
    render: (data: any) => convertDate1(data.bitacora_date),
  },
  { title: "Author_Id", field: "author_id" },
  { title: "Author", field: "author.name" },
  { title: "Tot_Events", field: "_count.bita_events" },
];

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  VisibilityIcon: forwardRef((props, ref) => <View {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const BitaEvents = (props: any): JSX.Element => {
  const { data, error } = useSWR(
    "http://localhost:3000/api/bitacora/",
    fetcher
  );
  console.log("Data", data);

  const [modalView, setModalView] = useState(false);

  const [eventoSeleccionado, setEventoSeleccionado] = useState({
    id: "",
    author: "",
    bitacora_date: "",
  });
  const styles = useStyles();

  const seleccionarEvento = (evento, caso) => {
    setEventoSeleccionado(evento);
    caso === "View" ? abrirCerrarModalView() : abrirCerrarModalEliminar();
  };

  const abrirCerrarModalView = () => {
    setModalView(!modalView);
  };

  return (
    <div className="flex rounded items-center justify-center flex-wrap bg-gray-100 p-2">
      <div className="bg-white shadow-lg ">
        {!data ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        <div className="flex justify-between p-1">
          <MaterialTable
            title="Listado Bitacoras"
            columns={columns}
            data={data}
            icons={tableIcons}
            actions={[
              {
                icon: Visibility,
                tooltip: "View Bitacora",
                onClick: (event, rowData) => seleccionarEvento(rowData, "View"),
                // isFreeAction:true
              },
            ]}
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "right",
              searchAutoFocus: true,
              searchFieldVariant: "standard",
              filtering: true,
              paging: true,
              pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
              pageSize: 10,
              paginationType: "stepped",
              showFirstLastPageButtons: false,
              paginationPosition: "both",
              exportButton: true,
              exportAllData: true,
              exportFileName: "TableData",
              addRowPosition: "first",
              actionsColumnIndex: -1,
              selection: false,
              showSelectAllCheckbox: false,
              showTextRowsSelected: false,
              selectionProps: (rowData) => ({
                disabled: rowData.age == null,
                // color:"primary"
              }),
              grouping: false,
              columnsButton: true,
              rowStyle: (data, index) =>
                index % 2 === 0 ? { background: "#f5f5f5" } : null,
              headerStyle: { background: "#479cdb", color: "#fff" },
            }}
          />
          <Modal open={modalView} onClose={abrirCerrarModalView}>
            <div className={styles.modal}>
              {" "}
              <BitacoraCard bitacoraSelected={eventoSeleccionado} />;
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },
  avatar: {
    backgroundColor: red[500],
  },
};
const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    maxWidth: "980px",
    width: "100%",
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
  root: {
    maxWidth: 145,
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 150,
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default BitaEvents;
