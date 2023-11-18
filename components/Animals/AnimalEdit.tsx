import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";

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

const AnimalEdit = (props: any): JSX.Element => {
  const {
    animalSeleccionada2,
    onSubmitE,
    handleOnChangeE,
    clases,
    owners,
    eventsId,
  } = props;
  console.log("animalSeleccionada2", animalSeleccionada2);
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
          defaultValue={animalSeleccionada2 && animalSeleccionada2.name}
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
          defaultValue={animalSeleccionada2 && animalSeleccionada2.birthdate}
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
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = clases.find(
              (c) => c.value === animalSeleccionada2.clase_id
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
        {errors.clase_id && (
          <p className="text-red-600 text-1xl font-bold">
            This field is required
          </p>
        )}
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
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = owners.find(
              (c) => c.value === animalSeleccionada2.owner_id
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
                  onChange(val!.value);
                  handleOnChangeE("owner_id", val!.value);
                }}
              />
            );
          }}
        />
        {errors.owner_id && (
          <p className="text-red-600 text-1xl font-bold">
            This field is required
          </p>
        )}
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
          defaultValue={animalSeleccionada2 && animalSeleccionada2.mother}
          {...register("mother", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("mother", e.target.value)}
        />
        {errors.mother && (
          <p className="text-red-600 text-1xl font-bold">
            This field is required
          </p>
        )}
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
          defaultValue={animalSeleccionada2 && animalSeleccionada2.hierro}
          {...register("hierro", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("hierro", e.target.value)}
        />
        {errors.hierro && (
          <p className="text-red-600 text-1xl font-bold">
            This field is required
          </p>
        )}
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
          defaultValue={animalSeleccionada2 && animalSeleccionada2.tipopart}
          {...register("tipopart", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("tipopart", e.target.value)}
        />
        {errors.tipopart && (
          <p className="text-red-600 text-1xl font-bold">
            This field is required
          </p>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="info"
        >
          Infos
        </label>
        <textarea
          cols={100}
          rows={6}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="info"
          defaultValue={animalSeleccionada2 && animalSeleccionada2.info}
          {...register("info", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("info", e.target.value)}
        />
        {errors.info && errors.info}
        <input
          type="hidden"
          name="id"
          defaultValue={animalSeleccionada2 && animalSeleccionada2.animal_id}
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
