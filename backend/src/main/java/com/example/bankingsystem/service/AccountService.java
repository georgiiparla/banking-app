package com.example.bankingsystem.service;

import com.example.bankingsystem.model.BankBranch;
import com.example.bankingsystem.model.*;
import com.example.bankingsystem.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountService {
	private final BankAccountRepository bankAccountRepository;
	private final TransactionRepository transactionRepository;
	private final BankTellerRepository bankTellerRepository;
	private final BankBranchRepository bankBranchRepository;
	private final Random random = new Random();

	@Transactional
	public BankAccount openAccount(String customerName, Integer branchId) {
		BankBranch branch = bankBranchRepository.findById(branchId)
				.orElseThrow(() -> new RuntimeException("Branch not found with id: " + branchId));

		List<BankTeller> tellers = bankTellerRepository.findByBankBranchId(branchId);
		if (tellers.isEmpty()) {
			throw new RuntimeException("Branch " + branchId + " does not have any tellers.");
		}
		BankTeller teller = tellers.get(random.nextInt(tellers.size()));

		BankAccount newAccount = new BankAccount();
		newAccount.setName(customerName);
		newAccount.setBalance(0.0);
		BankAccount savedAccount = bankAccountRepository.save(newAccount);

		OpenAccount openAccountTransaction = new OpenAccount(savedAccount, teller);
		transactionRepository.save(openAccountTransaction);

		return savedAccount;
	}

	@Transactional
	public BankAccount deposit(Integer accountId, Double amount, Integer branchId) {
		BankAccount account = bankAccountRepository.findById(accountId)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));

		BankBranch branch = bankBranchRepository.findById(branchId)
				.orElseThrow(() -> new RuntimeException("Branch not found with id: " + branchId));

		List<BankTeller> tellers = bankTellerRepository.findByBankBranchId(branchId);
		if (tellers.isEmpty()) {
			throw new RuntimeException("Branch " + branchId + " does not have any tellers.");
		}
		BankTeller teller = tellers.get(random.nextInt(tellers.size()));

		account.setBalance(account.getBalance() + amount);
		branch.setCashOnHand(branch.getCashOnHand() + amount); // Branch cash increases
		bankBranchRepository.save(branch); // Save branch changes

		Deposit depositTransaction = new Deposit(account, teller, amount);
		transactionRepository.save(depositTransaction);

		return bankAccountRepository.save(account);
	}

	@Transactional
	public BankAccount withdraw(Integer accountId, Double amount, Integer branchId) {
		BankAccount account = bankAccountRepository.findById(accountId)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));

		BankBranch branch = bankBranchRepository.findById(branchId)
				.orElseThrow(() -> new RuntimeException("Branch not found with id: " + branchId));

		if (amount > account.getBalance()) {
			throw new RuntimeException("Insufficient funds in account " + accountId);
		}
		if (amount > branch.getCashOnHand()) {
			throw new RuntimeException("Branch " + branchId + " does not have enough cash for this withdrawal.");
		}

		List<BankTeller> tellers = bankTellerRepository.findByBankBranchId(branchId);
		if (tellers.isEmpty()) {
			throw new RuntimeException("Branch " + branchId + " does not have any tellers.");
		}
		BankTeller teller = tellers.get(random.nextInt(tellers.size()));

		account.setBalance(account.getBalance() - amount);
		branch.setCashOnHand(branch.getCashOnHand() - amount); // Branch cash decreases
		bankBranchRepository.save(branch); // Save branch changes

		Withdrawal withdrawalTransaction = new Withdrawal(account, teller, amount);
		transactionRepository.save(withdrawalTransaction);

		return bankAccountRepository.save(account);
	}

	public BankAccount getAccountDetails(Integer accountId) {
		return bankAccountRepository.findById(accountId)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
	}

	public List<Transaction> getAccountTransactions(Integer accountId) {
		bankAccountRepository.findById(accountId)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
		return transactionRepository.findByBankAccountCustomerIdOrderByTransactionTimestampDesc(accountId);
	}

	public List<BankAccount> getAllAccounts() {
		return bankAccountRepository.findAll();
	}
}
