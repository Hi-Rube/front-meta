const path = require('path');
const engine = require('./engine');

const argv = process.argv.filter((arg, idx) => idx > 1);
const file = argv[0];
const config = argv[1] || '../tmp/.quarkrc.js';

const getFilePath = paths => path.join(__dirname, ...paths);

engine.parse(getFilePath([file]), getFilePath([config]));
