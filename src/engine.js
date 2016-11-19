const fs = require('fs');
const moduleLoader = require('./loaders/module');
const depLoader = require('./loaders/dep');

const meta$0 = ['module', 'dep', 'main'];
const parseMeta$0 = (content) => {
  const lineOfcontent = content.split('\n').map(lcxt => lcxt.trim());
  const meta$0group = {};
  let lastMetaIndex = -1;
  let lastMeta = null;
  meta$0.forEach((meta) => {
    const meta$0idx = lineOfcontent.indexOf(`${meta}:`);
    if (meta$0idx === -1) {
      throw new Error(`Miss the base meta "${meta}", base meta: ${meta$0}`);
    } else if (lastMeta) {
      meta$0group[lastMeta] = lineOfcontent.slice(lastMetaIndex, meta$0idx).join('');
    }
    lastMetaIndex = meta$0idx + 1;
    lastMeta = meta;
  });
  meta$0group[lastMeta] = lineOfcontent.slice(lastMetaIndex).join('');
  return meta$0group;
};

const meta$1main = [];
const parseMeta$1main = (content) => {
  console.log(content);
};

const parse = function parse(file, config) {
  const globalCxt = {
    modules: {},
  };

  if (typeof file === 'string') {
    const content = fs.readFileSync(file).toString();
    const rc = require(config);
    const cxt = { file };
    let resultContent = '';

    const meta$0group = parseMeta$0(content);
    resultContent += moduleLoader.build(meta$0group.module, globalCxt, cxt, rc);
    // resultContent += depLoader(meta$0group.dep, cxt, rc);

    // parseMeta$1main(meta$0group.main);
    console.log(resultContent);
  }
};

exports.parse = parse;
