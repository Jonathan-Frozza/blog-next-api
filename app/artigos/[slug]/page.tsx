import slugify from "slugify";

// 🔹 Declara SSR (renderização dinâmica no servidor)
export const dynamic = "force-dynamic";

const API_URL =
  "https://crudcrud.com/api/1329b0b672c74a55bd294ffb027eeb71/artigos";

type Artigo = {
  _id: string;
  titulo: string;
  descricao?: string;
  autor?: string;
  data?: string;
  conteudo?: string;
};

// 🔹 Busca os artigos da API
async function fetchArtigos(): Promise<Artigo[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

// 🔹 SEO dinâmico
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ agora aguardamos params

  const artigos = await fetchArtigos();
  const artigo = artigos.find(
    (a) => slugify(a.titulo, { lower: true }) === slug
  );

  return {
    title: artigo ? artigo.titulo : "Artigo não encontrado",
    description: artigo
      ? artigo.descricao || "Leia este artigo"
      : "Artigo não encontrado",
  };
}

// 🔹 Página individual do artigo
export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ e aqui também

  const artigos = await fetchArtigos();
  const artigo = artigos.find(
    (a) => slugify(a.titulo, { lower: true }) === slug
  );

  if (!artigo) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Artigo não encontrado</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{artigo.titulo}</h1>
      <p>
        <strong>Autor:</strong> {artigo.autor || "Desconhecido"}
      </p>
      <p>
        <em>Publicado em {artigo.data || "—"}</em>
      </p>
      <article style={{ marginTop: "1rem", lineHeight: 1.6 }}>
        {artigo.conteudo || artigo.descricao || "Sem conteúdo disponível."}
      </article>
    </main>
  );
}
