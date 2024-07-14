'use client';
import React, { useEffect, useState } from 'react';

const alertTypes = {
  info: 'alert alert-info',
  success: 'alert alert-success',
  warning: 'alert alert-warning',
  error: 'alert alert-error',
};

interface ToastProps {
  message: string;
  type: keyof typeof alertTypes;
  duration?: number;
}

const Toast = ({ message, type, duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      <div className={alertTypes[type]}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
