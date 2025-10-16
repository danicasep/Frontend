const fs = require('fs');
const { getRender, createRender } = require('./cli_render');
require('dotenv').config()

function createPage(fileProps)
{
  const currentLocation = process.cwd();
  
  let renderPage = fs.readFileSync(`${currentLocation}/src/core/renders/page.render`).toString();
  
  let finalRender = getRender(renderPage, fileProps);
  
  createRender(finalRender, "src/resources/pages", `${fileProps.fileName}.page.tsx`, fileProps);
}

module.exports = {
  createPage
}