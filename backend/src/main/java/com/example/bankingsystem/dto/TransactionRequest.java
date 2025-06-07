package com.example.bankingsystem.dto;

import lombok.Data;

@Data
public class TransactionRequest {
	private Integer accountId;
	private Double amount;
	private Integer branchId; // Branch performing the transaction (for teller assignment and cash check)
	// tellerId could be passed if a specific teller is known, otherwise service can
	// assign one
}
