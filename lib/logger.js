
/**
 * Creates a logger function that logs messages to the console if display is true.
 *
 * @param {boolean|string} [isDisplay] - A boolean indicating whether to display log messages or not.
 * @return {Function} - The logger function that logs messages to the console.
 */
const LoggerFactory = (isDisplay) => {
    const display = (isDisplay==='true' || isDisplay === true )?? false;
    const logger = (...params)=>{
        if(display) {
            console.log(...params);
            return params;
        }
        return '';
    }

    return logger;
}

export default LoggerFactory;
