import styles from './Timetable.module.scss';
import { EventData, TimetableProps } from './types';

/**
 * [時, 分]のタプルを分に変換するヘルパー関数
 * @param time - [時, 分]のタプル
 * @returns 00:00からの経過分数
 */
const timeToMinutes = (time: [number, number]): number => {
  return time[0] * 60 + time[1];
};

/**
 * 分を HH:MM 形式の文字列に変換するヘルパー関数
 * @param minutes - 00:00からの経過分数
 * @returns HH:MM 形式の文字列
 */
const minutesToDisplayTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * タイムテーブルのイベントブロックを描画するReactコンポーネント。
 * Next.jsのサーバーコンポーネントとして動作するため、フックは使用しません。
 * イベントデータに基づいて、各イベントの表示位置と高さを計算します。
 *
 * @param props - TimetableProps
 * @returns タイムテーブルのReact要素
 */
export const Timetable = ({
  events,
  tableStartTime,
  tableEndTime,
  pixelPer30Minutes = 60,
}: TimetableProps) => {
  const START_MINUTES = timeToMinutes(tableStartTime);
  const END_MINUTES = timeToMinutes(tableEndTime);
  const TOTAL_DURATION_MINUTES = END_MINUTES - START_MINUTES;

  // タイムテーブル全体の高さを計算 (30分ごとのピクセル数に基づき)
  const TOTAL_HEIGHT = (TOTAL_DURATION_MINUTES / 30) * pixelPer30Minutes;

  /**
   * イベントデータから、そのブロックの top と height スタイルを計算する関数
   * @param event - EventData オブジェクト
   * @returns スタイルオブジェクト
   */
  const calculateEventStyles = (event: EventData): React.CSSProperties => {
    const eventStartMinutes = timeToMinutes(event.startTime);
    const eventEndMinutes = timeToMinutes(event.endTime);

    const offsetMinutes = eventStartMinutes - START_MINUTES;
    const durationMinutes = eventEndMinutes - eventStartMinutes;

    // top: 00:00 からのオフセット分数を 30分ごとのピクセル数に変換
    const top = (offsetMinutes / 30) * pixelPer30Minutes;

    // height: イベントの所要分数を 30分ごとのピクセル数に変換
    const height = (durationMinutes / 30) * pixelPer30Minutes;

    // スタイルオブジェクトを返す
    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  /**
   * タイムマーカーのリストを生成する関数
   */
  const renderTimeMarkers = () => {
    const markers: JSX.Element[] = [];
    let currentMinutes = START_MINUTES;

    while (currentMinutes <= END_MINUTES) {
      markers.push(
        <div key={currentMinutes} className={styles.timeMarker}>
          {minutesToDisplayTime(currentMinutes)}
        </div>
      );
      currentMinutes += 30;
    }
    return markers;
  };

  /**
   * 指定されたステージのイベントブロックをレンダリングする関数
   */
  const renderStageEvents = (stage: 'A' | 'B') => {
    return events
      .filter(event => event.stage === stage)
      .map(event => {
        const styles = calculateEventStyles(event);
        const colorClass = styles[`color${event.color.charAt(0).toUpperCase()}${event.color.slice(1)}` as keyof typeof styles] || styles.colorBlue; // 例: colorBlue
        
        // 開始時間と終了時間の表示文字列
        const displayTime = `${minutesToDisplayTime(timeToMinutes(event.startTime))} - ${minutesToDisplayTime(timeToMinutes(event.endTime))}`;

        return (
          <div
            key={event.id}
            className={`${styles.eventBlock} ${colorClass}`}
            style={styles}
            title={`${event.name} (${displayTime})`}
          >
            <div className={styles.eventTitle}>{event.name}</div>
            <div className={styles.eventTime}>{displayTime}</div>
          </div>
        );
      });
  };

  return (
    <div className={styles.timetableContainer} style={{'--marker-height': `${pixelPer30Minutes}px`} as React.CSSProperties}>
      
      {/* 1. 時間軸 */}
      <div className={styles.timeAxis}>
        {renderTimeMarkers()}
      </div>

      {/* 2. スケジュール表示エリア */}
      <div className={styles.stageSchedule}>
        
        {/* Stage A */}
        <div className={styles.stage}>
          <div className={styles.stageHeader}>ステージ A</div>
          <div className={styles.eventGrid} style={{ height: `${TOTAL_HEIGHT}px` }}>
            {renderStageEvents('A')}
          </div>
        </div>

        {/* Stage B */}
        <div className={styles.stage}>
          <div className={styles.stageHeader}>ステージ B</div>
          <div className={styles.eventGrid} style={{ height: `${TOTAL_HEIGHT}px` }}>
            {renderStageEvents('B')}
          </div>
        </div>

      </div>
    </div>
  );
};
