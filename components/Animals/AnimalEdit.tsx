import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";

type Inputs = {
  id: number;
  author_id: number;
  bitacora_date: string;
};

const AnimalEdit = (props: any): JSX.Element => {
  const {
    bitacoraSeleccionada2,
    onSubmitE,
    handleOnChangeE,
    handleOnChange,
    clases,
    owners,
    eventsId,
    setOwners,
    setClases,
  } = props;
  console.log("bitacoraSeleccionada2", bitacoraSeleccionada2);
  console.log("Clases", clases);
  console.log("EventsId", eventsId);
  console.log("Owners", owners);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const validate = (selected) => {
    selected === "" || "You must be at least 18 years old";
    console.log("eleccionado", selected);
  };

  return (
    <form
      className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
      onSubmit={handleSubmit(onSubmitE)}
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
          defaultValue={bitacoraSeleccionada2 && bitacoraSeleccionada2.name}
          {...register("name", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("name", e.target.value)}
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
          defaultValue={
            bitacoraSeleccionada2 && bitacoraSeleccionada2.birthdate
          }
          {...register("birthdate", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("birthdate", e.target.value)}
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
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = clases.find(
              (c) => c.value === bitacoraSeleccionada2.clase_id
            );
            console.log("CurrentSelection", currentSelection);
            const handleSelectChange = (selectedOption: clase_id | null) => {
              onChange(selectedOption?.value);
            };
            return (
              <Select
                inputRef={ref}
                options={clases}
                defaultValue={currentSelection}
                name={name}
                onChange={(val) => {
                  onChange(val.value);
                  handleOnChangeE("clase_id", val.value);
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
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = owners.find(
              (c) => c.value === bitacoraSeleccionada2.owner_id
            );
            console.log("CurrentSelection", currentSelection);
            const handleSelectChange = (selectedOption: owner_id | null) => {
              onChange(selectedOption?.value);
            };
            return (
              <Select
                inputRef={ref}
                options={owners}
                defaultValue={currentSelection}
                name={name}
                onChange={(val) => {
                  onChange(val.value);
                  handleOnChangeE("owner_id", val.value);
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
          defaultValue={bitacoraSeleccionada2 && bitacoraSeleccionada2.mother}
          {...register("mother", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("mother", e.target.value)}
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
          defaultValue={bitacoraSeleccionada2 && bitacoraSeleccionada2.hierro}
          {...register("hierro", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("hierro", e.target.value)}
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
          defaultValue={bitacoraSeleccionada2 && bitacoraSeleccionada2.tipopart}
          {...register("tipopart", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("tipopart", e.target.value)}
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
          defaultValue={bitacoraSeleccionada2 && bitacoraSeleccionada2.info}
          {...register("info", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("info", e.target.value)}
        />
        {errors.info && errors.info}
        <input
          type="hidden"
          name="id"
          defaultValue={
            bitacoraSeleccionada2 && bitacoraSeleccionada2.bitacora_id
          }
          {...register("id", {
            required: "Required",
            minLength: 3,
            maxLength: 41,
          })}
        ></input>
      </div>
    </form>
  );
};

export default AnimalEdit;
