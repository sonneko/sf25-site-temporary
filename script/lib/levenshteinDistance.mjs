export default function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  // DPテーブルを作成
  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  // 初期化
  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  // DPテーブルを埋める
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // 文字が一致する場合
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 削除
          dp[i][j - 1] + 1, // 挿入
          dp[i - 1][j - 1] + 1 // 置換
        );
      }
    }
  }

  return dp[len1][len2];
}
