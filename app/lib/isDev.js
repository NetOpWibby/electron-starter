"use strict";



//  V A R I A B L E S

const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isEnvSet = "ELECTRON_IS_DEV" in process.env;



//  E X P O R T

export default isEnvSet ?
  getFromEnv :
  (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath));
