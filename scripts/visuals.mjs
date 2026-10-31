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

// ---------------------------------------------------------------- charts (2026-11-01)

/** Rounds a maximum up to a tidy axis top, and the ticks under it. */
function axis(max, count = 4) {
  if (max <= 0) return { top: 1, ticks: [0, 1] };
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw);
  const top = Math.ceil(max / step) * step;
  return { top, ticks: Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step) };
}
const compact = (v) => (v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1).replace(/\.0$/, '')}K` : n(v));
const shortDay = (d) => { const [, m, day] = d.split('-'); return `${Number(day)} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(m) - 1]}`; };

/** Token launches a day against builders shipping a day, the same 14 days, each on its own scale. */
export function launchesVsBuilders(chain, theme) {
  const t = THEMES[theme];
  const days = (chain.days ?? []).filter((d) => Number.isFinite(d.launches) && Number.isFinite(d.buildersShipping));
  const w = 1200, h = 470, left = 92, right = 40, plotW = w - left - right;
  const panels = [
    { key: 'launches', label: 'Token launches a day', top: 104, height: 110, color: t.faint, value: (d) => d.launches },
    { key: 'builders', label: 'Builders who shipped that day', top: 290, height: 110, color: t.lime, value: (d) => d.buildersShipping },
  ];
  const bw = plotW / Math.max(days.length, 1);
  const today = days.at(-1)?.day;
  const parts = panels.map((panel) => {
    const max = Math.max(...days.map(panel.value));
    const { top, ticks } = axis(max, 3);
    const y = (v) => panel.top + panel.height - (v / top) * panel.height;
    const grid = ticks.map((tick) => `<line x1="${left}" x2="${w - right}" y1="${y(tick).toFixed(1)}" y2="${y(tick).toFixed(1)}" stroke="${t.line}"/><text x="${left - 10}" y="${(y(tick) + 4).toFixed(1)}" text-anchor="end" font-family="${MONO}" font-size="11" fill="${t.sec}">${compact(tick)}</text>`).join('');
    const bars = days.map((d, i) => {
      const v = panel.value(d), x = left + i * bw + bw * 0.18, bh = (v / top) * panel.height;
      const partial = d.day === today;
      return `<rect class="b" style="animation-delay:${(i * 0.05).toFixed(2)}s" x="${x.toFixed(1)}" y="${(panel.top + panel.height - bh).toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${panel.color}" opacity="${partial ? 0.45 : 1}"><title>${esc(`${d.day}: ${n(v)}${partial ? ' (day in progress)' : ''}`)}</title></rect>`;
    }).join('');
    return `<text x="${left}" y="${panel.top - 16}" font-family="${FONT}" font-size="15" font-weight="600" fill="${t.ink}">${esc(panel.label)}</text>${grid}${bars}`;
  }).join('');
  const labels = days.map((d, i) => (i % 2 === 0 || i === days.length - 1 ? `<text x="${(left + i * bw + bw / 2).toFixed(1)}" y="${h - 46}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${t.sec}">${esc(shortDay(d.day))}</text>` : '')).join('');
  const first = days[0], last = days.at(-2) ?? days.at(-1);
  const builders = days.slice(0, -1).map((d) => d.buildersShipping);
  const range = builders.length ? `${Math.min(...builders)} to ${Math.max(...builders)}` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Token launches a day and builders who shipped a day on Robinhood Chain, ${first?.day} to ${days.at(-1)?.day}`)}">
