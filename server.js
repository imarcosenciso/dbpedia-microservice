// server.js

const express = require('express');
const got = require('got');


const place = "Bufones de Pría"
const app = express()


app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/:name', (req, res) => {
    console.log('Query for place: ' + req.params.name)
    getDescriptionFromDBPedia(req.params.name)
    .then( (result) => {
        var desc = JSON.stringify(result.results.bindings[0].abstract.value)
        res.send(desc);
        console.log('Description found. Lenght: ' + desc.length)
    })
    .catch( (error) => {
        console.error("Error: " + error)
        res.send("");
    });
})

app.listen(3000, () => {
    console.log('Microservice is up on port 3000');
})


async function getDescriptionFromDBPedia(placeName){
    const url = 'https://es.dbpedia.org/sparql';
    placeName = placeName.replaceAll('_', ' ');
    console.log("Querying for " + placeName)
    const options = {
        searchParams: {
            'query': `SELECT ?abstract
            WHERE
            {
                ?place    rdfs:label "${placeName}"@es .
                ?place    dbo:abstract ?abstract
            
                FILTER ( LANG ( ?abstract ) = 'es')
            }`,
            'format': 'application/json'
        }
    }

    return await got(url, options).json();
}
