<?php

class Product {
    private $conn;
    private $table = 'products';

    public $id;
    public $name;
    public $category;
    public $quantity;
    public $price;
    public $description;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $result = $this->conn->query($query);
        
        if (!$result) {
            return false;
        }
        
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        
        return $stmt->get_result()->fetch_assoc();
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . "
                (name, category, quantity, price, description)
                VALUES (?, ?, ?, ?, ?)";
        
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param(
            "ssids",
            $this->name,
            $this->category,
            $this->quantity,
            $this->price,
            $this->description
        );

        if (!$stmt->execute()) {
            return false;
        }

        $this->id = $this->conn->insert_id;
        return true;
    }

    public function update($id) {
        $query = "UPDATE " . $this->table . "
                SET name = ?, category = ?, quantity = ?, price = ?, description = ?
                WHERE id = ?";
        
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param(
            "ssidsi",
            $this->name,
            $this->category,
            $this->quantity,
            $this->price,
            $this->description,
            $id
        );

        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        
        return $stmt->execute();
    }

    public function getLowStock($threshold = 10) {
        $query = "SELECT * FROM " . $this->table . " WHERE quantity < ? ORDER BY quantity ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $threshold);
        $stmt->execute();
        
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
?>
