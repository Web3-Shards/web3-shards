module.exports = {
    /*
    Token State Policy:
        -This policy defines active, stale, & dead tokens based on lastTradeTime
    */
    TOKEN_STATE: {
        // 0 <= ACTIVE < 5 minutes
        ACTIVE: 0,
        // 5 minutes <= STALE < 7 days
        STALE: 300,
        // DEAD >= 7 days
        DEAD: 86400*7
    },
}