# Blog Next.js (App Router) — blog-next-api

Projeto gerado para o exercício do curso (Next.js App Router + CrudCrud API).

## Como usar

1. Descompacte a pasta.
2. No terminal, entre na pasta do projeto:
   ```bash
   cd blog-next-api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra http://localhost:3000

## Observações
- A API do CrudCrud usada nas chamadas está configurada para o endpoint que você forneceu:
  `https://crudcrud.com/api/315e97412f084fa4bfd6ae886c3453d1/artigos`
- O projeto assume que você irá cadastrar artigos manualmente na collection `artigos` no CrudCrud.
- O campo esperado para cada artigo na API:
  - `titulo` (string)
  - `descricao` (string)
  - `conteudo` (string)
  - `autor` (string)
  - `data` (string, ex: "2025-10-05")

