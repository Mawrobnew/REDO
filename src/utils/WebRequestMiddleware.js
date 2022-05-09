const HOST = "http://localhost:8080/api"
export const Request = async (method = 'POST', route = '/', data = {}) => {
    //Request configuration
    console.log(route,method)
    const headers = {"Content-Type": "application/json","authorization": sessionStorage.getItem("token")}
    const mode = 'cors'
    let init = {method, headers, mode};
    if (method !== 'GET') init = {...init, body: JSON.stringify(data)}
    //Actual api fetch
    const response = await fetch(HOST + route, init)
    const json = await response.json();
    console.log(json)
    //TODO: HANDLE ERRORS
    return [json, response.status];
}