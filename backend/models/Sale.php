<?php

class Sale {
    private $conn;
    private $table = 'sales';

    public $id;
    public $product_id;
    public $quantity;
    public $total_price;
    public $sale_date;
    public $notes;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY sale_date DESC";
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
                (product_id, quantity, total_price, sale_date, notes)
                VALUES (?, ?, ?, ?, ?)";
        
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param(
            "iidss",
            $this->product_id,
            $this->quantity,
            $this->total_price,
            $this->sale_date,
            $this->notes
        );

        if (!$stmt->execute()) {
            return false;
        }

        $this->id = $this->conn->insert_id;
        return true;
    }

    public function update($id) {
        $query = "UPDATE " . $this->table . "
                SET product_id = ?, quantity = ?, total_price = ?, sale_date = ?, notes = ?
                WHERE id = ?";
        
        $stmt = $this->conn->prepare($query);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param(
            "iidssi",
            $this->product_id,
            $this->quantity,
            $this->total_price,
            $this->sale_date,
            $this->notes,
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

    public function getTotalSales() {
        $query = "SELECT SUM(total_price) as total FROM " . $this->table;
        $result = $this->conn->query($query);
        
        if (!$result) {
            return 0;
        }
        
        $row = $result->fetch_assoc();
        return $row['total'] ?? 0;
    }

    public function getTotalSalesByDate($start_date, $end_date) {
        $query = "SELECT SUM(total_price) as total FROM " . $this->table . " 
                 WHERE sale_date BETWEEN ? AND ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ss", $start_date, $end_date);
        $stmt->execute();
        
        $row = $stmt->get_result()->fetch_assoc();
        return $row['total'] ?? 0;
    }
}
?>
