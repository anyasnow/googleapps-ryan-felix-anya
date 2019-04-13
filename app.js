const express = require('express');
const morgan = require('morgan');

const playstore = require('./playstore');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {

    let results = playstore;

    const { genre, sort } = req.query;

    const allGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

    const sortingOptions = ['Rating', 'App']

    
    if (genre) {
        
        if (allGenres.includes(genre)) {
           results = results.filter(app => {
            return app.Genres === genre;
        });
        
       
        } else {
                return res.status(400).send('genre must be one of the options')
            } 
        
    }

    if (sort) {
        if (sortingOptions.includes(sort)) {
            console.log('sort2', sort)
            if (sort === 'Rating') {
                results.sort((a, b) => {

                    return b[sort] - a[sort];
                })
            }
        }   
    
        if (sort.toLowerCase() === 'app') {
                results.sort((a, b) => {
                return a['App'] > b['App'] ? 1 : a['App'] < b['App'] ? -1 : 0;
            })
        }
           
    }

      
    res.send(results);
})
    










   

app.listen(6000, () => {
    console.log('running!!!')
})