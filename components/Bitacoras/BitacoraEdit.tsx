import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

type Inputs = {
  id: number;
  author_id: number;
  bitacora_date: string;
};

const BitacoraEdit = (props: any): JSX.Element => {
  const { bitacoraSelected2, onSubmitE, handleOnChangeE } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [bitacoraE, setBitacoraE] = useState({
    id: 1,
    author_id: 1,
    bitacora_date: "2022-01-03 11:07",
  });
  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    author_id: "",
    bitacora_date: "",
  });

  return (
    <form
      name="edit"
      className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
      onSubmit={handleSubmit(onSubmitE)}
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
          defaultValue={bitacoraSelected2 && bitacoraSelected2.author_id}
          {...register("author_id", {
            required: "Required",
            minLength: 1,
            maxLength: 9,
          })}
          onChange={(e) => handleOnChangeE("author_id", e.target.value)}
        />
        {errors.author_id && errors.author_id.author_id}
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
          defaultValue={bitacoraSelected2 && bitacoraSelected2.bitacora_date}
          {...register("bitacora_date", {
            required: "Required",
            minLength: 3,
            maxLength: 41,
          })}
          onChange={(e) => handleOnChangeE("bitacora_date", e.target.value)}
        />
        {errors.bitacora_date && errors.bitacora_date.bitacora_date}
      </div>
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
          placeholder="Gonzalez"
          name="id"
          defaultValue={bitacoraSelected2 && bitacoraSelected2.id}
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
  );
};

export default BitacoraEdit;
