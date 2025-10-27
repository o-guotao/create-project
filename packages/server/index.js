const express = require('express');
const cors = require('cors');

const {mockList} = require('./mock/mockList')

const app = express()

const router = express.Router()


app.use(cors())

router.get('/api/recommend', (req, res) => {
    let {pageSize, startNum} = req.query || {}
    
    startNum = parseInt(startNum, 10);
    pageSize = parseInt(pageSize, 10);

    const end = startNum + pageSize
    res.json({
        list: mockList.slice(startNum, end),
        total: mockList.length,
        startNum,
        pageSize,
    })


})
app.use(router)

app.listen(3010, () => {
    console.log('server is running at 3010')
})
