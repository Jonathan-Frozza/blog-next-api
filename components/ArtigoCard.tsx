'use client';
import Link from 'next/link';
import styles from '../styles/artigoCard.module.css';
import slugify from 'slugify';

type Artigo = {
  _id: string;
  titulo: string;
  descricao?: string;
};

export function ArtigoCard({ artigo }: { artigo: Artigo }) {
  const slug = slugify(artigo.titulo, { lower: true });
  return (
    <Link href={`/artigos/${slug}`} className={styles.card}>
      <div>
        <h2>{artigo.titulo}</h2>
        {artigo.descricao && <p>{artigo.descricao}</p>}
      </div>
    </Link>
  );
}
