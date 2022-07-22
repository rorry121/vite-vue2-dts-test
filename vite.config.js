import { createVuePlugin } from "vite-plugin-vue2";
import { defineConfig, loadEnv } from "vite";
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths'
const path = require('path');

// 获取组件入口文件
const basicPlugin = [
    createVuePlugin({ target: 'esnext' }),
]

const tsPlugin = [
    dts({
        tsConfigFilePath: './tsconfig.json',
        include: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
        exclude: ["src/shims-vue.d.ts"],
        outputDir: 'dist/v2',
        staticImport: true,
        insertTypesEntry: true,
        logDiagnostics: true,
        skipDiagnostics: false,
    }),
    tsconfigPaths()
];

const allPlugins = [ ...basicPlugin, ...tsPlugin ];


export default defineConfig({
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    plugins: allPlugins,
    build: {
        sourcemap: true,
        outDir: 'dist/v2',
        assetsDir: '',
        lib: {
            entry: 'src/index.ts',
            fileName: fmt => `index.${fmt}.js`,
            name: 'vite-vue2-dts-test',
            formats: ['es', 'umd'],
        },
        commonjsOptions: {
            transformMixedEsModules: true,
            extensions: ['.js', '.ts'],
        },
        rollupOptions: {
            external: ['@vue/composition-api', 'vue'],
            output: {
                globals: {
                    vue: 'Vue',
                    '@vue/composition-api': 'VueCompositionAPI'
                },
            }
        },
    },
});