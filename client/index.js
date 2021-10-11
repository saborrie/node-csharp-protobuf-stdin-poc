const proto = require("protobufjs");
const path = require("path");
const cp = require("child_process");

const server = cp.exec("dotnet run", {
  stdio: "pipe",
  cwd: path.resolve(__dirname, "../server"),
});

const callbacks = [];

// hack to convice the server.stdout to return binary buffers
if (server.stdout._readableState) {
  delete server.stdout._readableState.decoder;
  delete server.stdout._readableState.encoding;
}

async function main() {
  const root = await proto.load(path.resolve(__dirname, "../Formatter.proto"));
  const FormatRequest = root.lookupType("FormatRequest");
  const FormatResponse = root.lookupType("FormatResponse");

  // every time the stream becomes readable, emit all the events from it.
  server.stdout.on("readable", function () {
    let sizeb;
    while (null !== (sizeb = server.stdout.read(4))) {
      const size = sizeb.readInt32LE();
      const bytes = server.stdout.read(size);
      var message = FormatResponse.decode(bytes);
      const callback = callbacks.shift();
      if (callback) {
        callback(message);
      }
    }
  });

  function sendMessage(request) {
    const requestBuffer = FormatRequest.encodeDelimited(request).finish();
    var response = new Promise((resolve) => {
      callbacks.push(resolve);
    });
    server.stdin.write(requestBuffer);
    return response;
  }

  console.log(await sendMessage({ content: "message 1", setting1: true }));
  console.log(await sendMessage({ content: "message 2", setting1: true }));
  console.log(await sendMessage({ content: "message 3", setting1: true }));
  console.log(await sendMessage({ content: "message 4", setting1: true }));
  console.log(await sendMessage({ content: "message 5", setting1: true }));
  console.log(await sendMessage({ content: "message 6", setting1: true }));
  console.log(await sendMessage({ content: "message 7", setting1: true }));
  console.log(await sendMessage({ content: "message 8", setting1: true }));
}

main();
