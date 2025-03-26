import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense } from '../types/expense';

export default function TotalSummary({ expenses }: { expenses: Expense[] }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0f7fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
});
