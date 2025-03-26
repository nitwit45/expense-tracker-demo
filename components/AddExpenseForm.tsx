import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Expense } from '../types/expense';

type Props = {
  onAdd: (expense: Expense) => void;
};

export default function AddExpenseForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = () => {
    if (!title || !amount) return;
    onAdd({
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    });
    setTitle('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.input}>
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Travel" value="Travel" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
    form: {
        paddingBottom: 20,
      },
      input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
});
