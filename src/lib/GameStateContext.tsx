import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GameState {
  budget: number;
  trust: number;
  selectedEmbryo: { id: string; traits: string[] } | null;
  finalStats: { int: number; phy: number; imm: number; life: number };
  psychology: { empathy: number; ambition: number; resilience: number };
  ethicsScore: number;
}

interface GameStateContextType {
  gameState: GameState;
  updateGameState: (newData: Partial<GameState>) => void;
  resetGameState: () => void;
}

const defaultGameState: GameState = {
  budget: 100,
  trust: 50,
  selectedEmbryo: null,
  finalStats: { int: 100, phy: 100, imm: 100, life: 100 },
  psychology: { empathy: 50, ambition: 50, resilience: 50 },
  ethicsScore: 50
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  const updateGameState = (newData: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newData }));
  };

  const resetGameState = () => {
    setGameState(defaultGameState);
  };

  return (
    <GameStateContext.Provider value={{ gameState, updateGameState, resetGameState }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}