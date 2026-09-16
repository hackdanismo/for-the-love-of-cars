# For the Love of Cars
Website for Car enthusiasts with news, features and articles.

## Development

### Clone the Repository
Clone the repository from `GitHub`:

```shell
# Clone the repository using HTTPS
$ git clone https://github.com/hackdanismo/for-the-love-of-cars.git
# Clone the repository using SSH
$ git clone git@github.com:hackdanismo/for-the-love-of-cars.git
```

Once the repository has been cloned, change directory into the project folder and install the dependencies and packages listed inside the `package.json` file.

```shell
$ cd for-the-love-of-cars
$ npm install
```

Set the `Node` version using `Node Version Manager`. The `.nvmrc` file sets the recommended `Node` version to use.

Install `Node Version Manager`, if required:

```shell
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
```

Install `Node` and use the version specified in the `.nvmrc` file:

```shell
# Install the recommended Node version using Node Version Manager
$ nvm install
# Use the Node version
$ nvm use
```

Run the development server:

```shell
$ npm run dev
```

### Install Astro
Use `NPM` to install `Astro` and setup the scaffold for the application. Follow the terminal commands.

```shell
$ npm create astro@latest .
```

### Tailwind
`Tailwind` is used to style the application. `Tailwind` is installed and configured using:

```shell
$ npx astro add tailwind
```

This will install and configure the `Tailwind Vite` plugin. This will update the `astro.config.mjs` file. `Tailwind` comes with a built-in CSS reset called `Preflight`.

This approach generates a `styles/global.css` stylesheet containing the `Tailwind` import. This import needs to be added to the top of the `src/layouts/Layout.astro` layout file.

```astro
import '../styles/global.css'
```

### Astro Check
Setup `Astro Check` to validate `.astro` files and `TypeScript` usage. This performs static diagnostics across the project.

```shell
$ npm install -D @astrojs/check typescript
```

Add the script to the `package.json` file:

```json
{
  "scripts": {
    "check": "astro check"
  }
}
```

Run `Astro Check` inside of the project:

```shell
$ npm run check
```

### ESLint
`ESLint` is used to analyse the `TypeScript` and `JavaScript` code inside of the project to flag patterns that could be bugs/issues, or inconsistencies against specified coding rules.

```shell
$ npm install -D eslint @eslint/js eslint-plugin-astro typescript-eslint
```

Create a `eslint.config.mjs` file:

```mjs
import eslint from '@eslint/js'
import astro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],

  {
    ignores: ['dist/', '.astro/'],
  },
]
```

Update the `package.json` file with scripts to run `ESLint`:

```
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Run `ESLint`:

```shell
$ npm run lint
$ npm run lint:fix
```

## Content
`Sanity` is the `Content Management System` platform we are using to manage content and copy across the application. `Astro` handles the frontend, `Sanity` manages the content.

### Install Sanity Client
Install the `@sanity/client` npm package:

```shell
$ npm install @sanity/client
```

Within the `Astro` project, add a file named `src/lib/sanity.ts` with the following code:

```typescript
import { createClient } from "@sanity/client";

export const sanity = createClient({
    projectId: "THE_PROJECT_ID",
    dataset: "production",
    apiVersion: "2026-09-04",
    useCdn: true,
});
```

Replace `THE_PROJECT_ID` with the ID of the Sanity project.

The `projectId` is not considered a secret and is a public value; they will generally be visible in client-side requests anyway. Tokens, by contrast, must be treated as secret.

Create an `.env.local` file in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Update the `src/lib/sanity.ts` file to reference these values.

```typescript
import { createClient } from "@sanity/client";

export const sanity = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    apiVersion: "2026-09-04",
    useCdn: true,
});
```