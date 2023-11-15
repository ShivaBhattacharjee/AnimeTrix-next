import NodeCache from "node-cache";

export const myCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
