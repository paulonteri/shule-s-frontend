const {
    override,
    fixBabelImports,
    addWebpackPlugin
} = require("customize-cra");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

module.exports = override(
    fixBabelImports("antd", {
        libraryDirectory: "es",
        style: "css"
    }),
    addWebpackPlugin(
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin/
        })
    )
);
