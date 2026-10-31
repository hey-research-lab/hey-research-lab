// The profile's live pictures (2026-11-01): the chain building, the week's ships and the fixes sent upstream.
// Each is an animated SVG in a light and a dark version, drawn from public data only, with no dependency.
// Every animation is CSS inside the SVG, so it plays where GitHub shows the image, and stops for readers who ask
// for reduced motion.

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,monospace";
export const THEMES = {
  dark: { bg: '#0B0E11', panel: '#14181D', line: '#272D35', ink: '#E9ECF0', sec: '#94A0AD', faint: '#3A424D', lime: '#C2FB03', limeSoft: 'rgba(194,251,3,0.16)' },
  light: { bg: '#F5F6F8', panel: '#FFFFFF', line: '#DDE1E7', ink: '#0B0E11', sec: '#535B66', faint: '#C5CBD3', lime: '#4F7A00', limeSoft: 'rgba(79,122,0,0.14)' },
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s, max) => (s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s);
const n = (v) => v.toLocaleString('en-US');
const REDUCED = '@media (prefers-reduced-motion: reduce){*{animation:none!important}}';

/** Every shipping or active project as a star; the newest ship at the centre, last week's ships lit. */
export function constellation(projects, theme, now = Date.now()) {
  const t = THEMES[theme];
  const w = 1200, h = 520, cx = 600, cy = 250, R = 225;
  const sorted = [...projects].sort((a, b) => (b.lastShippedAt ?? '').localeCompare(a.lastShippedAt ?? ''));
  const golden = Math.PI * (3 - Math.sqrt(5));
  const week = now - 7 * 86_400_000;
  const stars = sorted.map((p, i) => {
    const r = R * Math.sqrt((i + 0.5) / sorted.length);
    const a = i * golden;
    const x = (cx + r * Math.cos(a)).toFixed(1), y = (cy + r * Math.sin(a)).toFixed(1);
    const fresh = p.lastShippedAt && Date.parse(p.lastShippedAt) >= week;
    if (!fresh) return `<circle cx="${x}" cy="${y}" r="1.7" fill="${t.faint}"/>`;
    const delay = ((i * 0.37) % 6).toFixed(2);
    return `<circle class="p" style="animation-delay:-${delay}s" cx="${x}" cy="${y}" r="2.8" fill="${t.lime}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`${n(sorted.length)} Robinhood Chain projects HEY reads as shipping or active, the newest ship at the centre; lit ones shipped in the last 7 days`)}">
<style>.g{transform-origin:${cx}px ${cy}px;animation:spin 300s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.p{animation:pulse 6s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:.45}50%{opacity:1}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<circle cx="${cx}" cy="${cy}" r="${R + 18}" fill="none" stroke="${t.line}" stroke-dasharray="2 6"/>
<circle cx="${cx}" cy="${cy}" r="60" fill="${t.limeSoft}"/>
<g class="g">${stars}</g>
<text x="40" y="58" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">ROBINHOOD CHAIN · LIVE</text>
<text x="40" y="96" font-family="${FONT}" font-size="30" font-weight="700" fill="${t.ink}">The chain,</text>
<text x="40" y="128" font-family="${FONT}" font-size="30" font-weight="700" fill="${t.ink}">building.</text>
<text x="40" y="160" font-family="${FONT}" font-size="15" fill="${t.sec}">${n(sorted.length)} projects HEY reads as</text>
<text x="40" y="180" font-family="${FONT}" font-size="15" fill="${t.sec}">shipping or active, newest ship</text>
<text x="40" y="200" font-family="${FONT}" font-size="15" fill="${t.sec}">at the centre.</text>
<circle cx="48" cy="${h - 52}" r="4" fill="${t.lime}"/><text x="60" y="${h - 47}" font-family="${FONT}" font-size="13" fill="${t.sec}">shipped in the last 7 days</text>
<circle cx="48" cy="${h - 30}" r="3" fill="${t.faint}"/><text x="60" y="${h - 25}" font-family="${FONT}" font-size="13" fill="${t.sec}">shipped earlier, still active</text>
<text x="${w - 40}" y="${h - 25}" text-anchor="end" font-family="${MONO}" font-size="12" fill="${t.sec}">heyresearch.xyz · every ship with its source</text>
</svg>
`;
}

/** The week's newest ships, one line at a time, as a feed reads. */
export function shipTicker(week, theme) {
  const t = THEMES[theme];
  // A title that is only a date says nothing about the ship (a changelog keyed by day): left out of the ticker.
  const items = (week.shipped?.items ?? []).filter((it) => it.latest?.title && !/^\d{4}-\d{2}-\d{2}$/.test(it.latest.title.trim())).slice(0, 7);
  const w = 1200, rowH = 44, top = 96, h = top + items.length * rowH + 52;
  const cycle = 3 + items.length * 0.9 + 6;
  const kind = (e) => ({ GITHUB_RELEASE: 'release', CODE_ACTIVITY: 'code', CONTRACT_DEPLOY_FOLLOWUP: 'deploy', CONTRACT_UPGRADE: 'upgrade', FEATURE_RELEASE: 'feature' }[e] ?? 'ship');
  const rows = items.map((it, i) => {
    const y = top + i * rowH;
    const delay = (0.6 + i * 0.9).toFixed(1);
    const day = (it.latest.publishedAt ?? '').slice(0, 10);
    return `<g class="r" style="animation-delay:${delay}s">
<rect x="32" y="${y - 26}" width="${w - 64}" height="${rowH - 8}" rx="9" fill="${t.panel}" stroke="${t.line}"/>
<text x="52" y="${y}" font-family="${MONO}" font-size="13" fill="${t.lime}">${esc(kind(it.latest.eventType))}</text>
<text x="140" y="${y}" font-family="${FONT}" font-size="16" font-weight="600" fill="${t.ink}">${esc(clip(it.project?.name ?? '', 28))}</text>
<text x="420" y="${y}" font-family="${FONT}" font-size="15" fill="${t.sec}">${esc(clip(it.latest.title, 62))}</text>
<text x="${w - 52}" y="${y}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${t.sec}">${esc(day)}</text>
</g>`;
  }).join('\n');
  const summary = week.shipped ? `${n(week.shipped.ships)} ships from ${n(week.shipped.projects)} projects in the last 7 days` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Shipped this week on Robinhood Chain: ${summary}`)}">
<style>.r{opacity:0;animation:in ${cycle}s ease-out infinite}@keyframes in{0%{opacity:0;transform:translateY(6px)}6%{opacity:1;transform:none}88%{opacity:1}100%{opacity:0}}.c{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}${REDUCED.replace('animation:none!important', 'animation:none!important;opacity:1!important')}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="32" y="50" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">SHIPPED THIS WEEK<tspan class="c"> ▌</tspan></text>
<text x="${w - 32}" y="50" text-anchor="end" font-family="${FONT}" font-size="14" fill="${t.sec}">${esc(summary)}</text>
${rows}
<text x="32" y="${h - 20}" font-family="${MONO}" font-size="12" fill="${t.sec}">Every ship with its source: heyresearch.xyz/ships</text>
</svg>
`;
}

/** One square per repository HEY sent a fix to: merged lit, open outlined, closed dim. */
export function fixesMap(prs, repoOf, theme) {
  const t = THEMES[theme];
  const byRepo = new Map();
  for (const pr of prs) {
    const repo = repoOf(pr);
    const state = pr.pull_request?.merged_at ? 'merged' : pr.state === 'open' ? 'open' : 'closed';
    const rank = { merged: 3, open: 2, closed: 1 };
    if (!byRepo.has(repo) || rank[state] > rank[byRepo.get(repo)]) byRepo.set(repo, state);
  }
  const order = { merged: 0, open: 1, closed: 2 };
  const repos = [...byRepo.entries()].sort((a, b) => order[a[1]] - order[b[1]] || a[0].localeCompare(b[0]));
  const w = 1200, cols = 37, size = 22, gap = 6, left = 40, top = 104;
  const rowsN = Math.ceil(repos.length / cols);
  const h = top + rowsN * (size + gap) + 62;
  const cells = repos.map(([repo, state], i) => {
    const x = left + (i % cols) * (size + gap), y = top + Math.floor(i / cols) * (size + gap);
    const title = `<title>${esc(`${repo}: ${state}`)}</title>`;
    if (state === 'merged') return `<rect class="m" style="animation-delay:${((i * 0.23) % 4).toFixed(2)}s" x="${x}" y="${y}" width="${size}" height="${size}" rx="5" fill="${t.lime}">${title}</rect>`;
    if (state === 'open') return `<rect x="${x + 0.75}" y="${y + 0.75}" width="${size - 1.5}" height="${size - 1.5}" rx="5" fill="${t.panel}" stroke="${t.sec}" stroke-width="1.5">${title}</rect>`;
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="5" fill="${t.line}">${title}</rect>`;
  }).join('');
  const count = (s) => repos.filter(([, st]) => st === s).length;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Fixes sent to ${repos.length} repositories: ${count('merged')} merged, ${count('open')} open`)}">
<style>.m{animation:glow 4s ease-in-out infinite}@keyframes glow{0%,100%{opacity:.7}50%{opacity:1}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="52" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">FIXES WE SENT UPSTREAM</text>
<text x="40" y="82" font-family="${FONT}" font-size="15" fill="${t.sec}">One square per repository we don’t own. Each fix is the team’s call to take.</text>
${cells}
<rect x="40" y="${h - 38}" width="12" height="12" rx="3" fill="${t.lime}"/><text x="60" y="${h - 28}" font-family="${FONT}" font-size="13" fill="${t.sec}">merged · ${n(count('merged'))}</text>
<rect x="170" y="${h - 38}" width="12" height="12" rx="3" fill="${t.panel}" stroke="${t.sec}"/><text x="190" y="${h - 28}" font-family="${FONT}" font-size="13" fill="${t.sec}">open · ${n(count('open'))}</text>
<rect x="290" y="${h - 38}" width="12" height="12" rx="3" fill="${t.line}"/><text x="310" y="${h - 28}" font-family="${FONT}" font-size="13" fill="${t.sec}">closed · ${n(count('closed'))}</text>
<text x="${w - 40}" y="${h - 28}" text-anchor="end" font-family="${MONO}" font-size="12" fill="${t.sec}">heyresearch.xyz/contributions</text>
</svg>
`;
}
