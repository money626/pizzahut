const { defineConfig } = require("@vue/cli-service");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const os = require("os");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("fork-ts-checker").tap((args) => {
      let totalmem = Math.floor(os.totalmem() / 1024 / 1024); //get OS mem size
      // in vue-cli shuld args[0]['typescript'].memoryLimit
      args[0]["typescript"].memoryLimit = totalmem > 4100 ? 4096 : 2048;

      return args;
    });
  },
});
