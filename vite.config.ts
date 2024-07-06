import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

export default {
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver(), NaiveUiResolver()],
        }),
    ],
    // build: {
    //     target: 'modules',
    //     outDir: 'dist', //指定输出路径
    //     assetsDir: 'assets', // 指定生成静态资源的存放路径
    //     rollupOptions: {
    //         minify: 'terser',// 混淆器，terser构建后文件体积更小
    //         output: {
    //             manualChunks(id) {
    //                 if (id.includes('node_modules')) {
    //                     return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //                 }
    //             }
    //         },
    //     },
    // },
};
