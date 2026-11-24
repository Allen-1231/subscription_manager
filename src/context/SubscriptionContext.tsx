import React, { createContext, useContext, useState, ReactNode } from "react";
import { Subscription } from "../types/subscription";
import { mockSubscriptions } from "../data/mockSubscriptions";

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (name: string, price: number, cycle: "month" | "year") => void;
  deleteSubscription: (id: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([...mockSubscriptions]);

  const addSubscription = (name: string, price: number, cycle: "month" | "year") => {
    const newSub: Subscription = {
      id: Date.now().toString(),
      name: name.trim(),
      price,
      cycle,
    };
    setSubscriptions((prev) => [newSub, ...prev]);
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        deleteSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscriptions must be used within a SubscriptionProvider");
  }
  return context;
};
