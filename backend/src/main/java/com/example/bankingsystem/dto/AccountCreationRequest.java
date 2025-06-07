package com.example.bankingsystem.dto;

import lombok.Data;

@Data
public class AccountCreationRequest {
	private String customerName;
	private Integer branchId;
}
