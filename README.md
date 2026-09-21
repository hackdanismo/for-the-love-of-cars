# For the Love of Cars
Website for Car enthusiasts with news, features and articles.

## Run the Application
Run the application from within the terminal:

```shell
# Change directory into the project folder
$ cd for-the-love-of-cars
# Install the recommended Node version using nvm
$ nvm install
# Set the Node version using nvm
$ nvm use
# Run the development server
$ npm run dev
```

The project will run locally here: [http://localhost:4321/](http://localhost:4321/).

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

The project will run locally here: [http://localhost:4321/](http://localhost:4321/).

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

### Legacy Approach
**Note: This is no longer needed, but will be documented anyway.**

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
PUBLIC_SANITY_PROJECT_ID=project_id_here
PUBLIC_SANITY_DATASET=production
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

### Sanity Studio
`Sanity Studio` is the user interface/dashboard for the `Sanity CMS`. This is the admin area where content can be added or edited within the CMS. 

Adding `Sanity Studio` at the `/studio` route inside of the project is a good solution. Sanity's official Astro integration supports this directly.

`@astrojs/react` is needed when embedding `Sanity Studio` in `Astro`. From the root of the project, run:

```shell
$ npx astro add @sanity/astro @astrojs/react
```

This will update the `astro.config.mjs` file.

```mjs
// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      apiVersion: '2026-09-04',
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
  ],
});
```

Since you're already using `@sanity/astro`, the cleanest setup is usually to let the integration provide the client and wherever you query `Sanity` use:

```typescript
import { sanityClient } from 'sanity:client';
```

Then you don't need to duplicate the Sanity client configuration in `src/lib/sanity.ts` at all.

We should also add the Sanity module types to a `src/env.d.ts` file as Sanity specifically documents this because the Astro integration exposes its client through a virtual module:

```typescript
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
```

Because we have this in `astro.config.mjs`:

```mjs
studioBasePath: '/studio',
```

That tells `@sanity/astro` to embed `Sanity Studio` at `/studio`, and an embedded `Studio` requires its own `sanity.config.ts` (or .js) in the project root.

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [
    structureTool(),
  ],

  schema: {
    types: [],
  },
});
```

To access the `Studio` use: [http://localhost:4321/studio](http://localhost:4321/studio).

The first time opening the embedded `Studio`, `Sanity` may ask to add the `localhost URL` as an allowed `CORS origin`; that is expected.

Go to: `Sanity` -> `the-car-website` -> `Settings` -> `API settings` -> `CORS Origins`

Then add the `localhost` address: `http://localhost:4321`.

And enable `Allow credentials`. `Sanity` requires this for authenticated `Studio` requests. Once this is done, we can now login to `Studio` with our `Gmail`, `GitHub` or `Email` credentials.

## Schema
The `schema` is the structure for the data in the `CMS`. Within the project folder, create a `schemaTypes/` folder in the root of the project. Each schema will have a `TypeScript` file, for example: `schemaTypes/article.ts`.

```typescript
import { defineField, defineType } from "sanity";

export const articleType = defineType({
    name: "article",
    title: "Article",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
    ],
});
```

Within the `schemaTypes/` folder, add an `index.ts` file to reference each schema created.

```typescript
import { articleType } from "./article";

export const schemaTypes = [
    articleType,
];
```

Within the `sanity.config.ts` file, include the `schemaTypes` directory so the file now looks like this:

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [
    structureTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
```

After these changes, run the development server and open the `Studio` to see the `Article` appear as a document type.

### News Schema
The `News` schema is similar to the `Articles` schema:

```typescript
import { defineField, defineType } from "sanity";

export const articleType = defineType({
    name: "article",
    title: "Article",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
    ],
});
```

Once added, update the `schemaTypes/index.ts` file:

```typescript
import { articleType } from "./article";
import { newsType } from "./news";

export const schemaTypes = [
    articleType,
    newsType,
];
```

## Pages
All pages for the `Astro` application are placed inside of the `src/pages` directory. For a page to dynamically created for each `article` added to the CMS, we use the structure:

```
src/
  layouts/
    Layout.astro
  pages/
    articles/
      [slug].astro
```

The `pages/articles/[slug].astro` page will look like this:

```astro
---
import { sanityClient } from 'sanity:client';

// Include the page layout/structure.
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
    const articles = await sanityClient.fetch(`
        *[_type == "article" && defined(slug.current)] {
            "slug": slug.current
        }
    `);

    return articles.map((article) => ({
        params: { slug: article.slug },
    }));
}

const { slug } = Astro.params;

const article = await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0]`,
    { slug }
);

if (!article) {
    return Astro.redirect('/404');
}

// Example article: http://localhost:4321/articles/new-bmw-i3-to-be-launched-in-2027
---

<Layout title={article.title}>
    <h1>{article.title}</h1>
</Layout>
```

So we can visit a test article that has been added to the CMS to view the page: `http://localhost:4321/articles/new-bmw-i3-to-be-launched-in-2027`.

To add a main `articles` overview page that is found here: `src/pages/articles/index.astro` and has the URL of: `http://localhost:4321/articles`:

```astro
---
import { sanityClient } from 'sanity:client';

// Include the page layout/structure.
import Layout from '../../layouts/Layout.astro';

const articles = await sanityClient.fetch(`
    *[
        _type == "article" &&
        defined(slug.current)
    ] | order(publishedAt desc) {
        _id,
        title,
        publishedAt,
        "slug": slug.current
    }
`);
---

<Layout title="Articles">
    <h1>Articles</h1>

    <ul>
        {articles.map((article) => (
            <li>
                <a href={`/articles/${article.slug}`}>
                    {article.title}
                </a>
            </li>
        ))}
    </ul>
</Layout>
```

The `src/layouts/Layout.astro` file will look like this:

```astro
---
// Import Tailwind and CSS styling across all pages using this layout
import '../styles/global.css'

// Typechecking props
interface Props {
	title?: string;		// Title prop (optional)
}

// Props passed into the Layout component
const { title } = Astro.props;

/*
 * Variable that sets the page title.
 * If no value is passed to the title prop, use the default 'FLOC'.
 * Else, if a value is passed, use: 'FLOC - page title`.
 * Ternary operator is used to manage the page title that is rendered.
 */
const pageTitle = title ? `FLOC - ${title}` : 'FLOC';
--- 

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />

		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />

		<title>{pageTitle}</title>
	</head>
	<body>
		<main role="main">
			<slot />
		</main>
	</body>
</html>
```

The `news` pages will be similar to the `article` pages, but pulling data from the `News` document type in the CMS.

The `homepage` can be found here: `src/pages/index.astro`:

```astro
---
// Include the page layout/structure.
import Layout from '../layouts/Layout.astro';
---

<Layout>
	<h1>Hello, World</h1>
</Layout>
```