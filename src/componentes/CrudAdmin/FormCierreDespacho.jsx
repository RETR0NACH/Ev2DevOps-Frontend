// front_despacho/src/componentes/CrudAdmin/FormCierreDespacho.jsx

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  const { register, handleSubmit } = useForm();

  // Inyección de variable de entorno
  const URL_DESPACHOS = import.meta.env.VITE_API_DESPACHOS;

  const onSubmit = async (data) => {
    const jsonData = {
      intento: data.intento,
      despachado: data.despachado,
    };

    try {
      await axios.put(`${URL_DESPACHOS}/${despacho.idDespacho}`, jsonData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      Swal.fire({
        title: "Despacho modificado 🛻!",
        text: "El despacho ha sido modificado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el despacho.",
        icon: "error",
      });
    }
    onClose();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Editar y cierre de despacho
        </div>

        <div className="mb-5">
          <label className="block font-bold mb-2">Intentos de despacho</label>
          <input
            type="number"
            min={0}
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("intento", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Estado del despacho</label>
          <select
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("despachado", { required: true })}
          >
            <option value={false}>Despacho abierto</option>
            <option value={true}>Cerrar despacho</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">ID Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
            value={despacho.idCompra}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
            value={despacho.direccionCompra}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Valor Compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
            disabled={true}
            value={despacho.valorCompra}
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14 mt-10 hover:bg-teal-700 transition-all duration-300"
          type="submit"
        >
          Editar despacho
        </button>
      </form>
    </>
  );
};
