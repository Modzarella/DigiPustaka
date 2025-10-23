<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_clean(); // Hapus buffer lama
ob_start(); // Aktifkan buffer output baru
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

error_reporting(E_ALL);
ini_set('display_errors', 0);


include("../db.php");

$search = $_GET['search'] ?? '';
$genre_id = $_GET['genre_id'] ?? '';
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

// Base query
$query = "SELECT DISTINCT b.id, b.title, b.author, b.year_published, b.rating, b.url_image, b.isbn, b.publisher, b.stock, b.description 
          FROM books b";

$params = [];
$types = "";

// Filter genre
if (!empty($genre_id)) {
    $query .= " INNER JOIN book_genres bg ON b.id = bg.book_id WHERE bg.genre_id = ?";
    $params[] = (int)$genre_id;
    $types .= "i";
} else {
    $query .= " WHERE 1=1";
}

// Filter search
if (!empty($search)) {
    $query .= " AND (b.title LIKE ? OR b.author LIKE ?)";
    $searchParam = "%$search%";
    $params[] = $searchParam;
    $params[] = $searchParam;
    $types .= "ss";
}

// Urutkan hasil
$query .= " ORDER BY b.rating DESC LIMIT ? OFFSET ?";
$params[] = $limit;
$params[] = $offset;
$types .= "ii";

// Jalankan query
$stmt = $conn->prepare($query);
if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Query preparation failed: " . $conn->error]);
    exit;
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$book = [];
while ($row = $result->fetch_assoc()) {
    $genreQuery = "SELECT g.id, g.name 
                   FROM genres g 
                   INNER JOIN book_genres bg ON g.id = bg.genre_id 
                   WHERE bg.book_id = ?
                   ORDER BY g.name ASC";
    $genreStmt = $conn->prepare($genreQuery);
    $genreStmt->bind_param("i", $row['id']);
    $genreStmt->execute();
    $genreResult = $genreStmt->get_result();

    $genres = [];
    while ($genreRow = $genreResult->fetch_assoc()) {
        $genres[] = [
            'id' => (int)$genreRow['id'],
            'name' => $genreRow['name']
        ];
    }
    $genreStmt->close();

    $book[] = [
        'id' => (int)$row['id'],
        'title' => $row['title'],
        'author' => $row['author'],
        'year' => $row['year_published'],
        'rating' => (float)$row['rating'],
        'coverUrl' => $row['url_image'],
        'isbn' => $row['isbn'],
        'publisher' => $row['publisher'],
        'stock' => (int)$row['stock'],
        'description' => $row['description'],
        'genres' => $genres
    ];
}

echo json_encode([
  "status" => "success",
  "data" => $book,
  "total" => count($book)
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;

$stmt->close();
$conn->close();
?>
