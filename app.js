//jshint esversion:6 

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.get("/", function(req,res) {

    let today = new Date();
    
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newListItems: items});
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work", newListItems: workItems});
})

app.post("/", function(req,res) {
    let item = req.body.newItem;

    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect('/');
    }
})

app.listen(3000, function() {
    console.log("Session started at 3000");
});