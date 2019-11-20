# The Movie Catalog

[![Netlify Status](https://api.netlify.com/api/v1/badges/6e253ad1-b466-4603-9af7-efd1b3a5faa1/deploy-status)](https://app.netlify.com/sites/themoviecatalog/deploys)

[Info in English](/README.md)

Navegue pelos filmes cadastrados no TheMovieDB.org.

Acesse em https://themoviecatalog.netlify.com

## Rodar localmente

1. Crie uma conta no TheMovieDB.org e navegue até as [suas configurações](https://www.themoviedb.org/settings/api) e registre uma nova aplicação para conseguir o seu token de acesso, caso já não tenha um.

   Lembre-se: essa aplicação utiliza o token de acesso - API Read Access Token (v4 auth) - e não a API key.

2. Configure a variável de ambiente `REACT_APP_API_TOKEN` com o seu token de acesso

   Você pode configurá-la diretamente no sistema ou, preferivelmente, criar um arquivo `.env` na pasta root do projeto com o seguinte conteúdo:

   ```
   REACT_APP_API_TOKEN=SEU_TOKEN_DE_ACESSO_VAI_AQUI
   ```

3. Instale...

   ```
   yarn
   ```

4. ...e execute

   ```
   yarn start
   ```

Para rodar os testes, você pode executar `yarn test` e para gerar uma build de produção, `yarn build`.

Você também pode utilizar o `npm`, só lembre de apagar o `yarn.lock` para não ter reclamações por parte dele.
