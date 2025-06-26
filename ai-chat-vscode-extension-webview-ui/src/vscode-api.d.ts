/* eslint-disable @typescript-eslint/no-explicit-any */
declare function acquireVsCodeApi(): {
  postMessage: (message: any) => void;
  getState: () => any;
  setState: (state: any) => void;
};
