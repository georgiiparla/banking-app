package com.example.bankingsystem.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer customerId;

	private String name;
	private Double balance = 0.0;

	@OneToMany(mappedBy = "bankAccount", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference("account-transactions") // Give a unique name if multiple managed refs exist for Transaction
	private List<Transaction> transactions = new ArrayList<>(); // Initialize to avoid NullPointerExceptions
}
