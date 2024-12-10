import React from 'react';
import { 
  Coffee, 
  Wifi, 
  DollarSign, 
  ShoppingCart, 
  Truck, 
  Zap,
  Tag 
} from 'lucide-react';

interface Suggestion {
  id: number;
  icon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  potentialSavings: number;
}

const SavingsSuggestions: React.FC = () => {
  // Highly specific mock suggestions
  const suggestions: Suggestion[] = [
    {
      id: 1,
      icon: <Coffee size={24} />,
      category: 'Entertainment',
      title: 'Coffee Habit Optimization',
      description: 'Cancel your Pret A Manger monthly coffee subscription and switch to making coffee at home. You are currently spending £65/month on this.',
      potentialSavings: 65
    },
    {
      id: 2,
      icon: <Wifi size={24} />,
      category: 'Utilities',
      title: 'Internet Plan Reduction',
      description: 'Switch from your current Virgin Media 500MB plan to their 100MB plan. You will save £20 monthly and still have more than enough bandwidth.',
      potentialSavings: 240
    },
    {
      id: 3,
      icon: <DollarSign size={24} />,
      category: 'Sports',
      title: 'Gym Membership Consolidation',
      description: 'Cancel your Virgin Active membership (£75/month) and keep Pure Gym (£40/month). You rarely use Virgin Active and Pure Gym meets all your fitness needs.',
      potentialSavings: 75
    },
    {
      id: 4,
      icon: <ShoppingCart size={24} />,
      category: 'Groceries',
      title: 'Grocery Shopping Strategy',
      description: 'Switch from Waitrose to Lidl for your weekly shop. Based on your current spending, you could save £45 per week on essentially the same groceries.',
      potentialSavings: 180
    },
    {
      id: 5,
      icon: <Truck size={24} />,
      category: 'Transportation',
      title: 'Commute Cost Reduction',
      description: 'Replace your current Uber commute with a combination of public transport and occasional bike sharing. Potential monthly saving of £60.',
      potentialSavings: 60
    },
    {
      id: 6,
      icon: <Zap size={24} />,
      category: 'Utilities',
      title: 'Energy Efficiency Upgrade',
      description: 'Replace your old refrigerator with an A+++ energy-rated model. Initial cost is offset by £25 monthly savings on electricity.',
      potentialSavings: 25
    }
  ];

  const totalPotentialSavings = suggestions.reduce((sum, suggestion) => sum + suggestion.potentialSavings, 0);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md w-full mx-auto">
        {/* Header */}
        <div className="pb-4 mb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold flex items-center">
            <DollarSign size={24} className="mr-2" />
            AI Savings Suggestions
          </h1>
        </div>

        {/* Total Potential Savings */}
        <div className="text-center mb-6">
          <p className="text-lg font-bold">
            Start saving: £{totalPotentialSavings} per month
          </p>
          <p className="text-sm text-gray-600">
            Personalized suggestions based on your specific spending
          </p>
        </div>

        {/* Suggestions List */}
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="p-4 flex items-center bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mr-4">
                {suggestion.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <Tag size={16} className="mr-2 text-gray-500" />
                  <span className="text-xs uppercase text-gray-600">
                    {suggestion.category}
                  </span>
                </div>
                <h2 className="font-bold">{suggestion.title}</h2>
                <p className="text-sm">{suggestion.description}</p>
              </div>
              <div className="font-bold">
                £{suggestion.potentialSavings}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsSuggestions;