const HOST = "http://3.84.176.73:8080/api"
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
    return [json, response.status];
}