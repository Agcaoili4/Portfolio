import { useEffect } from 'react';

export const PrivacyPolicy = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-2xl"
        style={{
          maxWidth: '640px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          color: 'var(--text)',
          fontSize: '0.9rem',
          lineHeight: 1.65,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close privacy policy"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 id="privacy-policy-title" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem', fontFamily: 'Archivo, sans-serif' }}>
          Privacy Policy
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          Last updated: June 7, 2026
        </p>

        <Section title="Who this applies to">
          This policy covers the contact form on <strong>agca.dev</strong>, operated by Jansen
          Agcaoili (referred to as "I" or "me" below). If you submit a message through the form,
          this describes what happens to the information you send.
        </Section>

        <Section title="What I collect">
          When you submit the contact form, I receive:
          <ul style={listStyle}>
            <li><strong>Name, email address, and message</strong> — what you type into the form.</li>
            <li><strong>IP address and browser User-Agent</strong> — captured automatically for spam
              prevention and abuse investigation only.</li>
            <li><strong>A Cloudflare Turnstile token</strong> — issued by Cloudflare's bot-protection
              widget. It is verified against Cloudflare and discarded immediately afterward.</li>
          </ul>
          I do <strong>not</strong> use tracking cookies, analytics scripts, or profile-building tools
          on this form.
        </Section>

        <Section title="Why I collect it">
          To read and respond to your message, and to prevent the form from being abused by bots or
          spam. That's it — no marketing, no resale, no profiling.
        </Section>

        <Section title="Where it's stored (the services I use)">
          Your message passes through and is stored by the following providers, each of which is
          industry-standard and operates under its own privacy policy:
          <ul style={listStyle}>
            <li><strong>Vercel</strong> (frontend hosting) — serves the page you're reading.</li>
            <li><strong>Cloudflare Turnstile</strong> — verifies you're not a bot.</li>
            <li><strong>Render</strong> (US-West) — hosts the API that receives your submission.</li>
            <li><strong>Neon</strong> (PostgreSQL, US-West) — the database that stores submissions.</li>
            <li><strong>Resend</strong> — delivers your message to my inbox as an email.</li>
          </ul>
          Data is stored in the United States. By submitting the form you consent to that
          cross-border transfer.
        </Section>

        <Section title="How long I keep it">
          Submissions are retained for as long as needed to respond to you, and in any case no longer
          than <strong>12 months</strong> from the date of submission. You can ask me to delete it
          sooner (see "Your rights" below).
        </Section>

        <Section title="Your rights">
          You can email me at <a href="mailto:contact@agca.dev" style={linkStyle}>contact@agca.dev</a> to:
          <ul style={listStyle}>
            <li>Request a copy of the data you submitted.</li>
            <li>Request that I delete your submission.</li>
            <li>Ask any other question about how I handle the information you sent.</li>
          </ul>
          I'll respond within a reasonable timeframe — usually within a few days.
        </Section>

        <Section title="Security">
          The form uses HTTPS end to end. Submissions are stored on managed services with industry-
          standard encryption at rest and in transit. I do not share, sell, or expose your data to any
          third party beyond the service providers listed above.
        </Section>

        <Section title="Changes to this policy">
          If I make material changes, I'll update the "Last updated" date at the top and, where
          appropriate, note the change here. Continued use of the contact form after an update
          implies acceptance of the revised policy.
        </Section>

        <Section title="Contact">
          Questions or concerns about this policy:{' '}
          <a href="mailto:contact@agca.dev" style={linkStyle}>contact@agca.dev</a>.
        </Section>
      </div>
    </div>
  );
};

const listStyle = { paddingLeft: '1.25rem', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' };
const linkStyle = { color: 'var(--text-accent)', textDecoration: 'underline' };

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '1.25rem' }}>
    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text)', fontFamily: 'Archivo, sans-serif' }}>
      {title}
    </h3>
    <div style={{ color: 'var(--text-secondary)' }}>{children}</div>
  </section>
);
