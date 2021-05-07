/*console.log("webpack works!")

import data1 from "./data1.js"
import data2 from "./data2.js"

import { aaa } from "./data1"
import { ccc } from "./data2"

const obj = {
    a:data1,
    b:data2
}
console.log(obj, aaa, ccc)
*/
import Main from './components/Main';

function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    new Main(container);
}

init();
import './style.css';
//import plik from './plik.png';
//document.getElementById("img1").src = plik