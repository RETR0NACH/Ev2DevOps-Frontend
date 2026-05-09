// front_despacho/src/componentes/CrudAdmin/TableCompras.jsx

import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);
  const URL_VENTAS = import.meta.env.VITE_API_VENTAS;

  const compras = async () => {
    try {
      const response = await axios.get(URL_VENTAS, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setVentas(response.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  useEffect(() => {
    compras();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  
  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
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
                  <th scope="col" className="px-6 py-3">ID Venta</th>
                  <th scope="col" className="px-6 py-3">Dirección de Entrega</th>
                  <th scope="col" className="px-6 py-3">Fecha de Compra</th>
                  <th scope="col" className="px-6 py-3">Valor de Compra</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white border-b dark:border-gray-200">
                {ventas &&
                  ventas.map((venta) => (
                    <tr key={venta.idVenta}>
                      <td className="pr-10 py-10 items-center">{venta.idVenta}</td>
                      <td className="pr-10 py-10 items-center">{venta.direccionCompra}</td>
                      <td className="pr-10 py-10 items-center">{venta.fechaCompra}</td>
                      <td className="pr-10 py-10 items-center">${venta.valorCompra}</td>
                      <td>
                        <button
                          onClick={() => handleAbrirModal(venta)}
                          className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300"
                        >
                          Generar Despacho
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
        {ventaSeleccionada && (
          <FormDespacho
            venta={ventaSeleccionada}
            onClose={() => {
              setOpenModal(false);
              compras();
            }}
          />
        )}
      </Modal>
    </>
  );
};