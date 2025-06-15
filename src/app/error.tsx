'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <h1>This is error page. </h1>
      <p>Something went wrong:{error.message}</p>
      <button onClick={reset}>Reset</button>
    </>
  );
}