<style>.b{transform-box:fill-box;transform-origin:bottom;animation:grow .9s ease-out both}@keyframes grow{from{transform:scaleY(0)}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="44" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">THE LAST 14 DAYS ON ROBINHOOD CHAIN</text>
<text x="${w - 40}" y="44" text-anchor="end" font-family="${FONT}" font-size="14" fill="${t.sec}">${esc(`Launches went from ${compact(first?.launches ?? 0)} to ${compact(last?.launches ?? 0)} a day. ${range} builders still shipped every day.`)}</text>
${parts}
${labels}
<text x="40" y="${h - 20}" font-family="${MONO}" font-size="12" fill="${t.sec}">Today's bars are lighter: the day is still being read. Source: heyresearch.xyz/api/chain</text>
</svg>
`;
}

/** A cumulative line with its area, labelled at the end; points are { x: label, y: value }. */
function lineChart({ points, theme, title, caption, note, label, w = 1200, h = 360, series2 }) {
  const t = THEMES[theme];
  const left = 76, right = 150, top = 92, plotH = h - top - 70, plotW = w - left - right;
  const max = Math.max(...points.map((p) => p.y), ...(series2?.points ?? []).map((p) => p.y));
  const { top: yTop, ticks } = axis(max, 4);
  const X = (i) => left + (points.length === 1 ? plotW : (i / (points.length - 1)) * plotW);
  const Y = (v) => top + plotH - (v / yTop) * plotH;
  const path = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join('');
  const area = `${path(points)}L${X(points.length - 1).toFixed(1)},${Y(0).toFixed(1)}L${X(0).toFixed(1)},${Y(0).toFixed(1)}Z`;
  const grid = ticks.map((tick) => `<line x1="${left}" x2="${w - right}" y1="${Y(tick).toFixed(1)}" y2="${Y(tick).toFixed(1)}" stroke="${t.line}"/><text x="${left - 10}" y="${(Y(tick) + 4).toFixed(1)}" text-anchor="end" font-family="${MONO}" font-size="11" fill="${t.sec}">${compact(tick)}</text>`).join('');
  const every = Math.max(1, Math.ceil(points.length / 7));
  const xl = points.map((p, i) => (i % every === 0 || i === points.length - 1 ? `<text x="${X(i).toFixed(1)}" y="${top + plotH + 22}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${t.sec}">${esc(p.x)}</text>` : '')).join('');
  const end = points.at(-1);
  const second = series2
    ? `<path class="ln" d="${path(series2.points)}" fill="none" stroke="${t.sec}" stroke-width="2.5" stroke-dasharray="1 0"/><circle cx="${X(series2.points.length - 1).toFixed(1)}" cy="${Y(series2.points.at(-1).y).toFixed(1)}" r="4.5" fill="${t.sec}"/><text x="${(X(series2.points.length - 1) + 12).toFixed(1)}" y="${(Y(series2.points.at(-1).y) + 5).toFixed(1)}" font-family="${FONT}" font-size="14" fill="${t.sec}">${esc(`${n(series2.points.at(-1).y)} ${series2.label}`)}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`${title}: ${caption}`)}">
<style>.ln{stroke-dasharray:3000;stroke-dashoffset:3000;animation:draw 2.4s ease-out forwards}@keyframes draw{to{stroke-dashoffset:0}}.ar{animation:fade 2.4s ease-out both}@keyframes fade{from{opacity:0}}${REDUCED.replace('animation:none!important', 'animation:none!important;stroke-dashoffset:0!important')}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="44" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">${esc(title)}</text>
<text x="40" y="70" font-family="${FONT}" font-size="15" fill="${t.sec}">${esc(caption)}</text>
${grid}${xl}
<path class="ar" d="${area}" fill="${t.limeSoft}"/>
${second}
<path class="ln" d="${path(points)}" fill="none" stroke="${t.lime}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="${X(points.length - 1).toFixed(1)}" cy="${Y(end.y).toFixed(1)}" r="5" fill="${t.lime}"/>
<text x="${(X(points.length - 1) + 12).toFixed(1)}" y="${(Y(end.y) + 5).toFixed(1)}" font-family="${FONT}" font-size="15" font-weight="700" fill="${t.ink}">${esc(`${n(end.y)} ${label}`)}</text>
<text x="40" y="${h - 18}" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(note)}</text>
</svg>
`;
}

/** Agents registered on Robinhood Chain (ERC-8004), the running total by day; HEY is agent #8783. */
export function agentsChart(stats, theme) {
  const days = (stats.erc8004Registrations?.days ?? []).filter((d) => d.complete !== false);
  const points = days.map((d) => ({ x: shortDay(d.day), y: d.cumulative }));
  return lineChart({
    points, theme,
    title: 'AI AGENTS REGISTERED ON ROBINHOOD CHAIN',
    caption: 'The ERC-8004 Identity Registry, read from the chain each day. HEY is one of them, agent #8783.',
    note: 'Counts only, no owner or agent kept. Source: heyresearch.xyz/developers/agents/stats',
    label: 'agents',
  });
}

/** Pull requests sent upstream and merged, the running totals by day. */
export function fixesTimeline(prs, theme) {
  const day = (iso) => iso.slice(0, 10);
  const first = prs.map((p) => day(p.created_at)).sort()[0];
  const today = new Date().toISOString().slice(0, 10);
  const days = [];
  for (let d = new Date(`${first}T00:00:00Z`); day(d.toISOString()) <= today; d.setUTCDate(d.getUTCDate() + 1)) days.push(day(d.toISOString()));
  const sent = days.map((d) => ({ x: shortDay(d), y: prs.filter((p) => day(p.created_at) <= d).length }));
  const merged = days.map((d) => ({ x: shortDay(d), y: prs.filter((p) => p.pull_request?.merged_at && day(p.pull_request.merged_at) <= d).length }));
  return lineChart({
    points: sent, theme,
    title: 'FIXES SENT UPSTREAM, DAY BY DAY',
    caption: 'Pull requests we opened in repositories we do not own (lime), and how many their teams merged (grey).',
    note: 'Every fix, open, merged or closed: heyresearch.xyz/contributions',
    label: 'sent',
    series2: { points: merged, label: 'merged' },
  });
}

/** HEY as one agent on three chains: its ERC-8004 registrations and what an agent gets. */
export function agentCard(theme) {
  const t = THEMES[theme];
  const w = 1200, h = 300;
  const chains = [
    ['Robinhood Chain', '#8783', 'eip155:4663'],
    ['Ethereum', '#56081', 'eip155:1'],
    ['Base', '#1148006', 'eip155:8453'],
  ];
  const tiles = chains.map(([name, id, caip], i) => {
    const y = 74 + i * 66;
    return `<g><rect x="40" y="${y}" width="380" height="54" rx="10" fill="${t.panel}" stroke="${t.line}"/>
