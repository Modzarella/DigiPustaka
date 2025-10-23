<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "koneksi.php"; // your DB connection

$input = json_decode(file_get_contents("php://input"), true);
$action = $_GET['action'] ?? $input['action'] ?? '';

switch ($action) {
  case 'create':
    $stmt = $conn->prepare("INSERT INTO books (genre_id, title, publisher, year_published, stock, created_at, updated_at, deleted_at, url_image, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
      "ssssssssss",
      $input['genre_id'],
      $input['title'],
      $input['publisher'],
      $input['year_published'],
      $input['stock'],
      $input['created_at'],
      $input['updated_at'],
      $input['deleted_at'],
      $input['url_image'],
      $input['author']
    );
    if ($stmt->execute()) {
      echo json_encode(["status" => "success", "id" => $conn->insert_id]);
    } else {
      echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    break;

  case 'read':
    $result = $conn->query("SELECT * FROM books");
    $books = [];
    while ($row = $result->fetch_assoc()) {
      $books[] = $row;
    }
    echo json_encode(["status" => "success", "books" => $books]);
    break;

  case 'update':
    $stmt = $conn->prepare("UPDATE books SET genre_id=?, title=?, publisher=?, year_published=?, stock=?, updated_at=?, deleted_at=?, url_image=?, author=? WHERE id=?");
    $stmt->bind_param(
      "sssssssssi",
      $input['genre_id'],
      $input['title'],
      $input['publisher'],
      $input['year_published'],
      $input['stock'],
      $input['updated_at'],
      $input['deleted_at'],
      $input['url_image'],
      $input['author'],
      $input['id']
    );
    if ($stmt->execute()) {
      echo json_encode(["status" => "success"]);
    } else {
      echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    break;

  case 'delete':
    $stmt = $conn->prepare("DELETE FROM books WHERE id=?");
    $stmt->bind_param("i", $input['id']);
    if ($stmt->execute()) {
      echo json_encode(["status" => "success"]);
    } else {
      echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    break;

  default:
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
?>