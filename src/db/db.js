const mongoose = require('mongoose')

mongoose.connect(process.env.ATLAS_URL).then(() => {
    console.log('Mongo connected')
}).catch(err => {
    console.log('ERROR: '+ err)
})

module.exports = mongoose