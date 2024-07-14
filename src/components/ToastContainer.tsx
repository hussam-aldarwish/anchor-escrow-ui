'use client';

import React, { useEffect, useState } from 'react';
import { alertService } from '../services/alertService';
import Toast from './Toast';

interface Alert {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
}

const ToastContainer = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const subscription = alertService.onAlert().subscribe((alert) => {
      setAlerts((alerts) => [...alerts, alert]);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-0 right-0 p-4">
      {alerts.map((alert, index) => (
        <Toast
          key={index}
          message={alert.message}
          type={alert.type}
          duration={alert.timeout}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
