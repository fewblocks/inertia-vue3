import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ['resources/sass/app.scss', 'resources/js/app.js'],
            refresh: true
        })
    ],
    compilerOptions: {
        paths: {
            bootstrap: ['./node_modules/types/bootstrap']
        }
    },
    resolve: {
        alias: {
            // 画像インポートalias
            '~': path.resolve(__dirname, 'resources/images'),
            // jsonインポートalias
            '^': path.resolve(__dirname, 'resources/json'),
            // sassインポートalias
            '+': path.resolve(__dirname, 'resources/sass')
        }
    },
    transpileDependencies: true,
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: ` @use "resources/sass/_variables" as *;`
            }
        }
    }
})
