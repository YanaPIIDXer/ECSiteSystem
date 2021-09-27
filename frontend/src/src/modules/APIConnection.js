import conn from "./BasicConnection";

const ENDPOINT = "http://localhost:3000/";

export async function get(api) {
    const url = ENDPOINT + api;
    var json = null;
    try {
        const result = await conn.get(url);
        if (result.status != 200) {
            alert("StatusCode:" + result.status);
            return null;
        }
        json = JSON.parse(JSON.stringify(result.data));    
    } catch (e) {
        alert(e);
        return null;
    }
    return json;
}

export async function post(api, params) {
    const url = ENDPOINT + api;
    var json = null;
    try {
        const result = await conn.post(url, params);
        if (result.status != 200) {
            alert("StatusCode:" + result.status);
            return null;
        }
        json = JSON.parse(JSON.stringify(result.data));            
    } catch (e) {
        alert(e);
        return null;
    }
    return json;
}