# Frontend
- Vite para construção da estrutura da aplicação frontend
- Axios para comunicação com a api
- React para programação das páginas
- MaterialUI para componentes e estilo das páginas
- Typescript linguagem de desenvolvimento, posteriormente convertida pelo Vite para javascript para ambiente de produção.

# Backend
- NodeJS
- Typescript linguagem de desenvolvimento, posteriormente convertida pelo Vite para javascript para ambiente de produção.
- Express para criar servidor Http
- JsonWebToken (JWT) para gerar tokens de autenticação
- Typeorm para comunição e estruturação com banco de dados
- Xml2js para transformar arquivos .xml e objetos em javascript
- express-fileupload para capturar os arquivos enviados na requisição da api e salvar no banco de dados
- bcrypt para gerar valores encriptados

## Banco de dados
- Postgres



>> docker run -d --name app -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5455:5432 postgres:lastest

