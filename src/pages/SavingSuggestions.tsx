import React from 'react';
import { 
  Coffee, 
  Wifi, 
  DollarSign, 
  ShoppingCart, 
  Truck, 
  Zap, 
  Dumbbell
} from 'lucide-react';

type Suggestion = {
  id: number;
  icon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  potentialSavings: number;
};

const SavingsSuggestions: React.FC = () => {
  const suggestions: Suggestion[] = [
    {
      id: 1,
      icon: <Coffee size={24} />,
      category: 'Entertainment',
      title: 'Coffee Habit Optimization',
      description: "Cancel your Pret A Manger monthly subscription and switch to making coffee at home. You're spending £25/month.",
      potentialSavings: 25
    },
    {
      id: 2,
      icon: <Wifi size={24} />,
      category: 'Utilities',
      title: 'Switch to a Cheaper Internet Plan',
      description: "Switch to Vodafone's 20GB plan. Save £20/month and still have enough bandwidth.",
      potentialSavings: 20
    },
    {
      id: 3,
      icon: <ShoppingCart size={24} />,
      category: 'Groceries',
      title: 'Grocery Shopping Strategy',
      description: "Switch from Waitrose to Lidl. Save £45/week on groceries while maintaining quality.",
      potentialSavings: 180
    },
    {
      id: 4,
      icon: <Truck size={24} />,
      category: 'Transportation',
      title: 'Commute Cost Reduction',
      description: "Replace Uber with public transport and bike-sharing. Save £60/month.",
      potentialSavings: 60
    },
    {
      id: 5,
      icon: <Zap size={24} />,
      category: 'Utilities',
      title: 'Energy Efficient Appliance',
      description: "Replace your old fridge with an energy-efficient model. Save £15/month on electricity.",
      potentialSavings: 15
    },
    {
      id: 6,
      icon: <Dumbbell size={24} />,
      category: 'Sports',
      title: 'Gym Membership Consolidation',
      description: "Cancel Virgin Active (£75/month) and keep Pure Gym (£40/month). Save £75/month.",
      potentialSavings: 75
    }
  ];

  const totalPotentialSavings = suggestions.reduce((sum, suggestion) => sum + suggestion.potentialSavings, 0);

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          Personalized Saving Suggestions
        </h1>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Suggestions List */}
        <div className="grid grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-50" // Set a fixed height
              style={{ cursor: 'default' }}
            >
              <div className="mr-4 flex items-center">
                {suggestion.icon}
              </div>
              <div className="flex-grow">
                {/* Category Display */}
                <div className="mb-2 text-sm text-gray-500 uppercase">{suggestion.category}</div>
                <h2 className="font-bold text-lg">{suggestion.title}</h2>
                <p className="text-sm">{suggestion.description}</p>
              </div>
              <div className="font-bold text-right">
                £{suggestion.potentialSavings}
              </div>
            </div>
          ))}
        </div>

        {/* Total Savings Info */}
        <div className="flex justify-center mt-8">
          <div className="text-center">
            <h3 className="text-lg font-medium">Total Monthly Savings</h3>
            <p className="text-2xl font-bold">£{totalPotentialSavings}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavingsSuggestions;
