import React, { useState, forwardRef, BaseSyntheticEvent } from "react";
import Select from "react-select";
import Link from "next/link";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import StreetviewRoundedIcon from "@material-ui/icons/StreetviewRounded";
import Container from "../../components/Container";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useOwners } from "../../hooks/useOwners";
import { useClases } from "../../hooks/useClases";
import AnimalEdit from "../../components/animals/AnimalEdit";

const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;

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

type Inputs = {
  id: number;
  description: string;
  updated_at: string;
};

const dateBitacora = new Date();

const convertDate = (dateTo: any) => {
  const d = dayjs(dateTo).format("DD-MM-YYYY");
  return d;
};
const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

const Animals = (): JSX.Element => {
  const { owners } = useOwners();
  const { clases } = useClases();
  console.log(owners);
  console.log(clases);
  const [eventId, setEventId] = useState("");
  const [eventId1, setEventId1] = useState("");

  const [intervalMs, setIntervalMs] = useState(4000);
  const { status, data, error, isLoading, refetch } = useQuery(
    "Animalss",
    async () => {
      const res = await axios.get(`${DATABASEURL}animals`);
      return res.data;
    }
  );
  console.log("DATA", data);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const validate = (selected) => {
    selected === "" || "You must be at least 18 years old";
    console.log("eleccionado", selected);
  };

  const [bitacoraAdd, setBitacoraAdd] = useState({
    alive: "Si",
    birthdate: convertDate1(dateBitacora),
    clase_id: 1,
    hierro: "Si",
    info: "Hierro ... y .. Color ..., Cachos. ...",
    mother: "",
    name: "",
    owner_id: 1,
    tipopart: "Normal",
  });

  const [bitacoraE, setBitacoraE] = useState({
    alive: "",
    birthdate: "",
    clase_id: 1,
    hierro: "",
    info: "",
    mother: "",
    name: "",
    owner_id: 1,
    tipopart: "",
    info: "Color ..., Cachos...",
    updated_at: "2022-01-03 11:07",
  });

  const [modalSearchs, setModalSearchs] = useState(false);
  const [modalViewHist, setModalViewHist] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const toggleSearchs = () => setModalSearchs(!modalSearchs);
  const toggleViewHist = () => setModalViewHist(!modalViewHist);
  const toggle = () => setModalInsertar(!modalInsertar);
  const toggleEliminar = () => setModalEliminar(!modalEliminar);
  const toggleEditar = () => setModalEditar(!modalEditar);

  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState({
    id: "",
    description: "",
    updated_at: "",
  });
  // to viewBitacora
  const [bitacoraSeleccionada1, setBitacoraSeleccionada1] = useState({
    id: "",
    description: "",
    updated_at: "",
  });
  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    description: "",
    updated_at: "",
  });

  const seleccionarBitacora = (elemento, caso) => {
    setBitacoraSeleccionada(elemento);
    console.log("ELEMENTO Eliminar o Editar", elemento);
    console.log("CASO Eliminar o Editar", caso);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // to viewHist
  const seleccionarBitacora1 = (elemento, caso) => {
    setBitacoraSeleccionada1(elemento);
    console.log("ELEMENTO", elemento);
    console.log("CASO", caso);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };
  // to editar
  const seleccionarBitacora2 = (elemento, caso) => {
    setBitacoraSeleccionada2(elemento);
    console.log("ELEMENTO", elemento);
    setBitacoraE({
      ...bitacoraE,
      id: elemento.id,
      description: elemento.description,
      updated_at: elemento.updated_at,
    });
    console.log("BITACORAE", bitacoraE);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const abrirModalSearchs = () => {
    console.log("el search bitacora", bitacora);
    setModalSearchs(true);
  };

  const handleSearchOnChange = (e) => {
    console.log("value", e.target.value);
    setBitacoraAdd(e.target.value);
  };

  const handleOnChange = (bitacoraKey, value) => {
    console.log("valueOnChangeAdd", value);
    setBitacoraAdd({ ...bitacoraAdd, [bitacoraKey]: value });
    console.log("SETbitacoraAdd", bitacoraAdd);
  };
  const handleOnChangeE = (bitacoraKey, value) => {
    console.log("valueOnChangeEditar", value);
    setBitacoraE({ ...bitacoraE, [bitacoraKey]: value });
    console.log("bitacoraOnchageE", bitacoraE);
  };
  const resetForm = () => {
    reset(); // will reset the entire form :)
    setModalEditar(false);
  };
  const resetForm1 = () => {
    reset(); // will reset the entire form :)
    reset({
      description: "",
      updated_at: "",
    });
    setModalEditar(false);
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    console.log("FormData", bitacoraAdd);
    const parsedata = {
      alive: bitacoraAdd.alive,
      birthdate: bitacoraAdd.birthdate,
      clase_id: Number(bitacoraAdd.clase_id),
      hierro: bitacoraAdd.hierro,
      info: bitacoraAdd.info,
      mother: bitacoraAdd.mother,
      name: bitacoraAdd.name,
      owner_id: Number(bitacoraAdd.owner_id),
      tipopart: bitacoraAdd.tipopart,
    };
    try {
      await fetch("/api/animals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedata),
      });
      refetch();
      setModalInsertar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitE = async (e: BaseSyntheticEvent) => {
    const dataE = {
      id: bitacoraE.id,
      description: bitacoraE.description,
      updated_at: bitacoraE.updated_at,
    };
    try {
      //await editBitacora(data);
      const result = await fetch("/api/tipoEvents/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataE),
      });
      refetch();
      setModalEditar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (e: BaseSyntheticEvent) => {
    try {
      console.log("Entra a Borrar");
      const result = await fetch(
        "/api/animals/delete/" + bitacoraSeleccionada.id
      );
      // await removeBitacora(bitacoraSeleccionada.id);
      refetch();
      setModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonAddBitacora = forwardRef(({ onClick, href }, ref) => (
    <button
      className="bg-blue-300 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      // onClick={handleClickAddBitacora}
      onClick={() => abrirModalInsertar()}
      ref={ref}
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
        className="feather feather-plus-circle"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      Add
    </button>
  ));
  2;

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="flex rounded items-center justify-between flex-wrap bg-gray-500 p-2">
          <div className="flex-grow text-left text-gray-100 px-3 py-1 m-2 ">
            {"Admin Animals"}
          </div>
          <div className="flex-grow text-left px-3 py-1 m-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  className="rounded py-2 px-4"
                  type="text"
                  placeholder="Search"
                  defaultValue=""
                  {...register("search", {
                    required: "Required",
                    minLength: 3,
                    maxLength: 41,
                  })}
                  onChange={handleSearchOnChange}
                />
                {errors.search && errors.search.search}
                <button
                  type="submit"
                  onClick={() => abrirModalSearchs()}
                  className="absolute w-10 h-10 rounded-full inline p-2 shadow"
                >
                  {" "}
                  <svg
                    className="text-gray-100 w-6 h-6 fill-current"
                    viewBox="0 0 56.966 56.966"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="flex-grow text-right px-3 py-1 m-2">
            <ButtonAddBitacora />
          </div>
        </div>
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        {data && data.length > 0
          ? data.map((bitacora: any) => (
              <div
                className="flex rounded items-left bg-gray-100 mb-1 shadow"
                key={bitacora.id}
              >
                <div className="w-4/5 inline-block text-gray-700 text-left px-1 py-0 m-0">
                  <IconButton
                    onClick={() => seleccionarBitacora1(bitacora, "Mostrar")}
                  >
                    <StreetviewRoundedIcon fontSize="small" />
                  </IconButton>{" "}
                  <a
                    href={"/static/images/" + `${bitacora.id}` + ".jpg"}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <Image
                      onClick={() => seleccionarBitacora1(bitacora, "Mostrar")}
                      src={"/static/images/" + `${bitacora.id}` + ".jpg"}
                      alt="my Image"
                      width="112"
                      height="88"
                    />
                  </a>
                  ID= {bitacora.id} &nbsp; Nombre= {bitacora.name}, &nbsp;
                  Dueno=
                  {bitacora.owner.name}, &nbsp; Nacimiento=
                  {convertDate(bitacora.birthdate)} &nbsp;
                </div>

                <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                  <button
                    onClick={() => seleccionarBitacora(bitacora, "Eliminar")}
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
                    onClick={() => seleccionarBitacora2(bitacora, "Editar")}
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

                <div className="w-1/5 inline-block text-gray-700 text-right px-1 py-1 m-0">
                  <Link
                    href={`/bitacora/bita_events/${encodeURIComponent(
                      bitacora.id
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
                        <path
                          clipRule="evenodd"
                          d="M0 0h24v24H0z"
                          fill="none"
                        />
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))
          : null}

        <Modal isOpen={modalInsertar} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Animals</ModalHeader>
          <ModalBody>
            <form
              className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="Name"
                  defaultValue={bitacoraAdd.name}
                  {...register("name", {
                    required: "Required",
                  })}
                  onChange={(e) => handleOnChange("name", e.target.value)}
                />
                {errors.name && errors.name}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="birthdate"
                >
                  Nacimiento
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="birthdate"
                  defaultValue={bitacoraAdd.birthdate}
                  {...register("birthdate", {
                    required: "Required",
                  })}
                  onChange={(e) => handleOnChange("birthdate", e.target.value)}
                />
                {errors.birthdate && errors.birthdate}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="clase_id"
                >
                  Clase Animal
                </label>
                <Controller
                  name="clase_id"
                  control={control}
                  rules={{ validate }}
                  render={({ field: { onChange, value, name, ref } }) => {
                    const handleSelectChange = (
                      selectedOption: tipo_event_id | null
                    ) => {
                      onChange(selectedOption?.value);
                    };
                    return (
                      <Select
                        inputRef={ref}
                        defaultValue={{ label: "Seleccione..", value: 0 }}
                        options={clases}
                        value={clases.find((c) => c.value === value)}
                        name={name}
                        onChange={(val) => {
                          onChange(val.value);
                          setEventId(val.value);
                          handleOnChange("clase_id", val.value);
                        }}
                      />
                    );
                  }}
                />
                {errors.clase_id && <p>This field is required</p>}{" "}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="owner_id"
                >
                  Dueno
                </label>
                <Controller
                  name="owner_id"
                  control={control}
                  rules={{ validate }}
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
                        options={owners}
                        value={owners.find((c) => c.value === value)}
                        name={name}
                        onChange={(val) => {
                          onChange(val.value);
                          setEventId(val.value);
                          handleOnChange("owner_id", val.value);
                        }}
                      />
                    );
                  }}
                />
                {errors.owner_id && <p>This field is required</p>}{" "}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="mother"
                >
                  Madre
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="mother"
                  defaultValue={bitacoraAdd.mother}
                  {...register("mother", {
                    required: "Required",
                  })}
                  onChange={(e) => handleOnChange("mother", e.target.value)}
                />
                {errors.mother && errors.mother}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="hierro"
                >
                  Hierro
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="hierro"
                  defaultValue={bitacoraAdd.hierro}
                  {...register("hierro", {
                    required: "Required",
                  })}
                  onChange={(e) => handleOnChange("hierro", e.target.value)}
                />
                {errors.hierro && errors.hierro}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="tipopart"
                >
                  Tipo parto
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="tipopart"
                  defaultValue={bitacoraAdd.tipopart}
                  {...register("tipopart", {
                    required: "Required",
                  })}
                  onChange={(e) => handleOnChange("tipopart", e.target.value)}
                />
                {errors.tipopart && errors.tipopart}
              </div>

              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="info"
                >
                  Infos
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="info"
                  defaultValue={bitacoraAdd.info}
                  {...register("info", {
                    required: "Required",
                  })}
                  onChange={(e) => handleOnChange("info", e.target.value)}
                />
                {errors.info && errors.info}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => onSubmit()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalInsertar(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar} toggle={toggleEditar}>
          <ModalHeader toggle={toggleEditar}>
            Tipo Event ID: {bitacoraSeleccionada2 && bitacoraSeleccionada2.id}
          </ModalHeader>
          <ModalBody>
            <form
              name="editForm"
              className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
              onSubmit={handleSubmit(onSubmitE)}
            >
              <div className="md:w-1/2 px-3 mb-6 md:mb-1">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                  htmlFor="description"
                >
                  Tipo Event
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  placeholder="TipoEvento"
                  defaultValue={
                    bitacoraSeleccionada2 && bitacoraSeleccionada2.description
                  }
                  {...register("description", {
                    required: true,
                  })}
                  onChange={(e) =>
                    handleOnChangeE("description", e.target.value)
                  }
                />
                {errors.description && <p>This is required</p>}
              </div>

              <div className="md:w-1/2 px-3 mb-6 md:mb-1">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                  htmlFor="updated_at"
                >
                  Fecha Tipo Event
                </label>
                <input
                  className="appearance-none block w-full border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  placeholder="fechaUpdated"
                  defaultValue={
                    bitacoraSeleccionada2 && bitacoraSeleccionada2.updated_at
                  }
                  {...register("updated_at", {
                    required: true,
                  })}
                  onChange={(e) =>
                    handleOnChangeE("updated_at", e.target.value)
                  }
                />
                {errors.updated_at && errors.updated_at.updated_at}
              </div>
              <div className="md:w-1/2  px-3 mb-6 md:mb-1">
                <button
                  type="reset"
                  onClick={() => reset()}
                  className="btn btn-secondary"
                >
                  Reset
                </button>
              </div>
              <input
                style={{ display: "block", marginTop: 20 }}
                type="reset"
                value="Standard Reset Field Values"
              />

              <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="id"
                >
                  ID
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="number"
                  defaultValue={
                    bitacoraSeleccionada2 && bitacoraSeleccionada2.id
                  }
                  {...register("id", {
                    required: "Required",
                    minLength: 1,
                    maxLength: 9,
                  })}
                  onChange={(e) => handleOnChangeE("id", e.target.value)}
                />
                {errors.id && errors.id.id}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => onSubmitE()}>
              Sí
            </button>
            <button className="btn btn-secondary" onClick={() => resetForm()}>
              No
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          size="xl"
          style={{ maxWidth: "980px", width: "100%" }}
          isOpen={modalViewHist}
          toggle={toggleViewHist}
        >
          <ModalHeader toggle={toggleViewHist} />
          <ModalBody></ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary"
              onClick={() => setModalViewHist(false)}
            >
              Cerrar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar} toggle={toggleEliminar}>
          <ModalHeader toggle={toggleEliminar}>Eliminar tipoEvent</ModalHeader>
          <ModalBody>
            Estás Seguro que deseas eliminar la tipoEvent{" "}
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
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </Container>
  );
};

export default Animals;
