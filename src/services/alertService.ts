import { Subject } from 'rxjs';

interface Alert {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
}

const alertSubject = new Subject<Alert>();

export const alertService = {
  sendAlert: (message: string, type: Alert['type'], timeout?: number) =>
    alertSubject.next({ message, type, timeout }),
  onAlert: () => alertSubject.asObservable(),
};
