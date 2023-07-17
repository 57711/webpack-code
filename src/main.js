import { sum } from "./utils/sum.js";
import "./css/main.css"

const res = sum(1,2,3,4)
console.log(res)

function errorHandler (err, {moduleId, dependencyId}){
    console.error(err, moduleId, dependencyId)
}
function successHandler (info){
    console.log('HMR success', info)
}
if(module.hot){
    module.hot.accept('./utils/sum.js', successHandler, errorHandler)
    module.hot.accept()
}
