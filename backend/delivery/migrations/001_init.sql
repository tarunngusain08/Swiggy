
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TYPE delivery_status AS ENUM ('assigned', 'picked_up', 'delivered', 'cancelled');

CREATE TABLE IF NOT EXISTS deliveries (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) NOT NULL,
    partner_id INTEGER NOT NULL REFERENCES partners(id),
    pickup VARCHAR(255) NOT NULL,
    dropoff VARCHAR(255) NOT NULL,
    status delivery_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);