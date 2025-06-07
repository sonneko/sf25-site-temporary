export type Env = 'product' | 'dev';

export default class ProductOrDevEnv {
    private static env: Env = 'product';
    private static isInited: boolean = false;

    private static init() {
        if (!this.isInited) {
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
            this.isInited = true;
        }
    }

    public static isProductEnv(): boolean {
        this.init();
        return this.env === 'product';
    }

    public static isDevEnv(): boolean {
        this.init();
        return this.env === 'dev';
    }
}