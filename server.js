const express= require('express')
const mongoose=require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodeOverride =require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/articles',{
    useNewUrlParser: true, useUnifiedTopology:true 
})
.then(()=>console.log('connected to mongodb'))
.catch(err=>console.error('couldent connect to database',err));




app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodeOverride('_method'))


app.get('/',async(req,res)=>{
    let articles = await Article.find().sort({createdAt:'desc'})
    
    res.render('articles/index', {articles:articles})
})

app.use('/articles',articleRouter)

app.listen(2000,()=>console.log(`port 3000 listening`))