# Web3 Shards Socket Client

## Version
Python 3.12

## Packages
pip install "python-socketio[asyncio_client]"
pip install "websocket-client"

## Setup

Fill in your api key and your websocket ID.

```python
shardsSocketSettings={
    "url": "wss://wiretap.web3shards.io",
    "chain": Chain.Ethereum.value,
    "auth": {
        "shardsApiKey": "",         # <-- Add your api key here
        "shardsWebsocketId": "" # <-- Add your socket id here
    },
    "subscriber": data_handler
}
```

Try it out with `python socket_client.py`.

Expect the following output:
```
[ShardsSocketClient] connect
[ShardsSocketClient] authenticated. waiting for data...
received data: filteredTrades :  {'tx': '0xbe8bcc9ac6b56440c3e01c1b9e1c7c81117e27e6938f92368cc39d5b4608a3b2', 'version': '3', 'type': 'buy', 'backingCurrencyType': 'weth', 'backingCurrencyValue': 45.57532302171122, 'blockNumber': 19329479, 'tokensTransferred': 152560.633857, 'timestamp': 1709164979, 'backingCurrencyPrice': 3383.48, 'usd': 154203.19393749948, 'price': 1.0209290470493664, 'pair': '0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b', 'token': '0xdac17f958d2ee523a2206206994597c13d831ec7', 'origin': '0xae2fc483527b8ef99eb5d9b44875f005ba1fae13', 'chain': 'eth'}
...
...
execution interrupted. disconnecting
```