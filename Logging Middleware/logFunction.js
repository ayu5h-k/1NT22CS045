const clientID = '1fad58fe-4d61-4e9c-a052-e0f7b864122a';
const clientSecret = 'QDmfJCBbJtsWAUyP';
const loggingURL = 'http://20.244.56.144/evaluation-service/logs';

const Log = async (stack, level, pkg, message) => {
  if (clientID === '1fad58fe-4d61-4e9c-a052-e0f7b864122a' || clientSecret === 'QDmfJCBbJtsWAUyP') {
    console.error('ID and secret are not set.');
    return;
  }

  const requestBody = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(loggingURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Id': clientID,
        'X-Client-Secret': clientSecret,
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    console.error('Could not send log.', error);
  }
};

const STACK_NAME = 'frontend';
const PACKAGE_NAME = 'api';


export const logInfo = (message) => {
  Log(STACK_NAME, 'info', PACKAGE_NAME, message);
};

export const logWarn = (message) => {
  Log(STACK_NAME, 'warn', PACKAGE_NAME, message);
};

export const logError = (error, contextMessage = 'An error occurred') => {
  const errorMessage = error.message || 'Unknown error.';
  const stackTrace = error.stack || 'Stack trace not available.';
  const fullMessage = `${contextMessage} | Details: ${errorMessage} | Trace: ${stackTrace}`;
  Log(STACK_NAME, 'error', PACKAGE_NAME, fullMessage);
};

export const logFatal = (pkg, error, contextMessage = 'A fatal error occurred') => {
  const errorMessage = error.message || 'Unknown error.';
  const stackTrace = error.stack || 'Stack trace not available.';
  const fullMessage = `${contextMessage} | Details: ${errorMessage} | Trace: ${stackTrace}`;
  Log(STACK_NAME, 'fatal', pkg, fullMessage);
};

export const logDebug = (pkg, message) => {
  Log(STACK_NAME, 'debug', pkg, message);
};