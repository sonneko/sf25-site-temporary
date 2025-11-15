import Timetable from '@/components/TimeTable/TimeTable';
import type { Booth } from '../../types/booth';
import type { EventData } from '../../components/TimeTable/types';
import { getAllBooths } from '../../lib/BoothsProvider';

const musicTimeInfo: {
  [key in Booth['booth_id']]: {
    startTime: [number, number];
    endTime: [number, number];
    color: EventData['color'];
  };
} = {
  'club-29_a': { startTime: [9, 0], endTime: [9, 50], color: 'blue' },
  'club-31_a': { startTime: [10, 0], endTime: [10, 30], color: 'orange' },
  'volu-19': { startTime: [11, 10], endTime: [11, 40], color: 'purple' },
  'volu-21': { startTime: [10, 40], endTime: [11, 0], color: 'red' },
  'club-29_b': { startTime: [11, 40], endTime: [13, 45], color: 'teal' },
  'club-31_b': { startTime: [14, 0], endTime: [14, 30], color: 'blue' },
  'club-30': { startTime: [14, 30], endTime: [15, 0], color: 'orange' },
  'club-29_c': { startTime: [15, 0], endTime: [15, 30], color: 'purple' },
};

const gym1TimeInfo: {
  [key in Booth['booth_id']]: {
    startTime: [number, number];
    endTime: [number, number];
    color: EventData['color'];
  };
} = {
  'grade-1a': { startTime: [9, 15], endTime: [10, 15], color: 'red' },
  'grade-2a': { startTime: [10, 30], endTime: [11, 15], color: 'orange' },
  'volu-15': { startTime: [11, 30], endTime: [11, 52], color: 'purple' },
  'volu-16': { startTime: [11, 55], endTime: [12, 4], color: 'blue' },
  'volu-17': { startTime: [12, 6], endTime: [12, 25], color: 'teal' },
  'volu-18': { startTime: [12, 29], endTime: [12, 38], color: 'red' },
  'volu-20': { startTime: [12, 41], endTime: [12, 56], color: 'orange' },
  'volu-25': { startTime: [13, 1], endTime: [13, 11], color: 'purple' },
  'volu-30': { startTime: [13, 14], endTime: [13, 24], color: 'blue' },
  'volu-22': { startTime: [13, 27], endTime: [13, 39], color: 'teal' },
  'volu-23': { startTime: [13, 42], endTime: [13, 57], color: 'red' },
  'volu-24': { startTime: [14, 0], endTime: [14, 14], color: 'orange' },
  'volu-28': { startTime: [14, 17], endTime: [14, 31], color: 'purple' },
  'volu-26': { startTime: [14, 34], endTime: [14, 46], color: 'blue' },
  'volu-27': { startTime: [14, 49], endTime: [15, 8], color: 'teal' },
  'volu-29': { startTime: [15, 11], endTime: [15, 27], color: 'red' },
};

export default async function StagePage() {
  const events: EventData[] = [
    ...(await Promise.all(
      Object.entries(musicTimeInfo).map(
        async ([id, { startTime, endTime, color }]) => ({
          startTime,
          endTime,
          id,
          name: (await getAllBooths()).find(
            item => item.booth_id === id.split('_')[0]
          )?.booth_name as string,
          color,
          stage: 'music' as const,
        })
      )
    )),

    ...(await Promise.all(
      Object.entries(gym1TimeInfo).map(
        async ([id, { startTime, endTime, color }]) => ({
          startTime,
          endTime,
          id,
          name: (await getAllBooths()).find(
            item => item.booth_id === id.split('_')[0]
          )?.booth_name as string,
          color,
          stage: 'gym1' as const,
        })
      )
    )),
  ];
  return (
    <>
      <h1>イベントタイムテーブル</h1>
      <p>
        場合によって時間が後ろに変動する可能性がございます。ご了承ください。
      </p>
      <Timetable
        events={events}
        tableStartTime={[9, 0]}
        tableEndTime={[15, 30]}
        pixelPer30Minutes={150}
      />
    </>
  );
}
