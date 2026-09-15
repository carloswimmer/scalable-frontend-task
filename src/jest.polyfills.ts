import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

if (typeof global.BroadcastChannel === "undefined") {
  class BroadcastChannelMock {
    name: string;
    onmessage: ((event: MessageEvent) => void) | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage(_message: unknown) {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  }

  global.BroadcastChannel =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BroadcastChannelMock as any;
}

if (typeof global.TransformStream === "undefined") {
  global.TransformStream =
    TransformStream as typeof global.TransformStream;
}

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global.TextDecoder = TextDecoder  as typeof global.TextDecoder;
}