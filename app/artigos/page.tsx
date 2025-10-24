import Link from "next/link";
import slugify from "slugify";

export const dynamic = "force-static"; // 🔹 indica build estático
export const revalidate = 60; // 🔹 revalida a cada 60 segundos

const API_URL =
  "https://crudcrud.com/api/9d2dfbad42844aa08600612c30905dbe/artigos";

export default async function ListaArtigos() {
  const res = await fetch(API_URL, { next: { revalidate: 60 } }); // ✅ ajustado para SSG
  const artigos = res.ok ? await res.json() : [];

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Lista de Artigos</h1>
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
