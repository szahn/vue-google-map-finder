// vue.config.js
// See https://cli.vuejs.org/config/#pages

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

const appName = "vue-google-map-finder";

module.exports = {
    outputDir: './dist',
    lintOnSave: false,
    filenameHashing: false,
    css: {
        extract: {
        filename: `${appName}.css`
        }
    },
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: `${appName}.js`
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        devtool: 'source-map'
    }
}
