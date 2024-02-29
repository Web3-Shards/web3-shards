import asyncio
import socketio
import time
from netmsg import NetMsg
from chains import Chain

# Create a receiver function
def data_handler(dataType, data):
    print("received data:", dataType, ": ", data)

# Initialize socketio and shards settings
sio = socketio.Client(logger=False)
shardsSocketSettings={
    "url": "wss://wiretap.web3shards.io",
    "chain": Chain.Ethereum.value,
    "auth": {
        "shardsApiKey": "",
        "shardsWebsocketId": ""
    },
    "subscriber": data_handler
}

# Setup event handlers
@sio.on(NetMsg.Connect.value)
def _on_connect():
    print("[ShardsSocketClient]", NetMsg.Connect.value)
    sio.emit(NetMsg.Handshake.value, {
        "apiKey": shardsSocketSettings["auth"]["shardsApiKey"],
        "roomId": shardsSocketSettings["auth"]["shardsWebsocketId"]
    })

@sio.on(NetMsg.Disconnect.value)
def _on_disconnect():
    print("[ShardsSocketClient]", NetMsg.Disconnect.value)

@sio.on(NetMsg.Error.value)
def _on_error(err):
    print("[ShardsSocketClient]", NetMsg.Error.value, ":", err)

@sio.on(NetMsg.Handshake.value)
def _on_handshake(data):
    print("[ShardsSocketClient] authenticated. waiting for data...")

@sio.on(NetMsg.FilteredTrades.value)
def _on_filtered_trades(data):
    shardsSocketSettings["subscriber"](NetMsg.FilteredTrades.value, data)

# Create listener
def listen():
    url = shardsSocketSettings["url"]
    path = "/"+shardsSocketSettings["chain"]
    sio.connect(url, socketio_path=path, transports=["websocket"])
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("execution interrupted. disconnecting")
        sio.disconnect()
        
listen()