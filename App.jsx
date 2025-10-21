import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function App() {
  const [data, setData] = useState({
    equipo: "",
    marca: "",
    modelo: "",
    serie: "",
    color: "",
    nombre: "",
    apellido: "",
    dni: "",
    area: "",
    sede: "",
    cargo: "",
    fecha: new Date().toLocaleDateString(),
  });

  const pdfRef = useRef();

  const generatePDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const marginX = (210 - imgWidth) / 2;

    pdf.addImage(imgData, "PNG", marginX, 10, imgWidth, imgHeight);
    pdf.save(`cargo_entrega_${data.nombre}.pdf`);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <div ref={pdfRef} className="bg-white p-6 w-[210mm] h-auto shadow-lg">
        <h2 className="text-center font-bold mb-4 text-lg">
          CARGO DE ENTREGA DE EQUIPOS
        </h2>

        <p className="mb-3 text-justify">
          Se hace entrega de un <b>{data.equipo || "____________"}</b> con las siguientes características:
        </p>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <p><b>Marca:</b> {data.marca}</p>
          <p><b>Modelo:</b> {data.modelo}</p>
          <p><b>Serie:</b> {data.serie}</p>
          <p><b>Color:</b> {data.color}</p>
        </div>

        <p className="text-justify mb-3">
          El equipo deberá ser devuelto en óptimas condiciones...
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <p><b>Nombres:</b> {data.nombre}</p>
          <p><b>Apellidos:</b> {data.apellido}</p>
          <p><b>DNI:</b> {data.dni}</p>
          <p><b>Área:</b> {data.area}</p>
          <p><b>Sede:</b> {data.sede}</p>
          <p><b>Cargo:</b> {data.cargo}</p>
        </div>

        <div className="flex justify-between mt-10">
          <div className="text-center">
            <p>____________________</p>
            <p>Administración</p>
          </div>
          <div className="text-center">
            <p>____________________</p>
            <p>Recibí conforme</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <input name="equipo" placeholder="Equipo" onChange={handleChange} />
        <input name="marca" placeholder="Marca" onChange={handleChange} />
        <input name="modelo" placeholder="Modelo" onChange={handleChange} />
        <input name="serie" placeholder="Serie" onChange={handleChange} />
        <input name="color" placeholder="Color" onChange={handleChange} />
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input name="dni" placeholder="DNI" onChange={handleChange} />
        <input name="area" placeholder="Área" onChange={handleChange} />
        <input name="sede" placeholder="Sede" onChange={handleChange} />
        <input name="cargo" placeholder="Cargo" onChange={handleChange} />
      </div>

      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        Generar PDF
      </button>
    </div>
  );
}
