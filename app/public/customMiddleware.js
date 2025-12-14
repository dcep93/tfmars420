function customMiddleware() {
  const app = document.getElementById("app");
  const iframe = document.createElement("iframe");
  iframe.src = new URL(document.currentScript.src).origin;
  iframe.hidden = true;
  app.prepend(iframe);

  function sendMessage(payload) {
    iframe.contentWindow.postMessage(payload, "*");
  }

  window.addEventListener("message", (event) => {
    if (event.data.source === "react-devtools-content-script") return;

    const f = eval(event.data.functionString);
    f(event.data.payload, iframe, sendMessage);
  });
}
customMiddleware();
