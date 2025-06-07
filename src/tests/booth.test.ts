import { describe, it, expect, beforeEach } from 'vitest';
import BoothHelper from '../lib/booth';

describe('BoothHelper (integration with assets_test)', () => {
  let helper: BoothHelper;

  beforeEach(() => {
    helper = new BoothHelper();
    helper.checkoutTestEnv();
    helper.load(true); // 強制的にキャッシュを更新して毎回同じ状態に
  });

  it('loads all booths from index', () => {
    const booths = helper.getAllBooths();
    expect(booths.length).toBe(6);
  });

  it('returns correct booth by ID', () => {
    const booth = helper.getBoothById('puzzle_oper');
    expect(booth).toBeDefined();
    expect(booth?.name).toBe('なぞとき本部');
  });

  it('returns null for unknown ID', () => {
    const booth = helper.getBoothById('unknown_id');
    expect(booth).toBeNull();
  });

  it('filters booths by type', () => {
    const volu = helper.getBoothsByType('volu');
    expect(volu.length).toBe(1);
    expect(volu[0].id).toBe('amusement_volu');
  });

  it('filters booths by location', () => {
    const outside = helper.getBoothsByLocation('out');
    const inside = helper.getBoothsByLocation('inside');

    expect(outside.map(b => b.id)).toEqual(expect.arrayContaining(['amusement_volu', 'j1_grad']));
    expect(inside.length).toBe(4);
  });

  it('filters food booths', () => {
    const foodBooths = helper.getFoodBooths();
    const ids = foodBooths.map(b => b.id);
    expect(ids).toContain('amusement_volu');
    expect(ids).toContain('j2A_clas');
    expect(foodBooths.length).toBe(2);
  });

  it('filters booths by place', () => {
    const booths = helper.getBoothsByPlace('教室A');
    expect(booths.length).toBe(1);
    expect(booths[0].id).toBe('volunteer_club');
  });

  it('performs case-insensitive keyword search', () => {
    const results = helper.searchBooths('たこ');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('j2A_clas');
  });

  it('searches in both name and description', () => {
    const results = helper.searchBooths('展示');
    const ids = results.map(b => b.id);
    expect(ids).toEqual(expect.arrayContaining(['volunteer_club', 'j1_grad']));
  });
});
