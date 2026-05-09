// front_despacho/src/componentes/CrudAdmin/TableDespachos.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);
  const URL_DESPACHOS = import.meta.env.VITE_API_DESPACHOS;

  const fetchDespachos = async () => {
    try {
      const response = await axios.get(URL_DESPACHOS, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setDespachos(response.data);
    } catch (error) {
      console.error("Error al obtener despachos:", error);
    }
  };

  useEffect(() => {
    fetchDespachos();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            <table className="w-full text-sm text-center text-gray-500 rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ID Despacho</th>
                  <th scope="col" className="px-6 py-3">Fecha de Despacho</th>
                  <th scope="col" className="px-6 py-3">Patente de Camión</th>
                  <th scope="col" className="px-6 py-3">Estado</th>
                  <th scope="col" className="px-6 py-3">Intentos</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white border-b dark:border-gray-200">
                {despachos &&
                  despachos.map((despacho) => (
                    <tr key={despacho.idDespacho}>
                      <td className="pr-10 py-10 items-center">{despacho.idDespacho}</td>
                      <td className="pr-10 py-10 items-center">{despacho.fechaDespacho}</td>
                      <td className="pr-10 py-10 items-center">{despacho.patenteCamion}</td>
                      <td className="pr-10 py-10 items-center">
                        {despacho.entregado ? "Despacho entregado" : "Despacho pendiente"}
                      </td>
                      <td className="pr-10 py-10 items-center">{despacho.intento}</td>
                      <td>
                        <button
                          onClick={() => handleAbrirModal(despacho)}
                          className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300"
                        >
                          Cerrar despacho
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              fetchDespachos();
            }}
          />
        )}
      </Modal>
    </>
  );
};