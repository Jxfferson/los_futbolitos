interface Props {
  changePage: (p: string) => void;
}

export default function AdminDashboard({ changePage }: Props) {
  return (
    <div className="page">
      <h2>Panel de Administrador</h2>

      <button className="btn" onClick={() => changePage("productos")}>
        Volver
      </button>
    </div>
  );
}
