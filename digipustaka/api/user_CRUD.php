<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
$status = $data['status'] ?? 'active';
$password = $data['password'] ?? '';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200); 
  exit;
}

include ("../db.php"); 

try {
  $input = json_decode(file_get_contents("php://input"), true);
  $action = $_GET['action'] ?? $input['action'] ?? '';

  switch ($action) {
    case 'create':
      $status = $input['status'] ?? 'active'; 
      $password = $input['password'] ?? ''; 
      $level = $input['level'] ?? 'user'; 
      $stmt = $conn->prepare("INSERT INTO users (membership_id, name, email, phone, address, membership_date, expiration_date, status, password, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("isssssssss", $input['membership_id'], $input['name'], $input['email'], $input['phone'], $input['address'], $input['membership_date'], $input['expiration_date'], $status, $password, $level);
      if ($stmt->execute()) {
        echo json_encode(["status" => "success", "id" => $conn->insert_id]);
      } else {
        throw new Exception($stmt->error);
      }
      break;

    case 'read':
      $result = $conn->query("SELECT * FROM users");
      $users = $result->fetch_all(MYSQLI_ASSOC);
      echo json_encode(["status" => "success", "data" => $users]);
      break;

    case 'update':
      $stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE membership_id = ?");
      $stmt->bind_param("ssssi", $input['name'], $input['email'], $input['phone'], $input['address'], $input['membership_id']);
      if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
      } else {
        throw new Exception($stmt->error);
      }
      break;

    case 'delete':
      $stmt = $conn->prepare("DELETE FROM users WHERE membership_id = ?");
      $stmt->bind_param("i", $input['membership_id']);
      if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
      } else {
        throw new Exception($stmt->error);
      }
      break;

    default:
      throw new Exception("Invalid action");
  }
} catch (Exception $e) {
  http_response_code(500); // Set HTTP status code to 500 for server errors
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>