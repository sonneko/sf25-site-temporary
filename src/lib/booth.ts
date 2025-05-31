import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import type { Booth, BoothKind, BoothLocation } from '@/types/booth';


// index_boothのパスと、boothsのいっぱい入ったディレクトリの場所・process.cwd()からの相対パス
// DIのため分離
function pathGenerateForProductEnv(): [string, string] {
    return ["assets/booths-index.yaml", "assets/booths"];
}

// helper class
export default class BoothHelper {
    private static boothsDataCache: Booth[] | null = null;
    private pathGenerater: () => [string, string] = pathGenerateForProductEnv;

    public setPathGenerater(fn: () => [string, string]) {
        this.pathGenerater = fn;
    }

    // ヘルパー関数として分離
    private loadBoothData(): Booth[] {
        // assets/booths-index.yaml から booth id の一覧を取得
        const [indexBooth, boothsDirectory] = this.pathGenerater();
        const filePath = path.join(process.cwd(), indexBooth);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        try {
            const { booths } = yaml.load(fileContents) as { booths: string[] };

            // assets/booths/[booth_name].yamlからid列を用いてそれぞれの詳細情報を取得
            return booths.map((booth_name) => {
                const filePath = path.join(process.cwd(), boothsDirectory, `${booth_name}.yaml`);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const each_booth_data = yaml.load(fileContents) as Booth;
                return each_booth_data;
            })

        } catch (e) {
            // as キーワードを使ったので
            throw new Error(`\n\nbooths.yamlのパースに失敗しました!\n\n\n${e}`);
        }
    }

    // force: 強制的にキャッシュを更新
    public load(force?: boolean) {
        if (BoothHelper.boothsDataCache === null || force === true) {
            BoothHelper.boothsDataCache = this.loadBoothData();
        }
    }

    public getAllBooths(): Booth[] {
        if (BoothHelper.boothsDataCache === null) {
            throw new Error("\nloadメソッドよりも先に他のメソッドが呼ばれました。\nBoothHelperクラスのメソッドはloadメソッドを使用してからでないと使用できません。")
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
}
