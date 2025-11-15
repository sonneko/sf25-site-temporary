'use client';
import { useEffect, useState } from 'react';

// TODO: エラーレポートエンドポイントのURLを変更
// WARNING: 定数がConstantsManager呼び出しではなく分散している。クライアントサイドからのConstantsManager呼び出し非対応。
const ERROR_REPORT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxXpHa0GuI2U8-CP_OgkxMPzHQvuUmu8Iq9VpVd2K6H4g0BLqo5vwQYP8OZcSaAxzMh/exec';

type ReportProgress = 'done' | 'doing';

function generateReport(errorObj: Error, canUseDeviceInfo: boolean) {
  if (
    window === undefined ||
    window.navigator === undefined ||
    canUseDeviceInfo === false
  ) {
    return {
      errorInfo: {
        message: errorObj.message,
        name: errorObj.name,
        cause: errorObj.cause,
      },
      deviceInfo: null,
    };
  }
  const errorInfo = {
    message: errorObj.message,
    name: errorObj.name,
    cause: errorObj.cause,
  };
  const deviceInfo = {
    userAgent: window.navigator.userAgent,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    windowWidth: window.outerWidth,
    windowHeight: window.outerHeight,
    language: window.navigator.language,
    isOnline: window.navigator.onLine,
  };

  return {
    errorInfo,
    deviceInfo,
  };
}

export default function useErrorReport(
  errorObj: Error,
  canUseDeviceInfo: boolean
) {
  const [reportProgress, setReportProgress] = useState<ReportProgress>('doing');

  useEffect(() => {
    const report = generateReport(errorObj, canUseDeviceInfo);
    fetch(ERROR_REPORT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    })
      .then(() => {
        setReportProgress('done');
      })
      .catch(error => {
        // WARNING: console.errorはここでのみ許可する
        console.error(error); // eslint-disable-line no-console
      });
  }, []);

  return reportProgress;
}
