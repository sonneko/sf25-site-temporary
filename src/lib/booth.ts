import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';

import { BoothSchema, type Booth, type BoothKind, type BoothLocation } from '@/types/booth';
import ProductOrDevEnv from './ProductOrDevEnv';
import { Schema } from 'zod';


// index_boothのパスと、boothsのいっぱい入ったディレクトリの場所・process.cwd()からの相対パス
// DIのため分離
function pathGenerateForProductEnv(): [string, string] {
    return ["assets/booths-index.yaml", "assets/booths"];
}

// helper class
export default class BoothHelper {
    private static boothsDataCache: Booth[] | null = null;
    private pathGenerater: () => [string, string] = pathGenerateForProductEnv;

    public checkoutDevEnv() {
        this.pathGenerater = () => [
            'src/tests/dummy_assets/booths-index.yaml',
            'src/tests/dummy_assets/booths'
        ]
    }

    // ヘルパー関数として分離
    private loadBoothData(): Booth[] {
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

    // force: 強制的にキャッシュを更新
    public load(force?: boolean): BoothHelper {
        if (ProductOrDevEnv.isDevEnv()) {
            this.checkoutDevEnv();
        }

        if (BoothHelper.boothsDataCache === null || force === true) {
            BoothHelper.boothsDataCache = this.loadBoothData();
        }
        return this;
    }

    public getAllBooths(): Booth[] {
        if (BoothHelper.boothsDataCache === null) {
            throw new Error("\nloadメソッドよりも先にload必須のメソッドが呼ばれました。\nBoothHelperクラスのメソッドはloadメソッドを使用してからでないと使用できません。")
        }
        return BoothHelper.boothsDataCache;
    }

    public getBoothById(id: string): Booth | null {
        const found = this.getAllBooths().find((eachBooth) => eachBooth.id === id);
        return found ?? null;
    }

    /**
     * 企画の種類（BoothKind）で絞り込む
     */
    public getBoothsByType(type: BoothKind): Booth[] {
        return this.getAllBooths().filter((booth) => booth.type === type);
    }

    /**
     * 屋内・屋外（BoothLocation）で絞り込む
     */
    public getBoothsByLocation(location: BoothLocation): Booth[] {
        return this.getAllBooths().filter((booth) => booth.locate === location);
    }

    /**
     * 食品企画のみ取得
     */
    public getFoodBooths(): Booth[] {
        return this.getAllBooths().filter((booth) => booth.isFood === true);
    }

    /**
     * 特定の場所にある企画を取得
     */
    public getBoothsByPlace(place: string): Booth[] {
        return this.getAllBooths().filter((booth) => booth.place === place);
    }

    /**
     * 名前または説明にキーワードが含まれている企画を取得（部分一致・大文字小文字無視）
     */
    public searchBooths(keyword: string): Booth[] {
        const lower = keyword.toLowerCase();
        return this.getAllBooths().filter(
            (booth) =>
                booth.name.toLowerCase().includes(lower) ||
                booth.description.toLowerCase().includes(lower)
        );
    }

    public static generateBoothUrl(booth: Booth): string {
        return `/booth/${booth.id}`;
    }
}
