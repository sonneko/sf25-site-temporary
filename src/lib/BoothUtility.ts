import type { BoothTag } from '../types/booth';

/**
 * tag_idを日本語表記に変換する
 * @param tagId tag_id
 * @returns 変換後の文字列
 */
export function convertBoothTagInfo(tagId: BoothTag): string {
  if (tagId === 'attraction') {
    return 'アトラクション';
  } else if (tagId === 'exhibition') {
    return '展示';
  } else if (tagId === 'food') {
    return '食べ物';
  } else if (tagId === 'game/experience') {
    return 'ゲーム・体験';
  } else if (tagId === 'magazine') {
    return '部誌販売/配布';
  } else if (tagId === 'movie') {
    return '映像';
  } else if (tagId === 'performance') {
    return 'パフォーマンス';
  } else if (tagId === 'store') {
    return '販売';
  } else {
    return '';
  }
}
