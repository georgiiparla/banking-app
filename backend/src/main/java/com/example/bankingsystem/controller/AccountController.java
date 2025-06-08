package com.example.bankingsystem.controller;

import com.example.bankingsystem.dto.AccountCreationRequest;
import com.example.bankingsystem.dto.TransactionRequest;
import com.example.bankingsystem.model.BankAccount;
import com.example.bankingsystem.model.Transaction;
import com.example.bankingsystem.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
	private final AccountService accountService;

	@PostMapping
	public ResponseEntity<BankAccount> openAccount(@RequestBody AccountCreationRequest request) {
		BankAccount account = accountService.openAccount(request.getCustomerName(), request.getBranchId());
		return new ResponseEntity<>(account, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<BankAccount>> getAllAccounts() {
		List<BankAccount> accounts = accountService.getAllAccounts();
		return ResponseEntity.ok(accounts);
	}

	@GetMapping("/{accountId}")
	public ResponseEntity<BankAccount> getAccountDetails(@PathVariable Integer accountId) {
		BankAccount account = accountService.getAccountDetails(accountId);
		return ResponseEntity.ok(account);
	}

	@PostMapping("/{accountId}/deposit")
	public ResponseEntity<BankAccount> deposit(@PathVariable Integer accountId,
			@RequestBody TransactionRequest request) {
		BankAccount account = accountService.deposit(accountId, request.getAmount(), request.getBranchId());
		return ResponseEntity.ok(account);
	}

	@PostMapping("/{accountId}/withdraw")
	public ResponseEntity<BankAccount> withdraw(@PathVariable Integer accountId,
			@RequestBody TransactionRequest request) {
		BankAccount account = accountService.withdraw(accountId, request.getAmount(), request.getBranchId());
		return ResponseEntity.ok(account);
	}

	@GetMapping("/{accountId}/transactions")
	public ResponseEntity<List<Transaction>> getAccountTransactions(@PathVariable Integer accountId) {
		List<Transaction> transactions = accountService.getAccountTransactions(accountId);
		return ResponseEntity.ok(transactions);
	}
}
