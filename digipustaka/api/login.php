<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
  echo json_encode(["status" => "error", "message" => "Email dan password wajib diisi"]);
  exit;
}

$stmt = $conn->prepare("SELECT password, level FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode(["status" => "error", "message" => "Email tidak ditemukan"]);
  exit;
}

$user = $result->fetch_assoc();
if ($password == $user['password']) {
  echo json_encode(["status" => "success", "level" => $user['level']]);
} else {
  echo json_encode(["status" => "error", "message" => "Password salah"]);
}
?>