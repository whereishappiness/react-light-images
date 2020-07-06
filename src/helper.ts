export const FUNC_EMPTY = () => {};

export const EXP_DATAURL = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

export const isDataURL = (x: string) => x && !!x.match(EXP_DATAURL);
