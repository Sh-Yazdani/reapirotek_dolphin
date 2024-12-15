export const sleep = (ms: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms))
