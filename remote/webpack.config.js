const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "app",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Module": ".//src/app/home/home.module.ts",
      },

      shared: share({
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/common/http": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@capacitor/app": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@capacitor/camera": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@capacitor/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@capacitor/haptics": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@capacitor/keyboard": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },
        "@capacitor/status-bar": {
          singleton: true,
          strictVersion: true,
          requiredVersion: "auto",
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
