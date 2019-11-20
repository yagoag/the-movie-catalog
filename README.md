# The Movie Catalog

[![Netlify Status](https://api.netlify.com/api/v1/badges/6e253ad1-b466-4603-9af7-efd1b3a5faa1/deploy-status)](https://app.netlify.com/sites/themoviecatalog/deploys)

[Informações em Português](/README.pt-BR.md)

Browse movies from TheMovieDB.org.

Access it at https://themoviecatalog.netlify.com

## Run locally

1. Create an account on TheMovieDB.org then navigate to [your settings](https://www.themoviedb.org/settings/api) and register an app to get an access token to the API, if you don't already have one.

   Rembember: this app uses the API Read Access Token (v4 auth), not the API key.

2. Set the `REACT_APP_API_TOKEN` environment variable with the token you were provided

   You can either set it on your system or, preferably, just create an `.env` file in the root folder of the project with the following content:

   ```
   REACT_APP_API_TOKEN=YOUR_API_TOKEN_GOES_HERE
   ```

3. Install it...

   ```
   yarn
   ```

4. ...then run it

   ```
   yarn start
   ```

To run the tests, you can just `yarn test`, and to run a production build, `yarn build`.

You can also use `npm`, just make sure to delete your `yarn.lock` file, otherwise you might have some complaining.
