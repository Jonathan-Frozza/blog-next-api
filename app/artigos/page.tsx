import Link from "next/link";
import slugify from "slugify";

export const dynamic = "force-dynamic"; 

const API_URL = "https://crudcrud.com/api/1329b0b672c74a55bd294ffb027eeb71/artigos";

export default async function ListaArtigos() {
  const res = await fetch(API_URL, { cache: "no-store" });
  const artigos = res.ok ? await res.json() : [];

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1> Lista de Artigos</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {artigos.map((a: any) => (
          <li key={a._id} style={{ margin: "1rem 0" }}>
            <Link href={`/artigos/${slugify(a.titulo, { lower: true })}`}>
              <strong>{a.titulo}</strong>
            </Link>
            <p>{a.descricao || "Sem descrição."}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
