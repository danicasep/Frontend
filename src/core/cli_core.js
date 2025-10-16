var cliView = require("./cli/cli_view");
var cliInterface = require("./cli/cli_interface");
var cliPage = require("./cli/cli_page");
var location = require("./cli/cli_file");
function runCommand(allArgs, args)
{
  const mainCommand = args?.[0];

  const availableCommands = [
    {
      command: "page",
      argument: "{fileName}",
      example: "node arjunane page namaFolder/mencobaFile"
    }
  ]

  if(allArgs[1].indexOf("arjunane") == -1)
  {
    throw new Error("Please do not rename the file");
  }

  if(mainCommand) {
    if(mainCommand == "page") {
      const fileName = args?.[1];
      if(!fileName) {
        throw new Error("Filename is required");
      }

      const fileProps = location.getFileProps(fileName);
      
      cliInterface.createInterface(fileProps);
      cliView.createView(fileProps);
      cliPage.createPage(fileProps);
      return;
    }
  }

  console.table(availableCommands)

}

module.exports = {
  runCommand
}