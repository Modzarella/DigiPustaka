<?php
$host = "localhost";    // Laragon default host
$user = "root";         // Laragon default MySQL username
$pass = "";             // Laragon default MySQL password (empty)
$db   = "digipustaka"; // <-- replace with your actual database name

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
  die(json_encode([
    "status" => "error",
    "message" => "Database connection failed: " . $conn->connect_error
  ]));
}
?>
