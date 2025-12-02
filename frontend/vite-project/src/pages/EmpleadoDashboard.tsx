interface Props {
  changePage: (p: string) => void;
}

export default function EmpleadoDashboard({ changePage }: Props) {
  return (
    <div className="page">
      <h2>Panel de Empleado</h2>

      <button className="btn" onClick={() => changePage("productos")}>
        Volver
      </button>
    </div>
  );
}
