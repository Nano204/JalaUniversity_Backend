# Configuring Typescript Express-Project

1. Create a folder.
2. Open folder on terminal.
3. Start project with `npm init` and name the project.
4. Create install typescript and generate tsconfig file:

```shell
👇️ install typescript globally
#Must need to use sudo
npm install typescript@latest -g

👇️ generate tsconfig.json file
tsc --init
```

5. Configurate tscongif.json file:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "rootDir": "src",
    "sourceMap": true,
    "outDir": "dist",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

6. Install libraries:

```shell
👇️ install express
npm i -S express

👇️ install express types
npm i -D @types/express

👇️ install ts-node (for not needing to compile)
#Must need to use sudo
npm i -G ts-node

👇️ install tsconfig-paths (for debugging with ts types)
npm i -D tsconfig-paths
```

7. Setup express app `app.ts`. Create folder `src` in root folder, inside the folder create a file named `app.ts`, write inside:

```typescript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

8. Configurate `package.json`. Set `app.ts` as main and add `start` script:

```json
{
  "main": "app.ts",
  "scripts": {
    "start": "npx ts-node src/app.ts"
  }
}
```

9. Setup debbuging `launch.json`. Create folder `.vscode` in root folder, inside the folder create a file named `launch.json`, write inside:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "runtimeArgs": ["-r", "ts-node/register", "-r", "tsconfig-paths/register"],
      "program": "${workspaceFolder}/src/app.ts"
    }
  ]
}
```

10. Use `npm start` to test working server.
11. Use the debugger tool of VSCode to test debugging is working.
12. Install VScode ESlint extension.

13. Install and configure ESlint.

```
 ╰─λ npm init @eslint/config
✔ How would you like to use ESLint? · To check syntax, find problems, and enforce code style
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? (Press <space> to select, <a> to toggle all, <i> to invert selection) · Node
✔ What format do you want your config file to be in? · JSON
✔ What style of indentation do you use? · spaces
✔ What quotes do you use for strings? · double
✔ What line endings do you use? · unix
✔ Do you require semicolons? · Yes
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · npm
Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
```

14. Validate Prettier and ESLint configurations to make them compatible.