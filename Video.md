init the project,

npm init es6 -y

npm i -D typescript @types/chrome

typescript - type information for working with chrome,

npx tsc --init

```
outDir: 'dist',
include : ['src/**/*']
ignored : ['node_modules', 'dist']
module: NodeNext
```

create manifest.json

-> add schema for type inference in json

```
"$schema": "https://json.schemastore.org/chrome-manifest",
```

action, background -> service_worker,

simple code in src/background/index.ts

permission -> activeTab, scripting

creating the script

```json
"start": "tsc",
  "watch": "tsc -w",
  "clean": "rimraf dist",
  "copy-assets": "rsync -av --exclude 'tsconfig.json' --exclude 'src' --exclude 'dist' ./ dist/",
  "build": "npm run clean && npm run start && npm run copy-assets"
```

focusing on typescript, rather than webpack

use

https://chromewebstore.google.com/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid

for extension-reloader, after changing in the code,

or just use my script that i have created for the hot-reload-client.ts
