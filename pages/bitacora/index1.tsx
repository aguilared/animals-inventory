import React, {
  useState,
  useContext,
  forwardRef,
  BaseSyntheticEvent,
} from "react";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import StreetviewRoundedIcon from "@material-ui/icons/StreetviewRounded";
import { useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import dayjs from "dayjs";
import SearchH from "../../components/SearchH";
import BitacoraView from "../../components/Bitacoras/BitacoraView";
import BitacoraEdit from "../../components/Bitacoras/BitacoraEdit";
import Container from "../../components/Container";
import { GlobalContext, GlobalProvider } from "../../context/GlobalState";
import { EventsContext, EventsProvider } from "../../context/EventState";
import useBitacora from "../../hooks/useBitacora";
import getBitacoraTop from "../../services/getBitacoraTop";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import router from "next/router";

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
  author_id: number;
  bitacora_date: string;
};
const BitacorasList = (): JSX.Element => {
  const {
    bitacoras1,
    addBitacora,
    editBitacora,
    removeBitacora,
    bitacoraIdAdd,
    loading,
    bitacoraNew,
  } = useContext(GlobalContext);
  const { clearBitaEvents } = useContext(EventsContext);
  const { isBitacora, bitacora, clearBitacora } = useBitacora(); //to Global
  //console.log("IsBitacora?", isBitacora, " ID", bitacora);

  const [intervalMs, setIntervalMs] = useState(4000);

  const dateBitacora = new Date();

  const { status, data, error, isLoading, refetch } = useQuery(
    "bitacoras",
    async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}bitacora`);
      console.log("DATA1", res);
      return res.data;
    }
  );

  if (isBitacora) {
    clearBitacora(); //
    clearBitaEvents();
    //refetch();
  }

  const convertDate = (dateTo: any) => {
    const d = dayjs(dateTo).format("DD-MM-YYYY");
    return d;
  };
  const convertDate1 = (dateTo: any) => {
    const d = dayjs(dateTo).format("YYYY/MM/DD hh:mm");
    return d;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [bitacoraAdd, setBitacoraAdd] = useState({
    author_id: 1,
    bitacora_date: convertDate1(dateBitacora),
  });
  const [bitacoraE, setBitacoraE] = useState({
    id: 1,
    author_id: 1,
    bitacora_date: "2022-01-03 11:07",
  });

  const [topId, setTopId] = useState(0);
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
    author_id: "",
    bitacora_date: "",
  });
  // to viewBitacora
  const [bitacoraSeleccionada1, setBitacoraSeleccionada1] = useState({
    id: "",
    author_id: "",
    bitacora_date: "",
  });
  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    author_id: "",
    bitacora_date: "",
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
    setBitacoraE({
      ...bitacoraE,
      id: elemento.id,
      author_id: elemento.author_id,
      bitacora_date: elemento.bitacora_date,
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

  const onSubmit = async (e: BaseSyntheticEvent) => {
    try {
      const bitaid = await addBitacora(bitacoraAdd);
      refetch();
      router.push(`/bitacora/bita_events/${encodeURIComponent(bitaid)}`);

      setModalInsertar(false);
    } catch (err) {
      console.log(err);
    }
  };

  const eliminar = async (e: BaseSyntheticEvent) => {
    try {
      console.log("Entra a Borrar");
      await removeBitacora(bitacoraSeleccionada.id);
      refetch();
      setModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeE = (bitacoraKey, value) => {
    console.log("valueOnChangeEditar", value);
    setBitacoraE({ ...bitacoraE, [bitacoraKey]: value });
    console.log("bitacoraOnchageE", bitacoraE);
  };

  const onSubmitE = async (e: BaseSyntheticEvent) => {
    try {
      const data = {
        id: bitacoraE.id,
        author_id: bitacoraE.author_id,
        bitacora_date: bitacoraE.bitacora_date,
      };
      console.log("DATA TO SAVE1", data);

      await editBitacora(data);
      refetch();
      setModalEditar(false);
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

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="flex rounded items-center justify-between flex-wrap bg-gray-500 p-2">
          <div className="flex-grow text-left text-gray-100 px-3 py-1 m-2 ">
            {" Admin Bitacoras"}
          </div>
          <div className="flex-grow text-left px-3 py-1 m-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  className="rounded py-2 px-4"
                  type="text"
                  placeholder="Search"
                  name="search"
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
                  ({bitacora._count.bita_events})&nbsp;
                  <IconButton
                    onClick={() => seleccionarBitacora1(bitacora, "Mostrar")}
                  >
                    <StreetviewRoundedIcon fontSize="small" />
                  </IconButton>{" "}
                  {bitacora.id} &nbsp;
                  {convertDate(bitacora.bitacora_date)} &nbsp;
                  {bitacora.author.name} &nbsp;
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

        <Modal isOpen={modalSearchs} toggle={toggle}>
          <ModalHeader toggle={toggleSearchs}>
            Searchs = {bitacora}{" "}
          </ModalHeader>
          <ModalBody>
            <SearchH search={bitacora} />
          </ModalBody>
        </Modal>

        <Modal isOpen={modalInsertar} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Bitacora</ModalHeader>
          <ModalBody>
            <form
              className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="author_id"
                >
                  Author
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="number"
                  placeholder="Gonzalez"
                  name="author_id"
                  defaultValue={bitacoraAdd.author_id}
                  {...register("author_id", {
                    required: "Required",
                    minLength: 1,
                    maxLength: 9,
                  })}
                  onChange={(e) => handleOnChange("author_id", e.target.value)}
                />
                {errors.author_id && errors.author_id}
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="bitacora_date"
                >
                  Fecha Bitacora
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  type="text"
                  placeholder="Gonzalez"
                  name="bitacora_date"
                  defaultValue={bitacoraAdd.bitacora_date}
                  {...register("bitacora_date", {
                    required: "Required",
                    minLength: 3,
                    maxLength: 41,
                  })}
                  onChange={(e) =>
                    handleOnChange("bitacora_date", e.target.value)
                  }
                />
                {errors.bitacora_date && errors.bitacora_date}
              </div>
              <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
                Hello
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
            Edit Bitacora ID:{" "}
            {bitacoraSeleccionada2 && bitacoraSeleccionada2.id}
          </ModalHeader>
          <ModalBody>
            <BitacoraEdit
              bitacoraSelected2={bitacoraSeleccionada2}
              onSubmitE={onSubmitE}
              handleOnChangeE={handleOnChangeE}
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

        <Modal
          size="xl"
          style={{ maxWidth: "980px", width: "100%" }}
          isOpen={modalViewHist}
          toggle={toggleViewHist}
        >
          <ModalHeader toggle={toggleViewHist} />
          <ModalBody>
            <BitacoraView bitacoraSelected={bitacoraSeleccionada1} />;
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

        <Modal isOpen={modalEliminar} toggle={toggleEliminar}>
          <ModalHeader toggle={toggleEliminar}>Eliminar Bitacora</ModalHeader>
          <ModalBody>
            Estás Seguro que deseas eliminar la Bitacora{" "}
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

export default BitacorasList;
