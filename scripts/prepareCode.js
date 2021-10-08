const fs = require('fs');

const files = [
  { dir: `${__dirname}/../src/examples/reactContextCustom/`, files: ['ReactContextCustom.tsx'] },
  { dir: `${__dirname}/../src/examples/reactContextReducer/`, files: ['ReactContextReducer.tsx'] },
  { dir: `${__dirname}/../src/examples/recoilState/`, files: ['RecoilState.tsx'], skipType: true },
  {
    dir: `${__dirname}/../src/examples/redux/`,
    files: [
      'store/pokemon.actionTypeKeys.ts',
      'store/index.ts',
      'store/pokemon.actions.ts',
      'store/saga.ts',
      'store/pokemon.saga.ts',
      'store/pokemon.reducers.ts',
      'Redux.tsx',
    ],
  },
  {
    dir: `${__dirname}/../src/examples/reduxToolkit/`,
    files: [
      'store/pokemon.actionTypeKeys.ts',
      'store/index.ts',
      'store/pokemon.actions.ts',
      'store/saga.ts',
      'store/pokemon.saga.ts',
      'store/pokemon.reducers.ts',
      'ReduxToolkit.tsx',
    ],
  },
  { dir: `${__dirname}/../src/examples/valtio/`, files: ['ValtioProxyState.tsx'] },
  { dir: `${__dirname}/../src/examples/xstate/`, files: ['xstate.tsx'] },
  { dir: `${__dirname}/../src/examples/zustand/`, files: ['ZustandContext.tsx'] },
  { dir: `${__dirname}/../src/examples/zustandAutoSelector/`, files: ['ZustandAutoSelector.tsx'] },
  { dir: `${__dirname}/../src/examples/zustandSaga/`, files: ['ZustandSaga.tsx'] },
  { dir: `${__dirname}/../src/examples/easyPeasy/`, files: ['EasyPeasyState.tsx'], skipType: true },
  { dir: `${__dirname}/../src/store/`, files: ['storeType.ts'], skipType: true },
];
const StoreTypeFile = `${__dirname}/../src/store/storeType.ts`;

const readFileMasked = (name, filePath) => {
  const lines = fs.readFileSync(filePath).toString();
  const maskLines = lines.replace(/`/g, '`');
  return `\`// ${name}
${maskLines}\``;
};

files.forEach(({ dir, files, skipType }) => {
  const parts = [];
  parts.push(`
const code = [
`);
  if (!skipType) parts.push(readFileMasked('storeType.ts', StoreTypeFile) + ', \n');
  parts.push(files.map(name => readFileMasked(name, dir + name)).join(', '));
  parts.push(`];

export default code;
`);

  fs.writeFileSync(dir + 'code.ts', parts.join(''), { encoding: 'utf8', flag: 'w' });
});
