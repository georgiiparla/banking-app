DROP TABLE IF EXISTS transaction CASCADE;
DROP TABLE IF EXISTS bank_account CASCADE;
DROP TABLE IF EXISTS bank_teller CASCADE;
DROP TABLE IF EXISTS bank_branch CASCADE;

CREATE TABLE bank_branch (
    id SERIAL PRIMARY KEY,
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    cash_on_hand NUMERIC(15, 2) DEFAULT 0.00
);

CREATE TABLE bank_teller (
    id SERIAL PRIMARY KEY,
    bank_branch_id INTEGER REFERENCES bank_branch(id)
);

CREATE TABLE bank_account (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance NUMERIC(15, 2) DEFAULT 0.00
);

CREATE TABLE transaction (
    id BIGSERIAL PRIMARY KEY,
    transaction_type VARCHAR(31) NOT NULL, -- Discriminator column
    customer_id INTEGER REFERENCES bank_account(customer_id),
    teller_id INTEGER REFERENCES bank_teller(id),
    amount NUMERIC(15, 2), -- Used by Deposit and Withdrawal
    transaction_timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_teller_branch_id ON bank_teller(bank_branch_id);
CREATE INDEX IF NOT EXISTS idx_transaction_account_id ON transaction(customer_id);
CREATE INDEX IF NOT EXISTS idx_transaction_teller_id ON transaction(teller_id);

INSERT INTO bank_branch (address, cash_on_hand) VALUES ('123 Main St', 10000.00);
INSERT INTO bank_branch (address, cash_on_hand) VALUES ('456 Elm St', 15000.00);

INSERT INTO bank_teller (bank_branch_id) VALUES (1);
INSERT INTO bank_teller (bank_branch_id) VALUES (1);
INSERT INTO bank_teller (bank_branch_id) VALUES (2);
