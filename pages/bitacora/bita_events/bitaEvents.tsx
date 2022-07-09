import { useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import dayjs from "dayjs";
import useSWR from "swr";
import Interweave from "interweave";
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
import GetAppIcon from "@material-ui/icons/GetApp";
import Visibility from "@material-ui/icons/Visibility";
import BitaEventCard from "../../../components/Bitacoras/BitaEventCard";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

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
  { title: "Bitacora-Id", field: "bitacora_id" },
  { title: "TipEvenId", field: "tipo_event_id" },
  { title: "TipoEvento", field: "tipoEvent.description" },
  { title: "EventId", field: "events_id" },
  { title: "Evento", field: "event.description" },
  {
    title: "Description",
    field: "description",
    render: (data: any) => <Interweave content={data.description} />,
  },
  {
    title: "Fecha",
    field: "event_date",
    render: (data: any) => convertDate1(data.event_date),
  },
  { title: "EventDate", field: "event_date" },
  {
    title: "Image?",
    field: "img",
    render: (item) => (
      <img
        src={"/static/images/" + `${item.id}` + ".jpg"}
        alt=""
        border="3"
        height="100"
        width="100"
      />
    ),
  },
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const BitaEvents = (props: any): JSX.Element => {
  const { bitacoraSelected } = props;
  const [loading, setLoading] = useState(false);
  const [bitaevents, setBitaevents] = useState([]);
  const [totalEvents, setTotalEvents] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const toggleViewHist = () => setModalViewHist(!toggleViewHist);
  const [modalViewHist, setModalViewHist] = useState(false);

  const [bitacoraSeleccionada1, setBitacoraSeleccionada1] = useState({
    id: "",
    authorId: "",
    bitacoraDate: "",
  });
  // to viewBitaEvent
  const seleccionarBitacora1 = (elemento: any, caso: any) => {
    setBitacoraSeleccionada1(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/bitacora/events/`,
    fetcher
  );
  console.log("Data", data);
  return (
    <div className="flex rounded items-center justify-center flex-wrap bg-gray-100 p-2">
      <div className="bg-white shadow-lg ">
        <div className="flex justify-between p-1">
          <MaterialTable
            title="Bita-eventos"
            columns={columns}
            data={data}
            icons={tableIcons}
            actions={[
              {
                icon: () => <Visibility />,
                tooltip: "View me",
                // onClick: (e, data) => console.log(data),
                // isFreeAction:true
                onClick: (event, data) => seleccionarBitacora1(data, "View"),
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
        </div>
      </div>
      <Modal
        size="xl"
        style={{
          maxWidth: "580px",
          width: "100%",
          maxHeight: "380px",
          height: "100%",
        }}
        isOpen={modalViewHist}
        toggle={toggleViewHist}
      >
        <ModalHeader toggle={toggleViewHist} />
        <ModalBody>
          <BitaEventCard bitacoraSelected={bitacoraSeleccionada1} />
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-secondary"
            onClick={() => setModalViewHist(false)}
          >
            Cerrar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

BitaEvents.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(BitaEvents);
