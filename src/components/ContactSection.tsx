import { useState, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiSend, FiCheck, FiMail, FiMapPin, FiGithub, FiLinkedin, FiDownload, FiCalendar, FiPaperclip, FiX, FiFileText } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PORTFOLIO_OWNER } from '../utils/constants';
import BorderGlow from './react-bits/BorderGlow';

const EASE = [0.4, 0, 0.2, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, error, multiline, type = 'text' }: {
  label: string; name: string; value: string;
  onChange: (v: string) => void; error?: string;
  multiline?: boolean; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const s = {
    width: '100%', background: 'transparent',
    border: `1px solid ${error ? 'rgba(248,113,113,0.45)' : focused ? 'var(--accent-border)' : 'var(--border)'}`,
    borderRadius: 10, color: 'var(--fg)', padding: '13px 15px',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', resize: 'none' as const,
    transition: 'border-color .2s, box-shadow .2s',
    boxShadow: focused ? '0 0 0 3px var(--accent-dim)' : 'none',
  };
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 8 }}>{label}</label>
      {multiline
        ? <textarea name={name} value={value} rows={4} style={s}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(e) => onChange(e.target.value)} />
        : <input type={type} name={name} value={value} style={s}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={(e) => onChange(e.target.value)} />
      }
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ fontSize: 12, color: 'rgb(248,113,113)', marginTop: 5 }}>{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

// ─── File drop zone ──────────────────────────────────────────────────────────
function FileDropZone({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const accept = '.pdf,.png,.jpg,.jpeg,.webp';
  const maxMb = 10;

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter((f) => {
      const ok = /\.(pdf|png|jpe?g|webp)$/i.test(f.name) && f.size <= maxMb * 1024 * 1024;
      return ok;
    });
    setFiles([...files, ...valid].slice(0, 5));
  }, [files, setFiles]);

  const remove = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  const FileIcon = ({ name }: { name: string }) =>
    name.endsWith('.pdf') ? <FiFileText size={13} /> : <FiPaperclip size={13} />;

  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--fg-2)', marginBottom: 8 }}>
        Pièces jointes <span style={{ color: 'var(--fg-3)', fontWeight: 400 }}>(optionnel — fiche de poste, brief…)</span>
      </label>

      {/* Drop area */}
      <motion.div
        animate={{ borderColor: dragging ? 'var(--accent-border)' : 'var(--border)', background: dragging ? 'var(--accent-dim)' : 'transparent' }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        style={{
          border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 16px',
          cursor: 'pointer', transition: 'border-color .2s, background .2s',
          display: 'flex', alignItems: 'center', gap: 10,
        }}
      >
        <FiPaperclip size={15} style={{ color: 'var(--fg-3)', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>
          {dragging ? 'Déposez ici…' : 'Cliquer ou glisser (PDF, image — max 10 Mo · 5 fichiers)'}
        </span>
        <input ref={inputRef} type="file" accept={accept} multiple style={{ display: 'none' }}
          onChange={(e) => addFiles(e.target.files)} />
      </motion.div>

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}
          >
            {files.map((f, i) => (
              <motion.div
                key={f.name + i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px', borderRadius: 6,
                  background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.2)',
                  fontSize: 12, color: 'var(--accent)',
                }}
              >
                <FileIcon name={f.name} />
                <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                <button onClick={(e) => { e.stopPropagation(); remove(i); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', padding: 0, display: 'flex' }}>
                  <FiX size={12} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
interface F { name: string; company: string; email: string; message: string; }
interface E { name?: string; email?: string; message?: string; }

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.1 });
  const [form,    setForm]    = useState<F>({ name: '', company: '', email: '', message: '' });
  const [errors,  setErrors]  = useState<E>({});
  const [files,   setFiles]   = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();

  const set = (k: keyof F) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof E]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: E = {};
    if (!form.name.trim()) e.name = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (form.message.trim().length < 10) e.message = 'Message trop court';
    setErrors(e); return !Object.keys(e).length;
  };

  const submit = (e: { preventDefault(): void }) => {
    e.preventDefault(); if (!validate()) return;
    setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  const highlights = [
    { icon: '⚡', text: 'Dispo dès octobre 2026' },
    { icon: '📍', text: 'Nantes · La Rochelle · Vendée' },
    { icon: '🏗️', text: 'React / TS / Node.js / Python' },
    { icon: '🤝', text: 'CDI, CDD, alternance' },
  ];

  return (
    <section ref={sectionRef} id="contact" style={{ background: 'var(--surface)', paddingTop: 120, paddingBottom: 140 }}>
      <div className="container">

        {/* Header */}
        <motion.div ref={ref} initial="hidden" animate={visible ? 'show' : 'hidden'} variants={fadeUp} style={{ marginBottom: 56 }}>
          <p className="label" style={{ marginBottom: 14 }}>Recrutement</p>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 14 }}>
            Vous cherchez un dev<br />
            <span className="grad">qui s'implique vraiment ?</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.75, maxWidth: 520 }}>
            Je cherche un CDI ou CDD pour continuer à apprendre dans un contexte stimulant.
            Si vous construisez quelque chose d'intéressant, parlons-en !
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10, marginBottom: 52 }}>
          {highlights.map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderRadius: 12,
              background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.1)',
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.4 }}>{text}</span>
            </div>
          ))}
        </motion.div>

        <div className="two-col-right">

          {/* Left info */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {[
              { icon: <FiMail size={13} />,     label: 'Email',         value: PORTFOLIO_OWNER.email },
              { icon: <FiMapPin size={13} />,   label: 'Zone',          value: PORTFOLIO_OWNER.location },
              { icon: <FiCalendar size={13} />, label: 'Disponibilité', value: `Dès ${PORTFOLIO_OWNER.availableFrom}` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="card" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--accent)', opacity: 0.7 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--fg-3)' }}>{label}</p>
                  <p style={{ fontSize: 13, color: 'var(--fg)', marginTop: 1, fontWeight: 500 }}>{value}</p>
                </div>
              </div>
            ))}

            <div className="card" style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, borderColor: 'rgba(74,222,128,0.18)' }}>
              <motion.span
                animate={inView ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                transition={inView ? { duration: 1.8, repeat: Infinity } : { duration: 0.3 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: 'var(--fg-2)' }}>Répond sous <strong style={{ color: 'var(--fg)' }}>24h</strong></p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: <FiGithub size={14} />,   href: PORTFOLIO_OWNER.github,   label: 'GitHub' },
                { icon: <FiLinkedin size={14} />, href: PORTFOLIO_OWNER.linkedin, label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  {icon} {label}
                </a>
              ))}
            </div>

            <a href="#" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', padding: '11px 0' }}>
              <FiDownload size={13} /> Télécharger le CV (PDF)
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
            <div style={{ position: 'relative' }}>
              {/* Ambient glow */}
              <motion.div
                animate={inView ? { opacity: [0.35, 0.6, 0.35], scale: [1, 1.015, 1] } : { opacity: 0.35, scale: 1 }}
                transition={inView ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : {}}
                style={{
                  position: 'absolute', inset: -3, borderRadius: 20, zIndex: 0,
                  background: 'linear-gradient(135deg, rgba(129,140,248,0.22), rgba(167,139,250,0.12), rgba(96,165,250,0.18))',
                  filter: 'blur(10px)',
                }}
              />

              <BorderGlow backgroundColor="var(--card)" borderRadius={16} glowRadius={72} glowIntensity={1.2}
                colors={['#818cf8', '#a78bfa', '#60a5fa']} edgeSensitivity={8} coneSpread={35} fillOpacity={0.22}>
                <div style={{ padding: '28px 28px', position: 'relative', zIndex: 1 }}>

                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: 16 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(74,222,128,0.09)', border: '1px solid rgba(74,222,128,0.22)' }}>
                          <FiCheck size={22} style={{ color: '#4ade80' }} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--fg)', marginBottom: 6 }}>
                            Message reçu, merci !
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--fg-2)' }}>Je vous réponds dans les 24h.</p>
                        </div>
                        <button onClick={() => { setDone(false); setForm({ name: '', company: '', email: '', message: '' }); setFiles([]); }}
                          style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 4 }}>
                          Envoyer un autre message →
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit}
                        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                          <Field label="Votre nom *" name="name" value={form.name} onChange={set('name')} error={errors.name} />
                          <Field label="Entreprise" name="company" value={form.company} onChange={set('company')} />
                        </div>
                        <Field label="Email *" type="email" name="email" value={form.email} onChange={set('email')} error={errors.email} />
                        <Field label="Message *" name="message" value={form.message} onChange={set('message')} error={errors.message} multiline />

                        {/* File attachment */}
                        <FileDropZone files={files} setFiles={setFiles} />

                        <button type="submit" disabled={loading} className="btn-primary"
                          style={{ justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 11,
                            opacity: loading ? 0.65 : 1, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 14,
                            background: loading ? 'var(--fg-2)' : undefined }}>
                          {loading ? (
                            <>
                              <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                                style={{ width: 15, height: 15, border: '2px solid rgba(0,0,0,0.25)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block' }} />
                              Envoi…
                            </>
                          ) : (
                            <><FiSend size={14} /> Envoyer le message{files.length > 0 ? ` + ${files.length} fichier${files.length > 1 ? 's' : ''}` : ''}</>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </BorderGlow>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
