type ConnectionListener = (isWakingUp: boolean) => void;

const SLOW_REQUEST_THRESHOLD_MS = 3000;

let connectionListener: ConnectionListener | null = null;
let slowRequestCount = 0;

export const registerConnectionListener = (listener: ConnectionListener) => {
    connectionListener = listener;
};

/** Call when a request starts. Returns a handle to pass into `stop()`. */
export const trackRequestStart = () => {
    const handle = { wasSlow: false, timerId: 0 };
    handle.timerId = window.setTimeout(() => {
        handle.wasSlow = true;
        slowRequestCount += 1;
        if (slowRequestCount === 1) connectionListener?.(true);
    }, SLOW_REQUEST_THRESHOLD_MS);
    return handle;
};

/** Call when a request finishes (success or error). */
export const trackRequestEnd = (handle: {
    wasSlow: boolean;
    timerId: number;
}) => {
    clearTimeout(handle.timerId);
    if (!handle.wasSlow) return;
    slowRequestCount = Math.max(0, slowRequestCount - 1);
    if (slowRequestCount === 0) connectionListener?.(false);
};
