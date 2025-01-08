import { ProductStatus } from '@/types/status';

// SQLite implementation (commented out to prevent runtime errors)
/*
import Database from 'better-sqlite3';

const db = new Database('status.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS product_status (
    product_name TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    old_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_name) REFERENCES product_status(product_name)
  );
`);
*/

// Placeholder functions that mirror SQLite functionality
export function getCurrentStatus(productName: string) {
  const data = JSON.parse(localStorage.getItem('product_status') || '{}');
  return data[productName];
}

export function setProductStatus(productName: string, newStatus: ProductStatus) {
  try {
    const data = JSON.parse(localStorage.getItem('product_status') || '{}');
    const currentRecord = data[productName];
    const timestamp = new Date().toISOString();

    // Update status
    data[productName] = {
      status: newStatus,
      updatedAt: timestamp
    };
    localStorage.setItem('product_status', JSON.stringify(data));

    // Add to history
    const history = JSON.parse(localStorage.getItem('status_history') || '[]');
    if (!currentRecord || currentRecord.status !== newStatus) {
      history.unshift({
        id: Date.now(),
        productName,
        oldStatus: currentRecord?.status || 'unknown',
        newStatus,
        changedAt: timestamp
      });
      localStorage.setItem('status_history', JSON.stringify(history.slice(0, 50)));
    }

    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
}

export function getStatusHistory(productName: string) {
  const history = JSON.parse(localStorage.getItem('status_history') || '[]');
  return history
    .filter((record: any) => record.productName === productName)
    .slice(0, 10);
}

// SQLite queries (commented out but ready for future use)
/*
export const queries = {
  getCurrentStatus: db.prepare(`
    SELECT status, updated_at
    FROM product_status
    WHERE product_name = ?
  `),

  setProductStatus: db.prepare(`
    INSERT OR REPLACE INTO product_status (product_name, status)
    VALUES (?, ?)
  `),

  addStatusHistory: db.prepare(`
    INSERT INTO status_history (product_name, old_status, new_status)
    VALUES (?, ?, ?)
  `),

  getStatusHistory: db.prepare(`
    SELECT *
    FROM status_history
    WHERE product_name = ?
    ORDER BY changed_at DESC
    LIMIT 10
  `)
};
*/