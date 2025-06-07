package com.example.bankingsystem.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("DEPOSIT")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Deposit extends Transaction {
	private Double amount;

	public Deposit(BankAccount bankAccount, BankTeller teller, Double amount) {
		super(bankAccount, teller);
		this.amount = amount;
	}

	@Override
	public String getTransactionDescription() {
		return "Teller " + (getTeller() != null ? getTeller().getId() : "N/A") +
				" deposited " + amount +
				" to account " + (getBankAccount() != null ? getBankAccount().getCustomerId() : "N/A");
	}
}
