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
export const DownloadFileRequest = async (method, route = '/') => {
    const headers = {"authorization": sessionStorage.getItem("token")}
    const mode = 'cors'
    const init = {method, headers, mode};
    const response = await fetch(HOST + route, init);
    const blob = await response.blob()
    console.log(blob)
    const url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    const date = new Date().toString()
    const extension = response.headers.get('Content-Type').split('/')[1]
    a.download = date + "." + extension;
    a.click();
    a.remove();  //afterwards we remove the element again
}