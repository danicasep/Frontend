const fs = require('fs');
const { getRender, createRender } = require('./cli_render');
require('dotenv').config()

function createInterface(fileProps)
{
  const currentLocation = process.cwd();
  
  let renderInterface = fs.readFileSync(`${currentLocation}/src/core/renders/interface.render`).toString();
  
  let finalRender = getRender(renderInterface, fileProps);
  
  createRender(finalRender, "src/resources/interfaces", `${fileProps.fileName}.interface.ts`, fileProps);
}

module.exports = {
  createInterface
}