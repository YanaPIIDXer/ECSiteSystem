import conn from "./BasicConnection";

// TODO:本番環境では接続先を変える
const ENDPOINT = "http://localhost:3001";

export async function get(api) {
    const url = ENDPOINT + api;
    var res = {
        status: 0,
        json: null
    };
    try {
        const result = await conn.get(url);
        res.status = result.status;
        res.json = JSON.parse(JSON.stringify(result.data));            
    } catch (e) {
        console.log(e);
    }
    return res;
}

export async function post(api, params) {
    const url = ENDPOINT + api;
    var res = {
        status: 0,
        json: null
    };
    try {
        const result = await conn.post(url, params);
        res.status = result.status;
        res.json = JSON.parse(JSON.stringify(result.data));            
    } catch (e) {
        console.log(e);
    }
    return res;
}