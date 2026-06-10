import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  createReservation,
  initialReservations,
  type NewReservationInput,
  type Reservation,
} from '../data/reservationHistoryData';

const RESERVATIONS_STORAGE_KEY = 'snuh-portal-reservations';

type ReservationsContextValue = {
  reservations: Reservation[];
  addReservation: (input: NewReservationInput) => Reservation;
  cancelReservation: (id: string) => void;
};

const ReservationsContext = createContext<ReservationsContextValue | null>(null);

function loadStoredReservations(): Reservation[] {
  const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
  if (!raw) return initialReservations;

  try {
    const parsed = JSON.parse(raw) as Reservation[];
    return Array.isArray(parsed) ? parsed : initialReservations;
  } catch {
    return initialReservations;
  }
}

function persistReservations(reservations: Reservation[]) {
  localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
}

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => loadStoredReservations());

  const addReservation = (input: NewReservationInput): Reservation => {
    let createdReservation!: Reservation;

    setReservations((prev) => {
      createdReservation = createReservation(prev, input);
      const next = [createdReservation, ...prev];
      persistReservations(next);
      return next;
    });

    return createdReservation;
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) => {
      const next = prev.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: 'cancelled' as const, canCancel: false }
          : reservation,
      );
      persistReservations(next);
      return next;
    });
  };

  return (
    <ReservationsContext.Provider value={{ reservations, addReservation, cancelReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error('useReservations must be used within ReservationsProvider');
  }
  return context;
}
