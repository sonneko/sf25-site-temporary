import { describe, it, expect, beforeEach } from 'vitest';
import BoothHelper from '@/lib/booth';
import { type Booth } from '@/types/booth';


describe('BoothHelper', () => {
  beforeEach(() => {
    BoothHelper.checkoutDevEnv();
    BoothHelper.load(true); // forceをtrueにして強制的に再ロード
  });

  it('should load all booths correctly when in dev environment', () => {
    const allBooths = BoothHelper.getAllBooths();

    // 期待されるブースの数を確認
    expect(allBooths).toHaveLength(6);

    // 特定のブースデータが正しく読み込まれているかを確認
    const amusementVolu = allBooths.find((booth) => booth.id === 'amusement_volu');
    expect(amusementVolu).toBeDefined();
    expect(amusementVolu?.name).toBe('アミューズメント課');
    expect(amusementVolu?.isFood).toBe(true);

    const h1AClas = allBooths.find((booth) => booth.id === 'h1A_clas');
    expect(h1AClas).toBeDefined();
    expect(h1AClas?.name).toBe('おもしろ迷路');
    expect(h1AClas?.place).toBe('教室C');
  });

  it('should return null for a non-existent booth id', () => {
    const booth = BoothHelper.getBoothById('non_existent_id');
    expect(booth).toBeNull();
  });

  it('should return the correct booth by id', () => {
    const booth = BoothHelper.getBoothById('j2A_clas');
    expect(booth).toBeDefined();
    expect(booth?.name).toBe('美味しいたこ焼き');
    expect(booth?.groupName).toBe('中2A組');
  });

  it('should filter booths by type correctly', () => {
    const clasBooths = BoothHelper.getBoothsByType('clas');
    expect(clasBooths).toHaveLength(2);
    expect(clasBooths.every((booth) => booth.type === 'clas')).toBe(true);
    expect(clasBooths.some((booth) => booth.id === 'j2A_clas')).toBe(true);
    expect(clasBooths.some((booth) => booth.id === 'h1A_clas')).toBe(true);
  });

  it('should filter booths by location correctly', () => {
    const insideBooths = BoothHelper.getBoothsByLocation('inside');
    expect(insideBooths).toHaveLength(4);
    expect(insideBooths.every((booth) => booth.locate === 'inside')).toBe(true);
    expect(insideBooths.some((booth) => booth.id === 'volunteer_club')).toBe(true);
    expect(insideBooths.some((booth) => booth.id === 'puzzle_oper')).toBe(true);
  });

  it('should return only food booths', () => {
    const foodBooths = BoothHelper.getFoodBooths();
    expect(foodBooths).toHaveLength(2);
    expect(foodBooths.every((booth) => booth.isFood === true)).toBe(true);
    expect(foodBooths.some((booth) => booth.id === 'amusement_volu')).toBe(true);
    expect(foodBooths.some((booth) => booth.id === 'j2A_clas')).toBe(true);
  });

  it('should filter booths by place correctly', () => {
    const classroomCBooths = BoothHelper.getBoothsByPlace('教室C');
    expect(classroomCBooths).toHaveLength(1);
    expect(classroomCBooths[0].id).toBe('h1A_clas');

    const noBoothsInNonExistentPlace = BoothHelper.getBoothsByPlace('存在しない場所');
    expect(noBoothsInNonExistentPlace).toHaveLength(0);
  });

  it('should search booths by keyword in name or description (case-insensitive)', () => {
    const puzzleBooths = BoothHelper.searchBooths('謎解き');
    expect(puzzleBooths).toHaveLength(1);
    expect(puzzleBooths[0].id).toBe('puzzle_oper');

    const takoyakiBooths = BoothHelper.searchBooths('たこ焼き');
    expect(takoyakiBooths).toHaveLength(1);
    expect(takoyakiBooths[0].id).toBe('j2A_clas');

    const mixedKeywordBooths = BoothHelper.searchBooths('展示');
    expect(mixedKeywordBooths).toHaveLength(2);
    expect(mixedKeywordBooths.some((booth) => booth.id === 'j1_grad')).toBe(true);
    expect(mixedKeywordBooths.some((booth) => booth.id === 'volunteer_club')).toBe(true);

    const emptySearchResult = BoothHelper.searchBooths('存在しないキーワード');
    expect(emptySearchResult).toHaveLength(0);

    const caseInsensitiveSearch = BoothHelper.searchBooths('アミューズメント');
    expect(caseInsensitiveSearch).toHaveLength(1);
    expect(caseInsensitiveSearch[0].id).toBe('amusement_volu');
  });

  it('should generate the correct booth URL', () => {
    const dummyBooth: Booth = {
      id: 'test_booth',
      type: 'clas',
      locate: 'inside',
      isFood: false,
      name: 'テストブース',
      description: 'テスト用のブースです',
      place: 'テスト場所',
      groupName: 'テストグループ',
    };
    const url = BoothHelper.generateBoothUrl(dummyBooth);
    expect(url).toBe('/booth/test_booth');
  });

  it('should throw error if methods requiring loaded data are called before load', () => {
    // キャッシュを強制的にクリアし、未ロード状態にする
    BoothHelper['boothsDataCache'] = null;

    expect(() => BoothHelper.getAllBooths()).toThrowError(
      'loadメソッドよりも先にload必須のメソッドが呼ばれました。\nBoothHelperクラスのメソッドはloadメソッドを使用してからでないと使用できません。'
    );
  });
});