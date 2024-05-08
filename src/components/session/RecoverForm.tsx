import { Button } from '@/components/ui/button'

export default function RecoverForm() {
  return (
    <div className="bg-background w-[60vw] rounded-lg shadow-md p-10 flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center mx-4 my-2 text-foreground">
        Recuperar Contraseña
      </h2>
      <span className="mx-4 my-2">
        Ingrese si correo electrónico y recibirá un mail con la información
        necesaria para reestablecer su contraseña.
      </span>
      <input
        type="email"
        placeholder="Correo electrónico"
        className="bg-transparent border rounded-md text-xl p-2 focus:outline-none my-2 mx-4"
      />
      <Button
        className="bg-primary-orange-600 h-[5vh] text-xl m-4 text-foreground rounded-md hover:bg-primary-orange-700"
      >
        Enviar
      </Button>
    </div>
  )
}
