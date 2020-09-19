package com.avichel.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avichel.expensetracker.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
