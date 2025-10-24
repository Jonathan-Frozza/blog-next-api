import slugify from "slugify";

// 🔹 Força renderização estática (SSG)
export const dynamic = "force-static";
export const revalidate = 60;

const API_URL =
  "https://crudcrud.com/api/9d2dfbad42844aa08600612c30905dbe/artigos";

export async function generateStaticParams() {
  const res = await fetch(
    "https://crudcrud.com/api/9d2dfbad42844aa08600612c30905dbe/artigos",
    { cache: "no-store" }
  );

  const artigos = res.ok ? await res.json() : [];

  return artigos.map((a: any) => ({
    slug: slugify(a.titulo, { lower: true }),
  }));
}


type Artigo = {
  _id: string;
  titulo: string;
  descricao?: string;
  autor?: string;
  data?: string;
  conteudo?: string;
};

async function fetchArtigos(): Promise<Artigo[]> {
  const res = await fetch(API_URL, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}



// ✅ Corrige o erro do params.await
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ aguarda o params antes de acessar slug

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

// ✅ Mesmo ajuste no componente da página
export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ aguarda antes de usar
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
