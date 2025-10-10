import './globals.css';
import styles from '../styles/layout.module.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Blog',
  description: 'Um blog simples com Next.js e CrudCrud API'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={styles.body}>
        <Navbar />
        <div className={styles.container}>
          {children}
        </div>
      </body>
    </html>
  );
}
