// 企画に対する型定義
// 順に有志企画・クラブ企画・学年企画・クラス企画・運営企画
export type BoothKind = 'volu' | 'club' | 'grad' | 'clas' | 'oper';

// 屋外企画　or 屋内企画
export type BoothLocation = 'out' | 'inside';

// 食品企画 or 非食品企画
export type IsFoodBooth = boolean;

export type Booth = {
  id: string;              // ex: 'amusement_volu'
  type: BoothKind;
  locate: BoothLocation;
  isFood: IsFoodBooth;
  name: string;            // ex: 'アミューズメント課'
  description: string;     // ex: 'アミューズメント課はジェットコースターを...'
  place: string;           // ex: 
};

// アイコンのパスは、"/public/booth-icons/[id].jpeg"に存在する
