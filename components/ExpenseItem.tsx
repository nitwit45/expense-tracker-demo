import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense } from '../types/expense';

type Props = {
  item: Expense;
  onDelete: (id: string) => void;
};

export default function ExpenseItem({ item, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.category} • ${item.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { fontWeight: '600', fontSize: 16 },
  details: { color: '#555', marginBottom: 2 },
  date: { fontSize: 12, color: '#888' },
  delete: { fontSize: 20, color: '#cc0000' },
});
