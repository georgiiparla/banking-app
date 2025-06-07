package com.example.bankingsystem.dto;

import lombok.Data;

@Data
public class BranchCreationRequest {
	private String address;
	private Double initialFunds;
}
