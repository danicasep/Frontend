const fs = require('fs');
const { getRender, createRender } = require('./cli_render');
require('dotenv').config()

function createView(fileProps)
{
  const currentLocation = process.cwd();
  
  let renderView = fs.readFileSync(`${currentLocation}/src/core/renders/view.render`).toString();
  
  let finalRender = getRender(renderView, fileProps);
  
  createRender(finalRender, "src/resources/views", `${fileProps.fileName}.view.tsx`, fileProps);
}

module.exports = {
  createView
}