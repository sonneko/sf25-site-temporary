/**
 * イベントの色分けのためのクラス名
 */
export type EventColor = 'blue' | 'red' | 'purple' | 'orange' | 'teal';

/**
 * 単一のイベントのデータ構造
 * 開始時間と終了時間は、時間（0-23）と分（0-59）で構成されます。
 */
export interface EventData {
  id: string;
  name: string;
  stage: 'A' | 'B';
  /** イベントの開始時間 [時, 分] */
  startTime: [number, number];
  /** イベントの終了時間 [時, 分] */
  endTime: [number, number];
  color: EventColor;
}

/**
 * タイムテーブルコンポーネントに渡すPropsの型定義
 */
export interface TimetableProps {
  /**
   * 表示するすべてのイベントのリスト
   */
  events: EventData[];
  /**
   * タイムテーブルの開始時間 [時, 分]。例: [9, 0]
   */
  tableStartTime: [number, number];
  /**
   * タイムテーブルの終了時間 [時, 分]。例: [15, 30]
   */
  tableEndTime: [number, number];
  /**
   * 30分あたりのピクセル数。イベントブロックの高さ計算の基準となる値
   * デフォルトは 60px
   */
  pixelPer30Minutes?: number;
}
