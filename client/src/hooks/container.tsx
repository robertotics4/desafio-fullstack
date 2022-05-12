import React, { createContext, useCallback, useContext, useState } from 'react';

interface ContainerContextData {
  container: string;
  toggleContainer(containerName: string): void;
}

interface ContainerProviderProps {
  children?: React.ReactNode;
}

const ContainerContext = createContext<ContainerContextData>(
  {} as ContainerContextData,
);

function ContainerProvider({ children }: ContainerProviderProps) {
  const [container, setContainer] = useState('presentations');

  const toggleContainer = useCallback((containerName: string) => {
    setContainer(containerName);
  }, []);

  return (
    <ContainerContext.Provider value={{ container, toggleContainer }}>
      {children}
    </ContainerContext.Provider>
  );
}

function useContainer(): ContainerContextData {
  const context = useContext(ContainerContext);

  return context;
}

export { ContainerProvider, useContainer };
