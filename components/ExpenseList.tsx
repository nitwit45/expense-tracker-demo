import React from 'react';
import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';
import { Expense } from '../types/expense';

type Props = {
  data: Expense[];
  onDelete: (id: string) => void;
};

export default function ExpenseList({ data, onDelete }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem item={item} onDelete={onDelete} />}
    />
  );
}
