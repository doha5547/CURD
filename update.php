


<?php
include 'Conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $Name = $_POST['Name'];
    $Email = $_POST['Email'];
    $Phone = $_POST['Phone'];

    $sql = "UPDATE `t-crud` SET Name ='$Name', Email ='$Email', Phone ='$Phone'  WHERE id = $id ";
    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

header("Location: index.html");
?>
