CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(200),
    department_name VARCHAR(200),
    price DOUBLE,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Noodles", "Grocery", 2.99, 300), ("Chocolate Cake", "Grocery", 6.99, 20),
			("The Beatles - White Album", "Music", 16.30, 10), ("Razor Scooter", "Rad stuff", 60, 4),
            ("Snowman (used - like new)", "Christmas", 1.50, 2), ("Left Glove (pair)", "Clothing", 11, 6),
            ("Pretty Good Flashlight", "Tools", 9.99, 20), ("Yaesu FT-60 Ham Radio", "Enthusiast", 170, 10),
            ("The Black Angels - Passover", "Music", 8.99, 5), ("Golf Balls", "Rad stuff", .61, 9999);
            
SELECT * FROM products;