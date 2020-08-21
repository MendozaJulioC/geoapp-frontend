var express = require('express');
var app = express();
const fetch = require('node-fetch');

const getDependencia = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/dependencias')
        .then(res => res.json())
        .then(data => {
            dependencias= data.data;
            console.log(dependencias)
            res.render('./dependencias/dependencia.html', {
                title: "Dependencias",
                dependencias: dependencias
            })
        })
    } catch (e) {
        console.log(e);
    }
}


const getProyectos = async (req, res) => {
    try {
        fetch('http://localhost:4000/api/proyectos')
        .then(res => res.json())
        .then(data => {
            proyectos= data.data;
            res.render('./proyectos/proyecto.html', {
                title: "Proyectos",
                proyectos: proyectos
            })
        })
    } catch (e) {
        console.log(e);
    }
}
module.exports = {
    getDependencia, getProyectos
}