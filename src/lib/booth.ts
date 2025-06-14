import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';

import { BoothSchema, type Booth, type BoothKind, type BoothLocation } from '@/types/booth';
import ProductOrDevEnv from './ProductOrDevEnv';
import { Schema } from 'zod';



// helper class
export default class BoothHelper {
    private static boothsDataCache: Booth[] | null = null;
    private static pathGenerater: () => [string, string] = this.pathGenerateForProductEnv;

    /**
     * 開発環境の場合、パスをテスト用のダミーアセットに変更する
     */
    public static checkoutDevEnv() {
        this.pathGenerater = this.pathGenerateForDevEnv;
    }

    // 本番環境用のpathGenerater関数
    private static pathGenerateForProductEnv(): [string, string] {
        return [
            "assets/booths-index.yaml",
            "assets/booths"
        ];
    }

    private static pathGenerateForDevEnv(): [string, string] {
        return [
            'src/tests/dummy_assets/booths-index.yaml',
            'src/tests/dummy_assets/booths'
        ];
    }

    // ヘルパー関数として分離
    private static loadBoothData(): Booth[] {
        const [indexBooth, boothsDirectory] = this.pathGenerater();
        const filePath: string = path.join(process.cwd(), indexBooth);

        const openFile = (filePath: string) => {
            try {
                const fileContents: string = fs.readFileSync(filePath, 'utf8');
                return fileContents;
            } catch (e) {
                throw new Error(`Failed to open file: ${filePath}.\n error_message: ${e}`);
            }
        }

        const parseContents = (fileContents: string, schema: Schema) => {
            try {
                const parsed = schema.parse(yaml.load(fileContents));
                return parsed;
            } catch (e) {
                throw new Error(`Failed to parse file: ${filePath}.\n error_message: ${e}`);
            }
        }

        const fileContents = openFile(filePath);
        const boothIndex = parseContents(fileContents, z.array(z.string()));

        // assets/booths/[booth_name].yamlからid列を用いてそれぞれの詳細情報を取得
        const boothsData: Booth[] = boothIndex.map((booth_name: string): Booth[] => {
            const filePath = path.join(process.cwd(), boothsDirectory, `${booth_name}.yaml`);
            const fileContents = openFile(filePath);
            const eachBoothData = parseContents(fileContents, BoothSchema);
            return eachBoothData;
        });

        return boothsData;
    }

    /**
     * Boothsのデータをロードする関数
     * @param {boolean} [force=false]- trueでキャッシュを無視して強制的に再ロード
    */
    public static load(force?: boolean): BoothHelper {
        if (ProductOrDevEnv.isDevEnv()) {
            this.checkoutDevEnv();
        }

        if (BoothHelper.boothsDataCache === null || force === true) {
            BoothHelper.boothsDataCache = this.loadBoothData();
        }
        return this;
    }

    public static getAllBooths(): Booth[] {
        if (BoothHelper.boothsDataCache === null) {
            throw new Error("\nloadメソッドよりも先にload必須のメソッドが呼ばれました。\nBoothHelperクラスのメソッドはloadメソッドを使用してからでないと使用できません。")
        }
        return BoothHelper.boothsDataCache;
    }

    /**
     * IDで企画を検索
     * @param {string} id - 企画ID
     * @return {Booth | null} 指定したIDの企画、見つからなければnull
     */
    public static getBoothById(id: string): Booth | null {
        const found = this.getAllBooths().find((eachBooth) => eachBooth.id === id);
        return found ?? null;
    }

    /**
     * 企画の種類（BoothKind）で絞り込む
     * @param {BoothKind} - 企画の種類
     * @return {Booth[]} 指定した種類の企画の配列
     */
    public static getBoothsByType(type: BoothKind): Booth[] {
        return this.getAllBooths().filter((booth) => booth.type === type);
    }

    /**
     * 屋内・屋外（BoothLocation）で絞り込む
     * @param {BoothLocation} - 場所の名前
     * @return {Booth[]} 指定した場所にある企画の配列
     */
    public static getBoothsByLocation(location: BoothLocation): Booth[] {
        return this.getAllBooths().filter((booth) => booth.locate === location);
    }

    /**
     * 食品企画のみ取得
     * @return {Booth[]} 食品企画の配列
     */
    public static getFoodBooths(): Booth[] {
        return this.getAllBooths().filter((booth) => booth.isFood === true);
    }

    /**
     * 特定の場所にある企画を取得
     * @param {string} place - 場所の名前
     * @return {Booth[]} 指定した場所にある企画の配列
     */
    public static getBoothsByPlace(place: string): Booth[] {
        return this.getAllBooths().filter((booth) => booth.place === place);
    }

    /**
     * 指定したキーワードを含む企画を取得（部分一致・大文字小文字無視）
     * @param {string} keyword - 検索キーワード
     * @return {Booth[]} 検索結果のBoothの配列
     */
    public static searchBooths(keyword: string): Booth[] {
        const lower = keyword.toLowerCase();
        return this.getAllBooths().filter(
            (booth) =>
                booth.name.toLowerCase().includes(lower) ||
                booth.description.toLowerCase().includes(lower)
        );
    }

    /**
     * 企画のURLを生成
     * @param {Booth} booth - 企画オブジェクト
     * @return {string} 企画のURL
     */
    public static generateBoothUrl(booth: Booth): string {
        return `/booth/${booth.id}`;
    }
}
