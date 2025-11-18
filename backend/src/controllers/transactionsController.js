import { sql } from "../config/db.js";



export const getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id=${userId} ORDER BY created_at DESC`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in fetching transactions", error);
    res.status(500).json("Internal Server Error");
  }
}


export const createTransaction =async (req, res) => {
  //title,amount,category,user_id
  try {
    const { title, amount, category, user_id } = req.body;
    if (!title || !amount || !category || amount === undefined) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const transaction =
      await sql`INSERT INTO transactions (user_id,title,amount,category)
    VALUES (${user_id},${title},${amount},${category}) RETURNING *`;
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error Creating the Transaction", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction" });
    }

    const result =
      await sql` DELETE FROM transactions WHERE id=${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Transactions not found" });
    }
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log("Error in deleting transactions", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getSummaryByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const balanceResult = await
    sql` SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_Id=${userId}`;

    // amount > 0 it is plus +
    const incomeResult = await
    sql` 
SELECT COALESCE(SUM(amount),0) as income
 FROM transactions
  WHERE amount > 0 AND user_id=${userId}`;

    //amount < 0 it is minus -
    const expensesResult = await
    sql` 
SELECT COALESCE(SUM(amount),0) as expense
 FROM transactions
  WHERE amount < 0 AND user_id=${userId}`;

  return res.status(200).json({
    balance:balanceResult[0].balance,
    income:incomeResult[0].income,
    expense:expensesResult[0].expense
  })
  } catch (error) {
    console.log("Error in getting Summmary", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}