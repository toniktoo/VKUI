const path = require("path");
const cssCustomProperties = require("postcss-custom-properties");
const scopeRoot = require("./tasks/postcss-scope-root.js");
const cssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssModules = require("postcss-modules");
const csso = require("postcss-csso");
const checkKeyframes = require("./tasks/postcss-check-keyframes");
const cssCustomPropertiesPaths = require("./cssCustomPropertiesPaths");
const { defaultSchemeId } = require("./package.json");

module.exports = (ctx) => {
  const plugins = [
    cssImport(),
    checkKeyframes({
      importFrom: path.join(__dirname, "src/styles/animations.css"),
    }),
    cssCustomProperties({
      importFrom: cssCustomPropertiesPaths,
      preserve: true,
    }),
    // postcss-custom-properties only works with :root
    scopeRoot({
      customPropRoot: ".vkui__root, .vkui__portal-root",
      except: [
        path.resolve(`./src/styles/${defaultSchemeId}.css`),
        path.resolve(
          "./node_modules/@vkontakte/vkui-tokens/themes/vkBase/cssVars/declarations/onlyVariables.css"
        ),
      ],
    }),
    autoprefixer(),
    cssModules({
      generateScopedName: (name) => {
        if (ctx.options.isSandbox) {
          return name;
        }
        return name.startsWith("vkui") || name === "mount"
          ? name
          : `vkui${name}`;
      },
      getJSON: () => void 0,
    }),
  ];

  if (process.env.NODE_ENV === "production") {
    plugins.push(csso({ restructure: false }));
  }

  return { plugins };
};
