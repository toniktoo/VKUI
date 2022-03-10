const path = require("path");

module.exports = [
  path.join(
    __dirname,
    "node_modules/@vkontakte/vkui-tokens/themes/vkBase/cssVars/declarations/onlyVariables.css"
  ),
  path.join(__dirname, "src/styles/bright_light.css"),
  path.join(__dirname, "src/styles/constants.css"),
];
