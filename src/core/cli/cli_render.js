const { convertFileProps } = require("./cli_file");
const fs = require('fs');

function getRender(dataFile, _fileProps) {
  const fileProps = convertFileProps(_fileProps);
  return dataFile
    .replace(/{fileName}/g, fileProps.fileName)
    .replace(/{fileClassName}/g, fileProps.fileClassName)
    .replace(/{folders}/g, fileProps.folders)
    .replace(/{fileNameSpace}/g, fileProps.fileNameSpace)
    .replace(/{appName}/g, fileProps.appName);
}

function createRender(dataFile, location, fileNameFull, _fileProps) {
  const fileProps = convertFileProps(_fileProps);

  const folders = fileProps.folders.split("/");

  let incrementFolders = `${process.cwd()}/${location}`;

  // create folders
  for(var index in folders)
  {
    const folder = folders[index];
    if(folder == "") continue;

    incrementFolders += `/${folder}`;

    if(fs.existsSync(incrementFolders) == false) {
      fs.mkdirSync(incrementFolders);
    }
  }

  const fileLocation = `${incrementFolders}/${fileNameFull}`;

  if(fs.existsSync(fileLocation) == true) {
    throw new Error(`${fileLocation} already exist!`);
  }

  fs.writeFileSync(fileLocation, dataFile, (err) => {
    if(err) throw new Error(err);
  })

  console.log(`Successfully create file: ${incrementFolders}/${fileNameFull}`);
  
}

module.exports = {
  getRender,
  createRender
}