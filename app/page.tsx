import { ArtigoCard } from '../components/ArtigoCard';

const API_URL = 'https://crudcrud.com/api/d91c70121d09436bbb36c932e345cbaf/artigos';

async function fetchArtigos() {
  const res = await fetch(API_URL, { cache: 'no-store' });
  if (!res.ok) {
    // retornar array vazio em caso de 404/sem dados
    return [];
  }
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const artigos: any[] = await fetchArtigos();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Blog</h1>
      {artigos.length === 0 ? (
        <p>Nenhum artigo encontrado. Cadastre artigos na API do CrudCrud para vê-los aqui.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {artigos.map((artigo) => (
            <ArtigoCard key={artigo._id} artigo={artigo} />
          ))}
        </div>
      )}
    </main>
  );
}

