import "@testing-library/jest-dom/vitest";
import nodeCrypto from "crypto";

if (typeof globalThis.crypto === "undefined") {
  Object.defineProperty(globalThis, "crypto", {
    value: {
      randomUUID: () => nodeCrypto.randomUUID(),
    },
    writable: false,
  });
}
