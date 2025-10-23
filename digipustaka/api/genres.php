<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_clean(); // Hapus buffer lama
ob_start(); // Aktifkan buffer output baru
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

include("../db.php");

// Ambil semua genre dan jumlah buku di tiap genre
$query = "SELECT g.id, g.name, COUNT(bg.book_id) AS bookCount
          FROM genres g
          LEFT JOIN book_genres bg ON g.id = bg.genre_id
          GROUP BY g.id, g.name
          ORDER BY g.name ASC";

$result = $conn->query($query);
$genres = [];

while ($row = $result->fetch_assoc()) {
    $genres[] = [
        'id' => (int)$row['id'],
        'name' => $row['name'],
        'bookCount' => (int)$row['bookCount']
    ];
}

echo json_encode([
    "status" => "success",
    "data" => $genres
]);

$conn->close();
?>
