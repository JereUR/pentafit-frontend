export default function TextForm() {
  return (
    <div className="border border-blue-300 bg-blue-100 text-blue-500 text-sm p-4">
      <p>Control de pago:</p>
      <p>
        1° MENSUAL: No contempla sesiones, y la persona puede reservar turnos
        solo teniendo la cuota disponible.
      </p>
      <p>
        2° MENSUAL CON SESIONES: Contenpla las sesiones y solo permite reservar
        turno si este tiene sesiones disponibles para el período
      </p>
      <p>
        3° POR PERIODO: Contenpla sesiones y al generar la cuota se indica el
        período y la cantidad de sesiones de la misma
      </p>
      <p>
        4° POR SESION (pago individual): Se crea una sola sesión, la cual se
        deve pagar de a una.
      </p>
    </div>
  )
}
