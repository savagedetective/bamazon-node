//required npm modules
var mysql = require("mysql");
var inquirer = require("inquirer");

//sql connection. This is clearly my actual password.
var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"

});

//connects to the database and starts the actual functionality
connection.connect(function(err) {

    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log("You are connected to Bamazon. This is the product we have on hand. Let's get crackin.\n");
    chooseItem();

});

function chooseItem() {

    //grabs and displays every item in the database
    connection.query("SELECT * FROM products", function(err, results) {

        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(" | " + results[i].item_id + " -- " + results[i].product_name);
        }

        //asks two questions in succession before making use of user inputs
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

                //zeros in on the product selected by the user, in this case based upon product ID
                connection.query("SELECT * FROM products WHERE ?", {item_id : answer.chooseID}, function (err, res) {

                    //cleans up the data we're dealing with
                    var productUser = answer.chooseID;
                    var quantityUser = answer.quantity;
                    var productDB = res[0].product_name;
                    var quantityDB = res[0].stock_quantity;
                    var productCost = res[0].price;

                    if (err) throw err;

                    //if you enter an ID that doesn't exist you get a chance to start over
                    if (res.length === 0) {
                        console.log("\nYou have selected an invalid product ID. Please select a valid product ID\n")
                        chooseItem();
                    }

                    else {

                        //checks that quantity requested is in stock
                        if (quantityUser > quantityDB) {
                            console.log("We're sorry. We do not have enough of that product. Please try again.")
                            chooseItem();
                        }

                        else {

                            //cleans up the math we're dealing with
                            var newQuantity = quantityDB - quantityUser;
                            var totalCost = (quantityUser * productCost).toFixed(2);

                            //updates the existing stock number based on what was ordered.
                            connection.query("UPDATE products SET ? WHERE ?",

                                [
                                    {
                                        stock_quantity : newQuantity
                                    },

                                    {
                                        product_name : productDB
                                    }

                                ],

                                function(err, res) {

                                    if (err) throw err;
                                                                
                                    console.log("Congratulations. Your purchase is successful.")
                                    console.log("You have purchased " + quantityUser + " of the item, " + productDB + ", for a total of $" + totalCost + ".");
                                    console.log("Please come back soon.");
                                
                            //closes connection query
                            });

                            connection.end();
                        }
                    }

                //closes connection query
                });

            //closes .then function
            });
    
    //closes initial query function
    });
}