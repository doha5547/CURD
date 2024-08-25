<?php
include 'conn.php';  // to make connection with database

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // check if the request method and executes code if the form is submitted via a POST   
    $id = $_POST['id']; // make variable id with method post to store value , post > is arry to store the date

    $sql = "DELETE FROM `t-crud` WHERE id=$id"; //SQL statment delete a row from the t-crud table where the id column matches the value stored in the $id variable.
    if ($conn->query($sql) === TRUE) { // executes SQL statment stored in the $sql variable using the query method that the connection of database
        echo "Record deleted successfully"; //  if row delete show msg
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error; // show error as row do not deleted
    }
}

header("Location: index.html");
?>
