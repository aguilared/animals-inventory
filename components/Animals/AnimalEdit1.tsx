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
    typeEvents1,
    eventId,
    eventsId,
    setEventId,
  } = props;
  console.log("bitacoraSeleccionada2", bitacoraSeleccionada2);
  console.log("typeEvents1", typeEvents1);
  console.log("EventsId", eventsId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form
      name="edit"
      className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
      onSubmit={handleSubmit(onSubmitE)}
    >
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
              (c) => c.value === bitacoraSeleccionada2.tipo_event_id
            );
            console.log("CurrentSelection", currentSelection);
            const handleSelectChange = (
              selectedOption: tipo_event_id | null
            ) => {
              onChange(selectedOption?.value);
            };
            return (
              <Select
                inputRef={ref}
                options={typeEvents1}
                defaultValue={currentSelection}
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
            const currentSelection3 = eventsId.find(
              (c) => c.value === bitacoraSeleccionada2.events_id
            );
            return (
              <Select
                inputRef={ref}
                options={eventsId}
                defaultValue={currentSelection3}
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
          rows={8}
          defaultValue={
            bitacoraSeleccionada2 && bitacoraSeleccionada2.description
          }
          {...register("description", {
            required: "Required",
            minLength: 1,
            maxLength: 300,
          })}
          onChange={(e) => handleOnChangeE("description", e.target.value)}
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
          placeholder="Date Event"
          name="event_date"
          defaultValue={
            bitacoraSeleccionada2 && bitacoraSeleccionada2.event_date
          }
          {...register("event_date", {
            required: "Required",
            minLength: 3,
            maxLength: 41,
          })}
          onChange={(e) => handleOnChangeE("event_date", e.target.value)}
        />
        {errors.event_date && errors.event_date}
      </div>
      <input
        type="hidden"
        name="bitacora_id"
        defaultValue={
          bitacoraSeleccionada2 && bitacoraSeleccionada2.bitacora_id
        }
        {...register("bitacora_id", {
          required: "Required",
          minLength: 3,
          maxLength: 41,
        })}
      ></input>
    </form>
  );
};

export default AnimalEdit;
