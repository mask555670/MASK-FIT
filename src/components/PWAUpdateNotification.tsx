import React, { useEffect, useState } from 'react';

const PWAUpdateNotification: React.FC = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (!reg) return;
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setShow(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShow(false);
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 0,
      right: 0,
      margin: '0 auto',
      maxWidth: 400,
      background: 'rgba(30,0,0,0.95)',
      color: '#fff',
      border: '2px solid #ff0000',
      borderRadius: 12,
      padding: '1em 1.5em',
      zIndex: 9999,
      textAlign: 'center',
      boxShadow: '0 4px 24px #0008',
      fontSize: 18
    }}>
      Доступна новая версия сайта!<br />
      <button onClick={reloadPage} style={{
        marginTop: 12,
        background: '#ff0000',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '0.5em 1.2em',
        fontWeight: 700,
        cursor: 'pointer',
        fontSize: 16
      }}>
        Обновить
      </button>
    </div>
  );
};

export default PWAUpdateNotification; 