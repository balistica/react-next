'use client';
import { useState } from 'react';

const n = (v) => Math.max(0, Number(v) || 0);
const fmt = (x, d = 2) => (Number.isFinite(x) ? x.toLocaleString('en-US', { maximumFractionDigits: d }) : '—');

// Standard normal CDF (Abramowitz & Stegun 26.2.17)
function cdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function Field({ label, value, onChange, type = 'number', hint }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} inputMode={type === 'number' ? 'decimal' : undefined} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function ABTest() {
  const [s, setS] = useState({ av: 10000, ac: 240, bv: 10000, bc: 310 });
  const set = (k) => (v) => setS({ ...s, [k]: v });
  const av = n(s.av), ac = Math.min(n(s.ac), av), bv = n(s.bv), bc = Math.min(n(s.bc), bv);
  const pa = av ? ac / av : 0, pb = bv ? bc / bv : 0;
  const pool = av + bv ? (ac + bc) / (av + bv) : 0;
  const se = Math.sqrt(pool * (1 - pool) * (1 / (av || 1) + 1 / (bv || 1)));
  const z = se ? (pb - pa) / se : 0;
  const p = 2 * (1 - cdf(Math.abs(z)));
  const ready = av > 0 && bv > 0 && se > 0;
  const win = ready && p < 0.05;
  const uplift = pa ? ((pb - pa) / pa) * 100 : 0;
  return (
    <article className="tool">
      <h3>A/B test significance</h3>
      <p className="meta">Two-proportion z-test, two-sided, 95% confidence.</p>
      <div className="grid2">
        <Field label="A visitors" value={s.av} onChange={set('av')} />
        <Field label="A conversions" value={s.ac} onChange={set('ac')} />
        <Field label="B visitors" value={s.bv} onChange={set('bv')} />
        <Field label="B conversions" value={s.bc} onChange={set('bc')} />
      </div>
      <div className={`result ${win ? (uplift > 0 ? 'win' : 'lose') : ''}`} aria-live="polite">
        <strong>{!ready ? 'Enter visitors and conversions' : win ? (uplift > 0 ? 'B wins' : 'A wins') : 'No clear winner yet'}</strong>
        <span>A {fmt(pa * 100)}% · B {fmt(pb * 100)}% · uplift {fmt(uplift, 1)}% · p = {ready ? fmt(p, 4) : '—'}</span>
        {ready && !win && <span>Keep the test running until the planned sample size is reached.</span>}
      </div>
    </article>
  );
}

function UTM() {
  const [s, setS] = useState({ url: 'https://example.com/landing', source: 'linkedin', medium: 'paid_social', campaign: 'spring_launch', content: '', term: '' });
  const set = (k) => (v) => setS({ ...s, [k]: v });
  const [copied, setCopied] = useState(false);
  const clean = (v) => v.trim().toLowerCase().replace(/\s+/g, '_');
  let out = '', err = '';
  try {
    const u = new URL(s.url.trim());
    [['source', 'utm_source'], ['medium', 'utm_medium'], ['campaign', 'utm_campaign'], ['content', 'utm_content'], ['term', 'utm_term']].forEach(([k, name]) => {
      if (clean(s[k])) u.searchParams.set(name, clean(s[k]));
    });
    out = u.toString();
  } catch { err = 'Start the URL with https://'; }
  if (!err && (!clean(s.source) || !clean(s.medium) || !clean(s.campaign))) err = 'Source, medium and campaign are required.';
  const copy = async () => {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  return (
    <article className="tool">
      <h3>UTM link builder</h3>
      <p className="meta">Lowercase, underscores, no spaces. Same rules every time keeps GA4 reports clean.</p>
      <Field label="Page URL" type="text" value={s.url} onChange={set('url')} />
      <div className="grid2">
        <Field label="Source" type="text" value={s.source} onChange={set('source')} />
        <Field label="Medium" type="text" value={s.medium} onChange={set('medium')} />
        <Field label="Campaign" type="text" value={s.campaign} onChange={set('campaign')} />
        <Field label="Content (optional)" type="text" value={s.content} onChange={set('content')} />
      </div>
      <div className="result" aria-live="polite">
        {err ? <strong>{err}</strong> : (<><code>{out}</code><button className="btn" onClick={copy}>{copied ? 'Copied' : 'Copy link'}</button></>)}
      </div>
    </article>
  );
}

function Economics() {
  const [s, setS] = useState({ budget: 3000, cpc: 1.2, v2l: 4, l2c: 15, rev: 240 });
  const set = (k) => (v) => setS({ ...s, [k]: v });
  const budget = n(s.budget), cpc = n(s.cpc);
  const clicks = cpc ? budget / cpc : 0;
  const leads = clicks * (n(s.v2l) / 100);
  const cust = leads * (n(s.l2c) / 100);
  const cac = cust ? budget / cust : NaN;
  const roas = budget ? (cust * n(s.rev)) / budget : 0;
  const ok = roas >= 1;
  return (
    <article className="tool">
      <h3>Funnel and unit economics</h3>
      <p className="meta">From ad budget to customers: CAC and ROAS in one view.</p>
      <div className="grid2">
        <Field label="Budget, $" value={s.budget} onChange={set('budget')} />
        <Field label="Cost per click, $" value={s.cpc} onChange={set('cpc')} />
        <Field label="Visit to lead, %" value={s.v2l} onChange={set('v2l')} />
        <Field label="Lead to customer, %" value={s.l2c} onChange={set('l2c')} />
        <Field label="Revenue per customer, $" value={s.rev} onChange={set('rev')} />
      </div>
      <div className={`result ${budget ? (ok ? 'win' : 'lose') : ''}`} aria-live="polite">
        <strong>ROAS {fmt(roas)}x · CAC ${fmt(cac, 0)}</strong>
        <span>{fmt(clicks, 0)} clicks → {fmt(leads, 0)} leads → {fmt(cust, 1)} customers</span>
        <span>{ok ? 'Revenue covers ad spend.' : 'Spend is not paid back yet: fix conversion before scaling budget.'}</span>
      </div>
    </article>
  );
}

export default function Tools() {
  return (
    <div className="tools">
      <ABTest />
      <UTM />
      <Economics />
    </div>
  );
}
