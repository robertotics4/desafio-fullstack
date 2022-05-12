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
  const { showFinances, finances } = usePresentations();

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
      await showFinances(presentation.id);
    }

    loadFinances();
  }, [presentation.id, presentation, finances]);

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
          <p>{`Total de poltronas: ${finances.totalSeats}`}</p>
          <p>{`Total de poltronas reservadas: ${finances.totalReservedSeats}`}</p>
          <p>{`Total de poltronas disponíveis: ${finances.totalAvailableSeats}`}</p>
          <p>{`Total arrecadado (bruto): ${convertToCurrencyFormat(
            finances.totalAmount,
          )}`}</p>
          <p>{`Total de impostos: ${convertToCurrencyFormat(
            finances.totalTaxes,
          )}`}</p>
          <p>{`Total arrecadado (líquido): ${convertToCurrencyFormat(
            finances.totalAmountWithTaxes,
          )}`}</p>
        </div>
      </ModalContent>
    </Modal>
  );
}

export { FinanceModal };
