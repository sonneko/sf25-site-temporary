import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    test: {
        env: {
            IS_PRODUCT_OR_DEV_ENV: "dev"
        }
    }
});