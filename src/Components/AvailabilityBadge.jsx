import { useEffect, useState } from 'react';

const STORAGE_KEY = 'availability-badge-dismissed-until';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ENTRANCE_DELAY_MS = 600;

const isDismissed = () => {
  try {
    const until = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
    return Date.now() < until;
  } catch {
    return false;
  }
};

export const AvailabilityBadge = () => {
  const [dismissed, setDismissed] = useState(isDismissed);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed) return undefined;
    const t = setTimeout(() => setVisible(true), ENTRANCE_DELAY_MS);
    return () => clearTimeout(t);
  }, [dismissed]);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now() + SEVEN_DAYS_MS));
    } catch {
      // localStorage unavailable (private mode, quota) — dismissal is session-only
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <a
      href="#contact"
      className={`availability-badge${visible ? ' is-visible' : ''}`}
      aria-label="Available for work — click to send a message"
    >
      <span className="availability-badge__dot" aria-hidden="true" />
      <span className="availability-badge__text">
        <strong>Available for work</strong>
        <span className="availability-badge__sub">Replies within 24 hours</span>
      </span>
      <button
        type="button"
        className="availability-badge__dismiss"
        aria-label="Hide availability badge for one week"
        onClick={handleDismiss}
      >
        ×
      </button>
    </a>
  );
};
