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