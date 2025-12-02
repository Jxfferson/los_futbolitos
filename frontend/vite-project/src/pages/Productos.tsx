interface Props {
  changePage: (p: string) => void;
}

export default function Productos({ changePage }: Props) {
  return (
    <div className="page">
      <h2>Gestión de Productos</h2>

      <button className="btn" onClick={() => changePage("admin")}>
        Ir al panel Admin
      </button>

      <button className="btn" onClick={() => changePage("empleado")}>
        Ir al panel Empleado
      </button>
    </div>
  );
}
