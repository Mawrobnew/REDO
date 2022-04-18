const HOST = "http://localhost:8080/api"
export const Request = async (method = 'POST', route = '/', data = {}) => {
    //Request configuration
    const headers = {"Content-Type": "application/json"}
    const mode = 'cors'
    let init = {method, headers, mode};
    if (method !== 'GET') init = {...init, body: JSON.stringify(data)}
    //Actual api fetch
    const response = await fetch(HOST + route, init)
    const json = await response.json();
    //TODO: HANDLE ERRORS
    return json;
}