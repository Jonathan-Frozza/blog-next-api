import slugify from 'slugify';

const API_URL = 'https://crudcrud.com/api/d91c70121d09436bbb36c932e345cbaf/artigos';



async function fetchArtigos() {

  
  const res = await fetch(API_URL, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function generateStaticParams() {
  const artigos: any[] = await fetchArtigos();
  return artigos.map((a: any) => ({ slug: slugify(a.titulo, { lower: true }) }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigos: any[] = await fetchArtigos();
  const artigo = artigos.find((a: any) => slugify(a.titulo, { lower: true }) === params.slug);
  return {
    title: artigo ? artigo.titulo : 'Artigo não encontrado',
    description: artigo ? artigo.descricao : 'Leia um artigo no Blog'
  };
}

export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const artigos: any[] = await fetchArtigos();
   console.log('🧠 Dados da API:', artigos); // <— Adiciona aqui
  const artigo = artigos.find((a: any) => slugify(a.titulo, { lower: true }) === params.slug);

  if (!artigo) {
    return <main style={{ padding: '2rem' }}><h1>Artigo não encontrado</h1></main>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{artigo.titulo}</h1>
      <p><strong>Autor:</strong> {artigo.autor || 'Desconhecido'}</p>
      <p><em>Publicado em {artigo.data || '—'}</em></p>
      <article style={{ marginTop: '1rem', lineHeight: 1.6 }}>
        {artigo.conteudo}
      </article>
    </main>
  );
}
