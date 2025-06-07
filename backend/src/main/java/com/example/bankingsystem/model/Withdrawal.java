package com.example.bankingsystem.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("WITHDRAWAL")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Withdrawal extends Transaction {
    private Double amount;

    public Withdrawal(BankAccount bankAccount, BankTeller teller, Double amount) {
        super(bankAccount, teller);
        this.amount = amount;
    }

    @Override
    public String getTransactionDescription() {
        return "Teller " + (getTeller() != null ? getTeller().getId() : "N/A") +
                " withdrew " + amount +
                " from account " + (getBankAccount() != null ? getBankAccount().getCustomerId() : "N/A");
    }
}
