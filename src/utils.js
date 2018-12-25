export const buildUrl = (query) => {
    if(!query) return null;
    const { url, params } = query;
    let newUrl = url;
    const esc = encodeURIComponent;
    console.log("params", params);
    const newQuery = Object.keys(params)
        .map((key) => {
            const val = params[key];
            if(val) return esc(key) + '=' + esc(val);
            else return null;
        })
        .filter(Boolean)
        .join('&');
    return `${newUrl}?${newQuery}`;
};