package com.example.bankingsystem.controller;

import com.example.bankingsystem.dto.BranchCreationRequest;
import com.example.bankingsystem.dto.TellerCreationRequest;
import com.example.bankingsystem.model.BankBranch;
import com.example.bankingsystem.model.BankTeller;
import com.example.bankingsystem.service.BranchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/branches")
@RequiredArgsConstructor
public class BranchController {
	private final BranchService branchService;

	@PostMapping
	public ResponseEntity<BankBranch> addBranch(@RequestBody BranchCreationRequest request) {
		BankBranch branch = branchService.addBranch(request.getAddress(), request.getInitialFunds());
		return new ResponseEntity<>(branch, HttpStatus.CREATED);
	}

	@PostMapping("/{branchId}/tellers")
	public ResponseEntity<BankTeller> addTeller(@PathVariable Integer branchId) {
		BankTeller teller = branchService.addTellerToBranch(branchId);
		return new ResponseEntity<>(teller, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<BankBranch>> getAllBranches() {
		List<BankBranch> branches = branchService.getAllBranches();
		return ResponseEntity.ok(branches);
	}

	@GetMapping("/{branchId}")
	public ResponseEntity<BankBranch> getBranchDetails(@PathVariable Integer branchId) {
		BankBranch branch = branchService.getBranchDetails(branchId);
		return ResponseEntity.ok(branch);
	}
}
