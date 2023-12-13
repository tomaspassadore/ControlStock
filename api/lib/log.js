const log = require("npmlog")

log.level = "info"
Object.defineProperty(log, "heading", { get: () => { return new Date().toString() } })
log.headingStyle = { bg: "", fg: "white" }

module.exports = log