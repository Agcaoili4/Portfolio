import { useEffect, useRef, useState } from 'react';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Agcaoili4',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jansen-agcaoili/',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = 'Name is required.';
    if (!fields.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Enter a valid email.';
    if (!fields.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    // Simulate async — swap this out for your C# API call later
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('sent');
    setFields({ name: '', email: '', message: '' });
  };

  const revealClass = () =>
    `transition-all duration-500 ease-out ${
      visible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-6'
    }`;

  const revealStyle = (delay = 0) => ({ transitionDelay: visible ? `${delay}ms` : '0ms' });

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-blob w-[500px] h-[500px] opacity-10 bg-indigo-600 bottom-0 right-0 translate-x-1/4 translate-y-1/4" />

      <div className="max-w-xl mx-auto flex flex-col items-center gap-10 relative z-10">

        {/* Heading */}
        <div className={`text-center flex flex-col gap-3 ${revealClass()}`} style={revealStyle(0)}>
          <h2 className="section-title">Get in Touch</h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Have a project in mind or just want to say hello? My inbox is open.
          </p>
        </div>

        {/* Form */}
        {status === 'sent' ? (
          <div
            className={`w-full glass-card rounded-2xl p-10 flex flex-col items-center gap-4 text-center ${revealClass()}`}
            style={revealStyle(80)}
          >
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg" style={{ fontFamily: 'Archivo, sans-serif' }}>Message Sent!</p>
            <p className="text-slate-400 text-sm">Thanks for reaching out — I'll get back to you soon.</p>
            <button
              onClick={() => setStatus('idle')}
              className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors cursor-pointer mt-1"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            className={`w-full flex flex-col gap-4 ${revealClass()}`}
            style={revealStyle(80)}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="contact-name" className="text-slate-400 text-sm font-medium">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  value={fields.name}
                  onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                  className={`glass-input rounded-xl px-4 h-12 w-full ${errors.name ? 'border-red-500/60' : ''}`}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name && <span id="err-name" className="text-red-400 text-xs">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="contact-email" className="text-slate-400 text-sm font-medium">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={fields.email}
                  onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                  className={`glass-input rounded-xl px-4 h-12 w-full ${errors.email ? 'border-red-500/60' : ''}`}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email && <span id="err-email" className="text-red-400 text-xs">{errors.email}</span>}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-slate-400 text-sm font-medium">Message</label>
              <textarea
                id="contact-message"
                placeholder="Write your message here..."
                rows={5}
                value={fields.message}
                onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                className={`glass-input rounded-xl px-4 py-3 w-full resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
              />
              {errors.message && <span id="err-message" className="text-red-400 text-xs">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="send-btn mt-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Sending…
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}

        {/* Socials */}
        <div className={`flex items-center gap-5 ${revealClass()}`} style={revealStyle(160)}>
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`w-full border-t border-white/[0.06] pt-6 text-center ${revealClass()}`}
          style={revealStyle(200)}
        >
          <p className="text-slate-600 text-sm">© 2025 Jansen. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};
