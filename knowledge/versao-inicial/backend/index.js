const app = require('express')()
const consign = require('consign')

consign()
    .then('./config/middlewaresjs')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...');
})