package com.example.bankingsystem.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("OPEN_ACCOUNT")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class OpenAccount extends Transaction {
	public OpenAccount(BankAccount bankAccount, BankTeller teller) {
		super(bankAccount, teller);
	}

	@Override
	public String getTransactionDescription() {
		return "Teller " + (getTeller() != null ? getTeller().getId() : "N/A") +
				" opened account " + (getBankAccount() != null ? getBankAccount().getCustomerId() : "N/A");
	}
}
