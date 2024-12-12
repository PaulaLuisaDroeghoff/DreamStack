// store.ts
import { create } from 'zustand';

interface Category {
  icon: string;
  title: string;
  amount: number;
  route: string;
}


interface SavingGoal {
  id: number;
  image: string;     
  title: string;
  totalAmount: number;
  savedAmount: number;
  milestones: string[];
  progress: number;  
  route: string;   
}  

interface Store {
  savingGoals: SavingGoal[];
  addSavingGoal: (goal: SavingGoal) => void;
}

interface BudgetState {
  categories: Category[];
  totalBudget: number;
  addCategory: (newCategory: Category) => void;
  updateCategory: (title: string, amount: number) => void;
  savingGoals: SavingGoal[];
  addSavingGoal: (goal: SavingGoal) => void;
  deleteSavingGoal: (index: number) => void;
}

const useBudgetStore = create<BudgetState>((set) => ({
  categories: [
    { icon: 'ReceiptText', title: 'Utilities', amount: 75, route: '/transactions?budget=utilities' },
    { icon: 'House', title: 'Rent', amount: 1200, route: '/transactions?budget=rent' },
    { icon: 'CarFront', title: 'Transportation', amount: 63, route: '/transactions?budget=transportation' },
    { icon: 'ShoppingBasket', title: 'Groceries', amount: 510, route: '/transactions?budget=groceries' },
    { icon: 'RollerCoaster', title: 'Entertainment', amount: 267, route: '/transactions?budget=entertainment' },
    { icon: 'Dumbbell', title: 'Sports', amount: 150, route: '/transactions?budget=sports' },
  ],
  totalBudget: 2900,
  addCategory: (newCategory) =>
    set((state) => ({
      categories: [...state.categories, newCategory],
    })),
  updateCategory: (title, amount) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.title === title ? { ...cat, amount } : cat
      ),
    })),
  savingGoals: [
    {
      image: "/Umbrella.png", 
      title: 'Beach Vacation', 
      totalAmount: 2000,
      savedAmount:1400,
      milestones: ['Book flight', 'Reserve hotel'],
      progress: 70, 
      route: '/goaldetail?goal=beachvacation'
    },
    {
      image: 'Car.jpeg', 
      title: 'New Car', 
      totalAmount: 25000,
      savedAmount: 6250,
      milestones: ['Car itself', 'Insurance'],
      progress: 25, 
      route: '/goaldetail?goal=newcar'
    },
    {
      image: '/Machine.jpg', 
      title: 'Coffee Machine', 
      totalAmount: 500, 
      savedAmount: 350,
      milestones: ['Buy the machines', 'Buy coffee grinder'],
      progress: 70, 
      route: '/goaldetail?goal=coffeemachine'
    },
  ],
  addSavingGoal: (goal) =>
    set((state) => ({
      savingGoals: [...state.savingGoals, goal],
    })),
  deleteSavingGoal: (index) =>
    set((state) => ({
      savingGoals: state.savingGoals.filter((_, i) => i !== index),
    })),
}));

export default useBudgetStore;