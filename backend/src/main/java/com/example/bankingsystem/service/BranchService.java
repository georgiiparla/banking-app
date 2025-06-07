package com.example.bankingsystem.service;

import com.example.bankingsystem.model.BankBranch;
import com.example.bankingsystem.model.BankTeller;
import com.example.bankingsystem.repository.BankBranchRepository;
import com.example.bankingsystem.repository.BankTellerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchService {
	private final BankBranchRepository bankBranchRepository;
	private final BankTellerRepository bankTellerRepository;

	@Transactional
	public BankBranch addBranch(String address, Double initialFunds) {
		BankBranch branch = new BankBranch();
		branch.setAddress(address);
		branch.setCashOnHand(initialFunds);
		return bankBranchRepository.save(branch);
	}

	@Transactional
	public BankTeller addTellerToBranch(Integer branchId) {
		BankBranch branch = bankBranchRepository.findById(branchId)
				.orElseThrow(() -> new RuntimeException("Branch not found with id: " + branchId));
		BankTeller teller = new BankTeller();
		teller.setBankBranch(branch);
		return bankTellerRepository.save(teller);
	}

	public List<BankBranch> getAllBranches() {
		return bankBranchRepository.findAll();
	}

	public BankBranch getBranchDetails(Integer branchId) {
		return bankBranchRepository.findById(branchId)
				.orElseThrow(() -> new RuntimeException("Branch not found with id: " + branchId));
	}
}
