//export const HOST = "http://44.195.187.31:8080/api"
export const HOST = "http://localhost:8080/api"

export const Request = async (method = 'POST', route = '/', data = {}) => {
    //Request configuration
    console.log(route, method)
    const headers = {"Content-Type": "application/json", "authorization": sessionStorage.getItem("token")}
    const mode = 'cors'
    let init = {method, headers, mode};
    if (method !== 'GET') init = {...init, body: JSON.stringify(data)}
    //Actual api fetch
    const response = await fetch(HOST + route, init)
    const json = await response.json();
    return [json, response.status];
}
export const FormDataRequest = async (method = 'POST', route = '/', data = {}) => {
    //Request configuration
    const headers = {"authorization": sessionStorage.getItem("token")}
    const mode = 'cors'
    let init = {method, headers, mode};
    if (method !== 'GET') init = {...init, body: data}
    const response = await fetch(HOST + route, init)
    const json = await response.json();
    return [json, response.status];
}