var mysql = require("mysql");
var inquirer = require("inquirer");

var command = process.argv[2];
var nodeArgs = process.argv;

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"

});

connection.connect(function(err) {

    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log("You are connected to Bamazon. This is the product we have on hand. Let's get crackin.");
    chooseItem();

});

function chooseItem() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(" | " + results[i].item_id + " -- " + results[i].product_name);
        }

        inquirer
            .prompt([
                {
                    name:"chooseID",
                    type: "input",
                    message: "Choose the ID of the item you'd like to purchase.",
                },

                {
                    name: "quantity",
                    type: "input",
                    message: "How many units would you like to purchase?"
                }
            ])
            .then(function(answer) {


            //closes .then function
            });
    
    //closes initial query function
    });
}