//export const HOST = "http://44.195.187.31:8080/"
export const HOST = "http://localhost:8080/"
export const FileHost = "http://localhost:9000/"
export const Request = async (method = 'POST', route = '/', data = {}) => {
    //Request configuration
    console.log(route, method)
    const headers = {"Content-Type": "application/json", "authorization": sessionStorage.getItem("token")}
    const mode = 'cors'
    let init = {method, headers, mode};
    if (method !== 'GET') init = {...init, body: JSON.stringify(data)}
    //Actual api fetch
    const response = await fetch(HOST + 'api'+ route, init)
    const json = await response.json();
    return [json, response.status];
}