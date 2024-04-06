from enum import Enum

class NetMsg(Enum):
        Connect = "connect"
        Disconnect = "disconnect"
        Handshake = "handshake"
        Error = "error"
        NewBlockHeaders = "newBlockHeaders"
        Logs = "logs"
        FilteredTrades = "filteredTrades"
        FilteredPairs = "filteredPairs"
