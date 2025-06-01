CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    cuisine VARCHAR(100),
    contact VARCHAR(100),
    created_at BIGINT,
    updated_at BIGINT,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    created_at BIGINT,
    updated_at BIGINT,
    deleted_at TIMESTAMP
);
