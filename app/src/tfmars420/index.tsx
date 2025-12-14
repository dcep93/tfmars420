import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import prettier from "prettier/standalone";

import { useEffect, useState } from "react";
import recorded_sha from "./recorded_sha";

export default function Tfmars420() {
  const [functionString, setFunctionString] = useState<string | null>(null);
  const executePayload = (payload: any) =>
    sendMessageToParent(functionString!, payload);
  useEffect(() => {
    fToString(remoteF)
      .then((functionString) => {
        const lines = functionString.split("\n");
        lines[0] = `${lines[0].match(/\(.*\)/)![0]} => {`;
        return lines.join("\n");
      })
      .then((_functionString) => {
        setFunctionString(_functionString);
        return _functionString;
      });
  }, []);

  return functionString === null ? null : (
    <Helper executePayload={executePayload} />
  );
}

function Helper(props: { executePayload: (payload: any) => void }) {
  init(props.executePayload);
  return (
    <div onClick={() => props.executePayload({ x: 21 })}>{recorded_sha}</div>
  );
}

var initialized = false;
function init(executePayload: (payload: any) => void) {
  if (initialized) return;
  initialized = true;
  executePayload({ type: "init" });
}

function sendMessageToParent(functionString: string, payload: any) {
  window.parent.postMessage({ functionString, payload }, "*");
}

const fToString = (fn: (...args: any[]) => any): Promise<string> => {
  return prettier.format(fn.toString(), {
    parser: "babel",
    plugins: [parserEstree, parserBabel],
  });
};

//

window.addEventListener("message", (event) => {
  const payload = event.data;
  alert(JSON.stringify(payload));
});

function remoteF(
  payload: any,
  iFrame: HTMLIFrameElement,
  _sendMessageToChild: (payload: any) => null
) {
  if (payload.type === "init") {
    iFrame.style.width = "100vW";
    iFrame.style.height = "10em";
    iFrame.style.border = "0";
    iFrame.hidden = false;
  }
}
