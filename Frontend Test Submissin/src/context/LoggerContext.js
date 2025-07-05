// src/context/LoggerContext.js
import React, { createContext, useContext } from 'react';

const LoggerContext = createContext();

export const LoggerProvider = ({ children }) => {
  const log = (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
    };
    console.log("[CustomLogger]", logEntry); // You can replace with API/log saving
  };

  return (
    <LoggerContext.Provider value={{ log }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => useContext(LoggerContext);
