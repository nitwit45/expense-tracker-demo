import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalSummary from './components/TotalSummary';
import { Expense } from './types/expense';

const STORAGE_KEY = '@expenses';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [view, setView] = useState<'add' | 'list'>('add');

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setExpenses(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load expenses', e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (e) {
        console.error('Failed to save expenses', e);
      }
    };
    saveData();
  }, [expenses]);

  const handleAdd = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
    setView('list');
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Expense Tracker Lite</Text>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, view === 'add' && styles.activeTab]}
          onPress={() => setView('add')}
        >
          <Text style={styles.tabText}>Add Expense</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, view === 'list' && styles.activeTab]}
          onPress={() => setView('list')}
        >
          <Text style={styles.tabText}>View Expenses</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {view === 'add' ? (
          <AddExpenseForm onAdd={handleAdd} />
        ) : (
          <>
            <TotalSummary expenses={expenses} />
            {expenses.length === 0 ? (
              <Text style={styles.empty}>No expenses added yet.</Text>
            ) : (
              <ExpenseList data={expenses} onDelete={handleDelete} />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 6,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007aff',
  },
  tabText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});
