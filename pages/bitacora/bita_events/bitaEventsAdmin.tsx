import {
  useEffect,
  useState,
  forwardRef,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import { red } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import dayjs from "dayjs";
import axios from "axios";
import { EventsContext } from "../../../context/EventState";
import { useTypeEvents } from "../../../hooks/useTypeEvents";
import { useTypeEvents1 } from "../../../hooks/useTypeEvents1";
import { useEventsId } from "../../../hooks/useEventsId";

import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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

resetServerContext();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

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
  { title: "TipoEvento", field: "tipoEvent.description" },
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
type Inputs = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  description: string;
  event_date: string;
};

const BitaEventsAdmin = (props: any): JSX.Element => {
  const { typeEvents } = useTypeEvents(); //
  const { typeEvents1 } = useTypeEvents1(); //
  const [eventId, setEventId] = useState("");
  const { eventsId } = useEventsId(eventId); //

  useTypeEvents1;
  const [modalEditar, setModalEditar] = useState(false);
  const toggleEditar = () => setModalEditar(!modalEditar);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const styles = useStyles();

  // const ENDPOINT = "http://localhost:3000/api/bitacora/events";
  const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "bitacora/events";

  const { status, data, error, isLoading, refetch } = useQuery(
    "bitacoras",
    async () => {
      const res = await axios.get(`${ENDPOINT}`);
      return res.data;
    }
  );
  const { addBitaEvent, editBitaEvent, removeBitaEvent, events } =
    useContext(EventsContext);

  console.log("DATA", data);
  const [eventoSeleccionado, setEventoSeleccionado] = useState({
    id: "",
    bitacora_id: "",
    tipo_event_id: "",
    tipoEvent: "",
    events_id: "",
    event: "",
    description: "",
    event_date: "",
  });

  const peticionPut = async () => {
    console.log("EventoSeleccionado", eventoSeleccionado);
    const dataE = {
      id: eventoSeleccionado.id,
      bitacora_id: eventoSeleccionado.bitacora_id,
      tipo_event_id: parseInt(eventoSeleccionado.tipo_event_id),
      events_id: parseInt(eventoSeleccionado.events_id),
      description: eventoSeleccionado.description,
      event_date: new Date(eventoSeleccionado.event_date),
    };
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/bitacora/events/edit/${Number(
            dataE.id
          )}`,
          dataE
        )
        .then((res) => {
          console.table("RESP", res);
          console.table("RESPEventSelecc", eventoSeleccionado);
          //console.log("RESPDATAN", dataN);
          // mutate(
          // "http://localhost:3000/api/bitacora/events",
          // { ...data, dataN },
          // false
          // );
          //mutate("http://localhost:3000/api/bitacora/events");
          refetch();
          // abrirCerrarModalEditar();
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log("Error data", error);
    }
  };

  const seleccionarEvento = (evento, caso) => {
    setEventoSeleccionado(evento);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Target", e.target);
    setEventoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitE = useCallback(() => {
    const data = {
      id: bitacoraE.id,
      bitacora_id: bitacoraE.bitacora_id,
      tipo_event_id: parseInt(bitacoraAdd.tipo_event_id),
      events_id: parseInt(bitacoraAdd.events_id),
      description: bitacoraE.description,
      event_date: new Date(bitacoraE.event_date),
    };
    //console.log("Data a Editar", data);
    editBitaEvent(data);

    setModalEditar(false);
  });

  console.table(data);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        <div className="flex rounded items-center justify-center flex-wrap bg-gray-100 p-2">
          <div className="bg-white shadow-lg ">
            <div className="flex justify-between p-1">
              <MaterialTable
                title="Bitacoras Eventos. CRUD"
                columns={columns}
                data={data}
                icons={tableIcons}
                actions={[
                  {
                    icon: Edit,
                    tooltip: "Editar Evento",
                    onClick: (event, rowData) =>
                      seleccionarEvento(rowData, "Editar"),
                  },
                  {
                    icon: DeleteOutline,
                    tooltip: "Eliminar Evento",
                    onClick: (event, rowData) =>
                      seleccionarEvento(rowData, "Eliminar"),
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
        </div>
        <Modal
          ize="xl"
          style={{ maxWidth: "780px", width: "100%" }}
          isOpen={modalEditar}
          toggle={toggleEditar}
        >
          <form
            className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
            onSubmit={handleSubmit(onSubmitE)}
          >
            <ModalHeader toggle={toggleEditar}>
              Edit Events ID:
              {eventoSeleccionado.id}
              {", "}
              {eventoSeleccionado.tipo_event_id} {", "}
              {eventoSeleccionado.events_id} {", "}
              {eventoSeleccionado && eventoSeleccionado.description}
            </ModalHeader>
            <ModalBody>
              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="id"
                >
                  Tipos Events
                </label>
                <Controller
                  name="tipo_event_id"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => {
                    const currentSelection = typeEvents1.find(
                      (c) => c.value === value
                    );
                    //console.log("CurrentSelection", currentSelection);
                    const handleSelectChange = (
                      selectedOption: tipo_event_id | null
                    ) => {
                      onChange(selectedOption?.value);
                    };
                    return (
                      <Select
                        inputRef={ref}
                        options={typeEvents1}
                        value={typeEvents1.find((c) => c.value === value)}
                        defaultValue={
                          eventoSeleccionado && eventoSeleccionado.tipo_event_id
                        }
                        name={name}
                        onChange={(val) => {
                          onChange(val.value);
                          setEventId(val.value);
                          handleOnChange("tipo_event_id", val.value);
                        }}
                      />
                    );
                  }}
                />
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="id"
                >
                  Event
                </label>
                <Controller
                  name="events_id"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => {
                    const currentSelection = eventsId.find(
                      (c) => c.value === value
                    );
                    // console.log("CurrentSelection", currentSelection);
                    const handleSelectChange = (
                      selectedOption: events_id | null
                    ) => {
                      onChange(selectedOption?.value);
                    };
                    return (
                      <Select
                        inputRef={ref}
                        options={eventsId}
                        value={eventsId.find((c) => c.value === value)}
                        name={name}
                        onChange={(val) => {
                          onChange(val.value);
                          handleOnChange("events_id", val.value);
                        }}
                      />
                    );
                  }}
                />
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="authorId"
                >
                  Descripcion evento
                </label>

                <textarea
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  rows="3"
                  name="description"
                  defaultValue={
                    eventoSeleccionado && eventoSeleccionado.description
                  }
                  {...register("description", {
                    required: "Required",
                    minLength: 1,
                    maxLength: 300,
                  })}
                  onChange={(e) =>
                    handleOnChangeE("description", e.target.value)
                  }
                />

                {errors.description && errors.description}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="event_date"
                >
                  Fecha Evento
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  placeholder="Gonzalez"
                  name="event_date"
                  defaultValue={
                    eventoSeleccionado && eventoSeleccionado.event_date
                  }
                  {...register("event_date", {
                    required: "Required",
                    minLength: 3,
                    maxLength: 41,
                  })}
                  onChange={(e) =>
                    handleOnChangeE("event_date", e.target.value)
                  }
                />
                {errors.event_date && errors.event_date}
              </div>
              <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                Hello
              </div>
              <input
                type="hidden"
                name="bitacora_id"
                defaultValue={
                  eventoSeleccionado && eventoSeleccionado.bitacora_id
                }
                {...register("bitacora_id", {
                  required: "Required",
                  minLength: 3,
                  maxLength: 41,
                })}
              ></input>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => onSubmitE()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setModalEditar(false)}
              >
                No
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

BitaEventsAdmin.propTypes = {
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
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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

export default withStyles(styles)(BitaEventsAdmin);
