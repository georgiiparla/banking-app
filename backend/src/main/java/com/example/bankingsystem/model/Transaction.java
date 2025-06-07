package com.example.bankingsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.EqualsAndHashCode;
// import lombok.AllArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "transaction_type", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@EqualsAndHashCode(exclude = { "bankAccount", "teller" }) // Exclude back references
public abstract class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    @JsonBackReference("account-transactions") // Matches the name in BankAccount
    private BankAccount bankAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teller_id")
    @JsonBackReference("teller-transactions") // Assuming Teller might have a list of transactions in future
    private BankTeller teller;

    private java.time.LocalDateTime transactionTimestamp;

    public Transaction(BankAccount bankAccount, BankTeller teller) {
        this.bankAccount = bankAccount;
        this.teller = teller;
        this.transactionTimestamp = java.time.LocalDateTime.now();
    }

    public abstract String getTransactionDescription();

    @PrePersist
    protected void onCreate() {
        transactionTimestamp = java.time.LocalDateTime.now();
    }
}
