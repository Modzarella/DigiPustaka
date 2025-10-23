<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$password = $data['password'] ?? '';
$address = $data['address'] ?? '';
$level = $data['level'] ?? 'user'; 
$status = $data['status'] ?? 'active';
$membership_id = $data['membership_id'] ?? 0;
$membership_date = $data['membership_date'] ?? date('Y-m-d');
$expiration_date = $data['expiration_date'] ?? date('Y-m-d', strtotime('+1 year'));

if (!$name || !$email) {
  echo json_encode(["status" => "error", "message" => "Name and email are required"]);
  exit;
}

$check = $conn->prepare("SELECT email FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
  echo json_encode(["status" => "error", "message" => "Email already exists"]);
  exit;
}
$check->close();

$stmt = $conn->prepare("INSERT INTO users 
(name, email, phone, address, password, level, status, membership_id, membership_date, expiration_date) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssssiss", 
  $name, $email, $phone, $address, $password, $level, $status, 
  $membership_id, $membership_date, $expiration_date
);


if ($stmt->execute()) {
  echo json_encode(["status" => "success", "message" => "User added successfully!"]);
} else {
  echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
