// backend/src/utils/logger.js
/**
 * Simple logger utility for backend
 * Logs messages with timestamps and levels
 * Can be extended later for file logging or external services
 */

const logLevels = {
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
  };
  
  /**
   * Logs a message to console with timestamp and level
   * @param {string} level - INFO | WARN | ERROR
   * @param {string} message - The message to log
   * @param {object} [data] - Optional additional data (e.g., error object)
   */
  export const log = (level, message, data = null) => {
    const timestamp = new Date().toISOString();
    if (data) {
      console[level === logLevels.ERROR ? "error" : "log"](
        `[${timestamp}] [${level}] ${message}`,
        data
      );
    } else {
      console[level === logLevels.ERROR ? "error" : "log"](
        `[${timestamp}] [${level}] ${message}`
      );
    }
  };
  
  /**
   * Shortcut for info logs
   */
  export const info = (message, data) => log(logLevels.INFO, message, data);
  
  /**
   * Shortcut for warnings
   */
  export const warn = (message, data) => log(logLevels.WARN, message, data);
  
  /**
   * Shortcut for errors
   */
  export const error = (message, data) => log(logLevels.ERROR, message, data);
  