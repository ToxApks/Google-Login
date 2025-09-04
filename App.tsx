import React from 'react';
import LoginCard from './components/LoginCard';

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center font-sans text-gray-800">
      <main className="flex-grow flex items-center justify-center w-full px-4">
        <LoginCard />
      </main>
      <footer className="w-full max-w-md mx-auto py-8 text-xs text-gray-600">
        <div className="flex justify-between items-center">
          <select aria-label="Change language" className="bg-transparent p-2 border border-transparent hover:border-gray-300 rounded">
            <option value="en-US">English (United States)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;