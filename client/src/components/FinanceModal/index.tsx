import { useCallback, useEffect, useState } from 'react';
import { usePresentations } from '../../hooks/presentations';
import Finance from '../../types/Finance';
import Presentation from '../../types/Presentation';
import Modal from '../Modal';
import { ModalContent } from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  presentation: Presentation;
}

function FinanceModal({ isOpen, setIsOpen, presentation }: ModalProps) {
  const { showFinances } = usePresentations();
  const [financeState, setFinanceState] = useState<Finance>({} as Finance);

  const convertToCurrencyFormat = useCallback((value: number) => {
    const formatCurrency = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    return formatCurrency.format(value);
  }, []);

  useEffect(() => {
    async function loadFinances() {
      const finance = await showFinances(presentation.id);

      setFinanceState(finance);
    }

    loadFinances();
  }, [presentation.id, showFinances, presentation]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      customStyles={{
        borderRadius: '8px',
        padding: '48px 0',
        width: 'fit-content',
        height: 'fit-content',
      }}
    >
      <ModalContent>
        <h1>Financeiro</h1>

        <div>
          <h2>{presentation.name}</h2>
          <p>{`Total de poltronas: ${financeState.totalSeats}`}</p>
          <p>{`Total de poltronas reservadas: ${financeState.totalReservedSeats}`}</p>
          <p>{`Total de poltronas disponíveis: ${financeState.totalAvailableSeats}`}</p>
          <p>{`Total arrecadado (bruto): ${convertToCurrencyFormat(
            financeState.totalAmount,
          )}`}</p>
          <p>{`Total de impostos: ${convertToCurrencyFormat(
            financeState.totalTaxes,
          )}`}</p>
          <p>{`Total arrecadado (líquido): ${convertToCurrencyFormat(
            financeState.totalAmountWithTaxes,
          )}`}</p>
        </div>
      </ModalContent>
    </Modal>
  );
}

export { FinanceModal };
