import { useState } from "react";
import EmptyTransactions from "./EmptyTransactions";
import TransactionCard from "./TransactionCard";
import TransactionActionMenu from "./TransactionActionMenu";
import { Transaction } from "@/types/customer";
import { deleteTransaction } from "@/services/transaction";

interface Props {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
  onRefresh?: () => void;
}

export default function TransactionList({ transactions, onEdit, onDelete, onRefresh }: Props) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLongPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsActionMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsActionMenuOpen(false);
    setSelectedTransaction(null);
  };

  const handleEdit = (transaction: Transaction) => {
    onEdit?.(transaction);
  };

  const handleDelete = async (transaction: Transaction) => {
    try {
      setIsDeleting(true);
      await deleteTransaction(transaction._id);
      onDelete?.(transaction);
      onRefresh?.();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold">Transactions</h2>

      {transactions.length === 0 ? (
        <EmptyTransactions />
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              onLongPress={() => handleLongPress(transaction)}
            />
          ))}
        </div>
      )}

      {selectedTransaction && (
        <TransactionActionMenu
          transaction={selectedTransaction}
          isOpen={isActionMenuOpen}
          onClose={handleCloseMenu}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </section>
  );
}