<rect x="40" y="${y + 12}" width="4" height="30" rx="2" fill="${t.lime}"/>
<text x="62" y="${y + 24}" font-family="${FONT}" font-size="16" font-weight="600" fill="${t.ink}">${esc(name)}</text>
<text x="62" y="${y + 43}" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(caip)}</text>
<text x="400" y="${y + 34}" text-anchor="end" font-family="${MONO}" font-size="18" font-weight="600" fill="${t.ink}">${esc(id)}</text></g>`;
  }).join('');
  const wires = chains.map((_, i) => `<path class="w" style="animation-delay:${(i * 0.4).toFixed(1)}s" d="M420 ${101 + i * 66} C 480 ${101 + i * 66} 480 160 540 160" fill="none" stroke="${t.lime}" stroke-width="2" opacity=".55"/>`).join('');
  const services = [['MCP server', 'heyresearch.xyz/mcp'], ['A2A agent card', '/.well-known/agent-card.json'], ['Public API', 'OpenAPI 3.1'], ['llms.txt', 'heyresearch.xyz/llms.txt']];
  const svc = services.map(([a, b], i) => `<rect x="580" y="${92 + i * 44}" width="580" height="36" rx="8" fill="${t.panel}" stroke="${t.line}"/><text x="598" y="${115 + i * 44}" font-family="${FONT}" font-size="15" fill="${t.ink}">${esc(a)}</text><text x="1142" y="${115 + i * 44}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${t.sec}">${esc(b)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="HEY Research Lab is one ERC-8004 agent on Robinhood Chain (#8783), Ethereum (#56081) and Base (#1148006), with an MCP server, an A2A card, a public API and llms.txt; free, no key, no wallet">
<style>.w{stroke-dasharray:6 6;animation:flow 1.6s linear infinite}@keyframes flow{to{stroke-dashoffset:-24}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="48" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">ONE AGENT · THREE CHAINS · ERC-8004</text>
<text x="580" y="48" font-family="${FONT}" font-size="15" fill="${t.sec}">What an agent gets, free, with no key and no wallet</text>
${tiles}${wires}
<circle cx="545" cy="160" r="6" fill="${t.lime}"/>
${svc}
<text x="40" y="${h - 20}" font-family="${MONO}" font-size="12" fill="${t.sec}">Registration file: heyresearch.xyz/.well-known/agent-registration.json</text>
</svg>
`;
}
