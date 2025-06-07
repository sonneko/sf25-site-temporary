export type Env = 'product' | 'dev';

export default class ProductOrDevEnv {
    private static env: Env = 'product';

    private static init() {
        try {
            const envValue = process.env.IS_PRODUCT_OR_DEV_ENV;

            if (envValue === 'product') {
                this.env = 'product';
            } else if (envValue === 'dev') {
                this.env = 'dev';
            } else {
                throw new Error('\nIS_PRODUCT_OR_DEV_ENV is illegal value.');
            }
        } catch (e) {
            throw new Error(`\nIS_PRODUCT_OR_DEV_ENV is not defined.\n\n\n${e}`);
        }
    }

    public static setEnv(env: Env) {
        this.init();
        this.env = env;
    }

    public static getEnv() {
        this.init();
        return this.env;
    }

    public static isProductEnv() {
        this.init();
        return this.env === 'product';
    }

    public static isDevEnv() {
        this.init():
        return this.env === 'dev';
    }
}