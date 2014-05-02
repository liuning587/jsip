

window.onload = function() {
  var ppp = new PPP();
  ppp.registerProtocol(LCP);

  var ws = new WebSocket("ws://127.0.0.1:8080/websocket");
  ws.binaryType = 'arraybuffer';
  ws.onmessage = function (msg) {
    var buffer = new Uint8Array(msg.data);
    if(buffer[0] == PPP_FLAG && buffer[buffer.length-1] == PPP_FLAG)
      ppp.parse_ppp(buffer.subarray(1, -1));
    //ws.send(evt.data); //loop data back
  };
}
