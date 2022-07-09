import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import StreetviewRoundedIcon from "@material-ui/icons/StreetviewRounded";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { red } from "@material-ui/core/colors";
import dayjs from "dayjs";
import Container from "../../../components/Container";
import useBitacora from "../../../hooks/useBitacora";
import { useTypeEvents1 } from "../../../hooks/useTypeEvents1";
import { useEventsId } from "../../../hooks/useEventsId";
import getBitacora from "../../../services/getBitacora";
import { EventsContext } from "../../../context/EventState";
import Button from "../../../components/ButtonAdd";
import HeaderBitacora from "../../../components/HearderBita";
import BitaEventCard from "../../../components/Bitacoras/BitaEventCard";
import BitaEventEdit from "../../../components/Bitacoras/BitaEventEdit";
import Image from "next/image";

import WYSIWYGEditor from "./WYSIWYG";
import Link from "next/link";

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

type Inputs = {
  id: number;
  bitacora_id: number;
  tipo_event_id: number;
  events_id: number;
  description: string;
  event_date: string;
};

interface IFormInput {
  bitacora_id: string;
  tipo_event_id: { label: string; value: string };
  events_id: { label: string; value: string };
  description: string;
  event_date: string;
}

const BitaEvents = (props: any): JSX.Element => {
  const { addBitaEvent, editBitaEvent, removeBitaEvent, events } =
    useContext(EventsContext);
  const { query } = useRouter();
  const { isBitacora, loadBitacora } = useBitacora(); //to Global
  const { typeEvents1 } = useTypeEvents1(); //
  const [eventId, setEventId] = useState("");
  const { eventsId } = useEventsId(eventId); //

  const [author, setAuthor] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [totalEvents, setTotalEvents] = useState("");

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalViewHist, setModalViewHist] = useState(false);

  const toggle = () => setModalInsertar(!modalInsertar);
  const toggleEliminar = () => setModalEliminar(!modalEliminar);
  const toggleEditar = () => setModalEditar(!modalEditar);
  const toggleViewHist = () => setModalViewHist(!toggleViewHist);
  const dateBitacora = new Date();
  const [cuentas, setCuentas] = useState(0);
  const convertDate = (date: any) => {
    return dayjs(date).format("DD/MM/YYYY hh:mm");
  };
  const convertDate1 = (date: any) => {
    return dayjs(date).format("YYYY/MM/DD hh:mm");
  };

  const getBitacoraNew = useCallback(async () => {
    if (!isBitacora) {
      console.log("no hay Idbitacora va a cargar", query.id);
      loadBitacora(query.id); //load idhistoria to global
    }
    await getBitacora(query.id).then((resp) => {
      console.log("RESPgetBitacora", resp._count);
      setAuthor(resp.author.name);
      setBitacoraDate(resp.bitacora_date);
      setTotalEvents(events.length);
    });
  }, [setTotalEvents, events]);

  useEffect(() => {
    console.log("entra el useeffect");
    getBitacoraNew();
  }, [getBitacoraNew]);

  const [bitacoraE, setBitacoraE] = useState({
    tipo_event_id: 1,
    description: "Dolor en..",
    event_date: "2022-01-01 11:07",
  });
  const [bitacoraAdd, setBitacoraAdd] = useState({
    bitacora_id: Number(query.id),
    tipo_event_id: 1,
    events_id: 1,
    description: "Dolor en ...",
    event_date: convertDate1(dateBitacora),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // console.log({ errors });
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState({
    id: 1,
    tipo_event_id: 1,
    description: "Dolor en ..",
    event_date: "2022-01-01 11:07",
  });

  // to viewBitacora
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

  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    events_id: "",
    tipo_event_id: "",
    bitacora_id: "",
    description: "",
    event_date: "",
  });

  const seleccionarBitacora = (elemento: any, caso: any) => {
    setBitacoraSeleccionada(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // to editar
  const seleccionarBitacora2 = (elemento: any, caso: any) => {
    setBitacoraSeleccionada2(elemento);
    setBitacoraE({
      ...bitacoraE,
      id: elemento.id,
      bitacora_id: elemento.bitacora_id,
      tipo_event_id: elemento.tipo_event_id,
      events_id: elemento.tipo_event_id,
      description: elemento.description,
      event_date: elemento.event_date,
    });
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const eliminar = () => {
    removeBitaEvent(bitacoraSeleccionada.id);
    setModalEliminar(false);
  };

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const handleOnChange = (bitacoraKey, value) => {
    // console.log("valueOnChangeIngresar", value);
    setBitacoraAdd({ ...bitacoraAdd, [bitacoraKey]: value });
    // console.log("bitacoraOnchage", bitacoraAdd);
  };
  const handleOnChangeE = (bitacoraKey, value) => {
    setBitacoraE({ ...bitacoraE, [bitacoraKey]: value });
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("FormData", data);
    const parsedata = {
      bitacora_id: Number(data.bitacora_id),
      tipo_event_id: Number(data.tipo_event_id),
      events_id: Number(data.events_id),
      description: data.description,
      event_date: new Date(data.event_date),
    };
    // console.log("EventoAagregar", parsedata);
    //debugger;
    // createBitacorae(bitacora);
    addBitaEvent(parsedata);
    setModalInsertar(false);
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

  return (
    <Container>
      <div className="flex rounded items-center justify-between flex-wrap bg-gray-100 p-2">
        <div className="bg-white shadow-lg ">
          <HeaderBitacora
            onClick={() => abrirModalInsertar()}
            bitacoraid={query.id}
            totalEvents={totalEvents}
            author={author}
            bitacoraDate={bitacoraDate}
          />
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="flex justify-center p-4">
            <div className="border-b border-gray-200 shadow">
              <table className="shadow-lg bg-white table-auto">
                <thead>
                  <tr>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Renglon/Id
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Tipo Evento
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Description Event
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      Date Event
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      View
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                      <div>
                        <Button onClick={() => abrirModalInsertar()} />
                      </div>
                    </th>
                  </tr>
                </thead>

                {events.length > 0 ? (
                  <>
                    {events.map((event: any, key: any) => (
                      <>
                        <tbody key={key}>
                          <tr key={key}>
                            <td className="border px-8 py-4">
                              {event.id}
                              <IconButton
                                onClick={() =>
                                  seleccionarBitacora1(event, "Mostrar")
                                }
                              >
                                <StreetviewRoundedIcon fontSize="small" />
                              </IconButton>{" "}
                            </td>
                            <td className="border px-8 py-4">
                              {event.tipo_event_id}
                            </td>
                            <td className="border px-8 py-4">
                              {event.description}
                            </td>
                            <td className="border px-8 py-4">
                              {convertDate(event.event_date)}
                            </td>
                            <td className="border px-8 py-4">
                              <Image
                                onClick={() =>
                                  seleccionarBitacora1(event, "Mostrar")
                                }
                                src={"/static/images/" + `${event.id}` + ".jpg"}
                                alt="my event"
                                width="192"
                                height="128"
                              />
                              <div className="w-1/5 inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <Link
                                  href={`/bitacora/bita_event/${encodeURIComponent(
                                    event.id
                                  )}`}
                                  passHref
                                >
                                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24px"
                                      viewBox="0 0 24 24"
                                      width="24px"
                                      fill="#000000"
                                    >
                                      <title>Detailed</title>
                                      <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
                                    </svg>
                                  </button>
                                </Link>
                              </div>
                            </td>

                            <td className="border px-8 py-4">
                              <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <button
                                  onClick={() =>
                                    seleccionarBitacora(event, "Eliminar")
                                  }
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                                >
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
                                    className="feather feather-trash-2"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                  </svg>
                                </button>
                              </div>
                              <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <button
                                  onClick={() =>
                                    seleccionarBitacora2(event, "Editar")
                                  }
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                                >
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
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </>
                ) : (
                  <thead>
                    <tr>
                      <td className="text-center bg-gray-100 text-gray-500 py-5">
                        No data , Loading...
                      </td>
                    </tr>
                  </thead>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalInsertar} toggle={toggle}>
        <form
          className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalHeader toggle={toggle}>
            Add Evento A Bitacora {query.id}
          </ModalHeader>
          <ModalBody>
            <div className="md:w-11/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="tipo_event_id"
              >
                Tipos Events
              </label>
              <Controller
                name="tipo_event_id"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => {
                  //console.log("CurrentSelection", currentSelection);
                  const handleSelectChange = (
                    selectedOption: tipo_event_id | null
                  ) => {
                    onChange(selectedOption?.value);
                  };
                  return (
                    <Select
                      inputRef={ref}
                      defaultValue={{ label: "Seleccione..", value: 0 }}
                      options={typeEvents1}
                      value={typeEvents1.find((c) => c.value === value)}
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
                htmlFor="events_id"
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
                  //console.log("CurrentSelection", currentSelection);
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
                htmlFor="description"
              >
                Descripcion evento
              </label>

              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <WYSIWYGEditor
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    selected={value}
                    rows={14}
                  />
                )}
              />
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
                defaultValue={bitacoraAdd.event_date}
                {...register("event_date", {
                  required: "Required",
                  minLength: 3,
                  maxLength: 41,
                })}
                onChange={(e) => handleOnChange("event_date", e.target.value)}
              />
              {errors.event_date && errors.event_date}
            </div>
            <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
              <input
                type="number"
                name="bitacora_id"
                defaultValue={query.id}
                {...register("bitacora_id", {
                  required: "Required",
                  minLength: 1,
                  maxLength: 9,
                })}
                onChange={(e) => handleOnChange("bitacora_id", e.target.value)}
              />
              {errors.id && errors.bitacora_id}
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" type="submit">
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalInsertar(false)}
            >
              No
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal
        ize="xl"
        style={{ maxWidth: "780px", width: "100%" }}
        isOpen={modalEditar}
        toggle={toggleEditar}
      >
        <ModalHeader toggle={toggleEditar}>
          Edit Events ID:
          {bitacoraSeleccionada2.id}
        </ModalHeader>
        <ModalBody>
          <BitaEventEdit
            bitacoraSeleccionada2={bitacoraSeleccionada2}
            seleccionarBitacora2={seleccionarBitacora2}
            onSubmitE={onSubmitE}
            handleOnChangeE={handleOnChangeE}
            handleOnChange={handleOnChange}
            eventId={eventId}
            typeEvents1={typeEvents1}
            eventsId={eventsId}
            setEventId={setEventId}
            handleOnChange={handleOnChange}
          />
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
      </Modal>

      <Modal isOpen={modalEliminar} toggle={toggleEliminar}>
        <ModalHeader toggle={toggleEliminar}>Eliminar Evento</ModalHeader>
        <ModalBody>
          Estás Seguro que deseas eliminar el evento{" "}
          {bitacoraSeleccionada && bitacoraSeleccionada.id}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => eliminar(bitacoraSeleccionada.id)}
          >
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

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
    </Container>
  );
};

BitaEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEvents);
