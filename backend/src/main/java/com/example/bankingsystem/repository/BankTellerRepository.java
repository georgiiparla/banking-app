package com.example.bankingsystem.repository;

import com.example.bankingsystem.model.BankTeller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BankTellerRepository extends JpaRepository<BankTeller, Integer> {
	List<BankTeller> findByBankBranchId(Integer branchId);
}
