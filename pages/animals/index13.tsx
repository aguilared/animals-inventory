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
  alive: string;
  birthdate: string;
  clase_id: number;
  hierro: string;
  id: number;
  info: string;
  mother: string;
  name: string;
  owner_id: number;
  tipopart: string;
  updated_at: string;
};

interface IFormInput {
  alive: string;
  birthdate: string;
  clase_id: { label: string; value: string };
  hierro: string;
  id: number;
  info: string;
  mother: string;
  name: string;
  owner_id: { label: string; value: string };
  tipopart: string;
}

type CredentialInputs = {
  username: string;
  password: string;
};

const dateAnimal = new Date();

const convertDate = (dateTo: any) => {
  return dayjs(dateTo).format("DD-MM-YYYY");
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
  const {
    status,
    data: animals,
    error,
    isLoading,
    refetch,
  } = useQuery("Animalss", async () => {
    const res = await axios.get(`${DATABASEURL}animals`);
    return res.data;
  });
  console.log("DATA", animals);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CredentialInputs>();

  const onSubmit: SubmitHandler<CredentialInputs> = (data) =>
    console.log("Datass", data);
  const onSubmitError: SubmitHandler<CredentialInputs> = (data) =>
    console.log("ErrorData", data);

  console.log(watch("username"));

  const validate = (selected) => {
    selected === "" || "You must be at least 18 years old";
    console.log("eleccionado", selected);
  };

  const [animalAdd, setAnimalAdd] = useState({
    alive: "Si",
    birthdate: convertDate1(dateAnimal),
    clase_id: 1,
    hierro: "Si ..",
    info: "Color ..., Cachos. ...",
    mother: "No info",
    name: "",
    owner_id: 1,
    tipopart: "Normal",
  });

  const [animalE, setAnimalE] = useState({
    alive: "",
    birthdate: convertDate1(dateAnimal),
    clase_id: 1,
    hierro: "",
    id: "",
    info: "",
    mother: "",
    name: "",
    owner_id: 1,
    tipopart: "",
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

  const [animalSeleccionada, setAnimalSeleccionada] = useState({
    id: "",
    alive: "",
    birthdate: "",
    clase_id: "",
    hierro: "",
    info: "",
    mother: "",
    name: "",
    owner_id: "",
    tipopart: "",
    updated_at: "",
  });
  // to viewAnimal
  const [animalSeleccionada1, setAnimalSeleccionada1] = useState({
    id: "",
    description: "",
    updated_at: "",
  });
  const [animalSeleccionada2, setAnimalSeleccionada2] = useState({
    id: "",
    alive: "",
    birthdate: "",
    clase_id: "",
    hierro: "",
    info: "",
    mother: "",
    name: "",
    owner_id: "",
    tipopart: "",
    updated_at: "",
  });

  const seleccionarAnimal = (elemento, caso) => {
    setAnimalSeleccionada(elemento);
    console.log("ELEMENTO Eliminar o Editar", elemento);
    console.log("CASO Eliminar o Editar", caso);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // to viewHist
  const seleccionarAnimal1 = (elemento, caso) => {
    setAnimalSeleccionada1(elemento);
    console.log("ELEMENTOTO VIEW", elemento);
    console.log("CASO", caso);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };
  // to editar
  const seleccionarAnimal2 = (elemento, caso) => {
    setAnimalSeleccionada2(elemento);
    console.log("ELEMENTO", elemento);
    setAnimalE({
      ...animalE,
      birthdate: elemento.birthdate,
      clase_id: elemento.clase_id,
      hierro: elemento.hierro,
      id: elemento.id,
      updated_at: elemento.updated_at,
      info: elemento.info,
      mother: elemento.mother,
      name: elemento.name,
      owner_id: elemento.owner_id,
      tipopart: elemento.tipopart,
    });
    console.log("AnimalE", animalE);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const abrirModalSearchs = () => {
    console.log("el search animal", animalE);
    setModalSearchs(true);
  };

  const handleSearchOnChange = (e) => {
    console.log("value", e.target.value);
    setAnimalAdd(e.target.value);
  };

  const handleOnChange = (animalKey, value) => {
    console.log("valueOnChangeAdd", value);
    setAnimalAdd({ ...animalAdd, [animalKey]: value });
    console.log("SETanimalAdd", animalAdd);
  };
  const handleOnChangeE = (animalKey, value) => {
    console.log("valueOnChangeEditar", value);
    setAnimalE({ ...animalE, [animalKey]: value });
    console.log("animalOnchageE", animalE);
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

  const onSubmit11: SubmitHandler<IFormInput> = (data) => {
    console.log("FormData", data);
    const parsedata = {
      birthdate: animalAdd.birthdate,
      clase_id: Number(animalAdd.clase_id),
      hierro: animalAdd.hierro,
      info: animalAdd.info,
      mother: animalAdd.mother,
      name: animalAdd.name,
      owner_id: Number(animalAdd.owner_id),
      tipopart: animalAdd.tipopart,
    };
    console.log("parsedata", parsedata);
  };

  const onSubmit3 = (data: Inputs) => {
    alert(JSON.stringify(data));
  };

  const onSubmitAdd: SubmitHandler<IFormInput> = async (data) => {
    console.log("FormData", data);
    const parsedata = {
      alive: data.alive,
      birthdate: data.birthdate,
      clase_id: Number(data.clase_id),
      hierro: data.hierro,
      info: data.info,
      mother: data.mother,
      name: data.name,
      owner_id: Number(data.owner_id),
      tipopart: data.tipopart,
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
    console.log("FormDataEdit", animalE);
    const parsedata = {
      alive: animalE.alive,
      birthdate: animalE.birthdate,
      clase_id: Number(animalE.clase_id),
      hierro: animalE.hierro,
      id: Number(animalE.id),
      info: animalE.info,
      mother: animalE.mother,
      name: animalE.name,
      owner_id: Number(animalE.owner_id),
      tipopart: animalE.tipopart,
    };
    try {
      //await editAnimal(data);
      const result = await fetch("/api/animals/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedata),
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
        "/api/animals/delete/" + animalSeleccionada.id
      );
      // await removeAnimal(animalSeleccionada.id);
      refetch();
      setModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonAddAnimal = forwardRef(({ onClick, href }, ref) => (
    <button
      className="bg-blue-300 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      // onClick={handleClickAddAnimal}
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
            <form onSubmit={handleSubmit(onSubmit)} name="frmsearch">
              <div>
                <input
                  className="rounded py-2 px-4"
                  type="text"
                  placeholder="Search"
                  defaultValue=""
                  {...register("search", {
                    required: true,
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
            <ButtonAddAnimal />
          </div>
        </div>
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        {animals && animals.length > 0
          ? animals.map((animal: any) => (
              <div
                className="flex rounded items-left bg-gray-100 mb-1 shadow"
                key={animal.id}
              >
                <div className="w-4/5 inline-block text-gray-700 text-left px-1 py-0 m-0">
                  ID= {animal.id} &nbsp;
                  <IconButton
                    onClick={() => seleccionarAnimal1(animal, "Mostrar")}
                  >
                    <StreetviewRoundedIcon fontSize="small" />
                  </IconButton>{" "}
                  <a
                    href={"/static/images/" + `${animal.id}` + ".jpg"}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <Image
                      onClick={() => seleccionarAnimal1(animal, "Mostrar")}
                      src={"/static/images/" + `${animal.id}` + ".jpg"}
                      alt="my Image"
                      width="112"
                      height="88"
                    />
                  </a>
                  {animal.clase.description}&nbsp;
                  {animal.name}, &nbsp; Dueno=
                  {animal.owner.name}, &nbsp; Nacimiento=
                  {convertDate(animal.birthdate)} &nbsp;{" "}
                </div>

                <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                  <button
                    onClick={() => seleccionarAnimal(animal, "Eliminar")}
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
                    onClick={() => seleccionarAnimal2(animal, "Editar")}
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
              </div>
            ))
          : null}

        <Modal isOpen={modalInsertar} toggle={toggle}>
          <form onSubmit={handleSubmit(onSubmit)} name="frmadd">
            <input
              defaultValue="test"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-600 text-1xl font-bold">
                This field is required
              </p>
            )}
            <input
              {...register("password", { required: true })}
              type="password"
            />
            {errors.password && (
              <p className="text-red-600 text-1xl font-bold">
                This field is required
              </p>
            )}
            username
            <input type="submit" />
          </form>
        </Modal>

        <Modal isOpen={modalEditar} toggle={toggleEditar}>
          <ModalHeader toggle={toggleEditar}>
            Animal ID: {animalSeleccionada2 && animalSeleccionada2.id}
          </ModalHeader>
          <ModalBody>
            <AnimalEdit
              animalSeleccionada2={animalSeleccionada2}
              onSubmitE={onSubmitE}
              handleOnChangeE={handleOnChangeE}
              owners={owners}
              clases={clases}
            />
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
            {animalSeleccionada && animalSeleccionada.id}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => eliminar(animalSeleccionada.id)}
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
