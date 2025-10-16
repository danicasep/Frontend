require("dotenv").config();

function getFileProps(fileProps) {
  let fileName = null, folders = "", fileClassName;
  
  let splitFileProps = fileProps.split("/");
  if(splitFileProps.length > 1) {
    
    for(var index in splitFileProps) {
      index = parseInt(index);
      var current = splitFileProps[index];

      if((index + 1) == splitFileProps.length) {
        fileName = current;  
        break;
      }
      
      folders += `${current}${index < (splitFileProps.length - 1) ? "/" : ""}`;
    }
  } else {
    fileName = fileProps;
  }

  fileClassName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  
  const appName = process.env.APP_NAME;
  const fileNameSpace = fileClassName.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, " ");

  return {
    fileName,
    folders,
    fileClassName,
    appName,
    fileNameSpace
  }
}

function convertFileProps(fileProps) {
  return {
    appName: fileProps.appName,
    folders: fileProps.folders,
    fileName: fileProps.fileName,
    fileClassName: fileProps.fileClassName,
    fileNameSpace: fileProps.fileNameSpace
  }
}

module.exports = {
  getFileProps,
  convertFileProps
}