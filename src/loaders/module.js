const path = require('path');
const _ = require('lodash');

exports.build = (content, globalCxt, cxt, config) => {
  let moduleConfig = {
    checkfile: false,
  };
  if (config && config.loaders) {
    moduleConfig = Object.assign(moduleConfig, config.loaders.module || {});
  }

  const moduleName = content.trim();
  globalCxt.modules[moduleName] = cxt.file;

  const filebasename = path.basename(cxt.file).split('.')[0].toLocaleLowerCase();
  if (moduleConfig.checkfile &&
      filebasename !== _.last(moduleName.split('/')).toLowerCase()) {
    throw new Error('loaders failed --- in module loader checkfile error');
  }

  return '';
};

exports.generate = () => {

};
