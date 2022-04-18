const HOST = "http://localhost:8080/api"
export const Request = (method = 'GET', route = '/', data = {}, action) => {
    console.log(JSON.stringify(data))
    fetch(HOST + route, {
         method,
         headers: { "Content-Type": "application/json" },
         mode: 'cors',
         body: JSON.stringify(data),
    }).then((result) => {
        console.log(result) // TODO handle the error with the supposed business logic
        if(result.status!==200) console.log("something very bad happened")
        action(result)
    }).catch((error) => {console.log(error)})
}