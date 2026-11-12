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
// HEY's own brand is spelled "HEY Research Lab" (founder, 2026-11-10); a feed that still carries the older spelling of
// HEY's own name is drawn in the current one. Every other project's name is drawn as HEY's API gives it.
const brand = (s) => String(s).replace(/\bHey(?= Research Lab\b)/g, 'HEY');
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
    const kind = (e) => ({ GITHUB_RELEASE: 'release', CODE_ACTIVITY: 'code', CONTRACT_DEPLOY_FOLLOWUP: 'deploy', CONTRACT_UPGRADE: 'upgrade', FEATURE_RELEASE: 'feature' }[e] ?? 'ship');
  const rows = items.map((it, i) => {
    const y = top + i * rowH;
    const delay = (0.2 + i * 0.15).toFixed(2);
    const day = (it.latest.publishedAt ?? '').slice(0, 10);
    return `<g class="r" style="animation-delay:${delay}s">
<rect x="32" y="${y - 26}" width="${w - 64}" height="${rowH - 8}" rx="9" fill="${t.panel}" stroke="${t.line}"/>
<text x="52" y="${y}" font-family="${MONO}" font-size="13" fill="${t.lime}">${esc(kind(it.latest.eventType))}</text>
<text x="140" y="${y}" font-family="${FONT}" font-size="16" font-weight="600" fill="${t.ink}">${esc(clip(brand(it.project?.name ?? ''), 28))}</text>
<text x="420" y="${y}" font-family="${FONT}" font-size="15" fill="${t.sec}">${esc(clip(it.latest.title, 62))}</text>
<text x="${w - 52}" y="${y}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${t.sec}">${esc(day)}</text>
</g>`;
  }).join('\n');
  const summary = week.shipped ? `${n(week.shipped.ships)} ships from ${n(week.shipped.projects)} projects in the last 7 days` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Shipped this week on Robinhood Chain: ${summary}`)}">
<style>.r{animation:in .7s ease-out both}@keyframes in{from{opacity:0;transform:translateY(6px)}}.s{animation:sweep ${(items.length * 1.2).toFixed(1)}s steps(${items.length}) infinite}@keyframes sweep{from{transform:translateY(0)}to{transform:translateY(${items.length * rowH}px)}}.c{animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="32" y="50" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">SHIPPED THIS WEEK<tspan class="c"> ▌</tspan></text>

<text x="${w - 32}" y="50" text-anchor="end" font-family="${FONT}" font-size="14" fill="${t.sec}">${esc(summary)}</text>
${rows}
${items.length ? `<rect class="s" x="32" y="${top - 26}" width="4" height="${rowH - 8}" rx="2" fill="${t.lime}"/>` : ''}
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
<style>.ln{stroke-dasharray:3000;animation:draw 2.4s ease-out both}@keyframes draw{from{stroke-dashoffset:3000}}.ar{animation:fade 2.4s ease-out both}@keyframes fade{from{opacity:0}}${REDUCED}</style>
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

// ---------------------------------------------------------------- credited advisories (2026-11-03)

const isoWeekStart = (iso) => {
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
};

/**
 * One square per private advisory we filed on GitHub. Published ones (read live, crediting hey-research-lab) are filled,
 * accepted-but-unpublished ones outlined, the rest faint; then the published ones by the week GitHub published them.
 * The unpublished side is counts only, from github.com/hey-research-lab/security's data/advisories.json: a project is
 * named only when that file names it.
 */
export function creditedAdvisories({ hand, published }, theme, now = new Date()) {
  const t = THEMES[theme];
  const rows = hand.acceptedOrPublished.named.map((p) => {
    const live = published.filter((a) => a.project === p.project).length;
    return { label: p.project, published: live, accepted: Math.max(p.count - live, 0) };
  });
  if (hand.acceptedOrPublished.unnamed) rows.push({ label: `${hand.acceptedOrPublished.unnamed === 1 ? '1 more project' : 'More projects'}`, published: 0, accepted: hand.acceptedOrPublished.unnamed });
  const acceptedOrPublished = Math.max(hand.acceptedOrPublished.total, rows.reduce((s, r) => s + r.published + r.accepted, 0));
  const waiting = Math.max(hand.filed.advisories - acceptedOrPublished, 0);
  if (waiting) rows.push({ label: 'Filed, not accepted or published', published: 0, accepted: 0, filed: waiting });
  const publishedTotal = published.length;

  const w = 1200, top = 112, rowH = 46, size = 22, gap = 7, sq = 650;
  const weeksTop = top + rows.length * rowH + 40;
  const h = weeksTop + 196;
  const squares = rows.map((r, i) => {
    const y = top + i * rowH;
    const cells = [];
    for (let k = 0; k < r.published; k++) cells.push(`<rect class="m" style="animation-delay:${((i + k) * 0.31 % 4).toFixed(2)}s" x="${sq + k * (size + gap)}" y="${y}" width="${size}" height="${size}" rx="5" fill="${t.lime}"/>`);
    for (let k = 0; k < r.accepted; k++) { const x = sq + (r.published + k) * (size + gap); cells.push(`<rect x="${x + 0.75}" y="${y + 0.75}" width="${size - 1.5}" height="${size - 1.5}" rx="5" fill="${t.panel}" stroke="${t.lime}" stroke-width="1.5"/>`); }
    for (let k = 0; k < (r.filed ?? 0); k++) cells.push(`<rect x="${sq + k * (size + gap)}" y="${y}" width="${size}" height="${size}" rx="5" fill="${t.line}"/>`);
    const total = r.published + r.accepted + (r.filed ?? 0);
    const note = r.filed ? `${r.filed}` : [r.published && `${r.published} published`, r.accepted && `${r.accepted} accepted`].filter(Boolean).join(' · ');
    return `<text x="380" y="${y + 16}" font-family="${FONT}" font-size="15" font-weight="${r.filed ? 400 : 600}" fill="${r.filed ? t.sec : t.ink}">${esc(r.label)}</text>${cells.join('')}<text x="${sq + total * (size + gap) + 8}" y="${y + 16}" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(note)}</text>`;
  }).join('\n');

  // Published by the week GitHub published them, from the first such week to this one.
  const weeks = [];
  if (published.length) {
    const first = published.map((a) => isoWeekStart(a.publishedAt)).sort()[0];
    const last = isoWeekStart(now.toISOString());
    for (let d = new Date(`${first}T00:00:00Z`); d.toISOString().slice(0, 10) <= last; d.setUTCDate(d.getUTCDate() + 7)) weeks.push(d.toISOString().slice(0, 10));
  }
  const bw = 64, unit = 14, baseY = weeksTop + 126;
  const weekBars = weeks.map((wk, i) => {
    const count = published.filter((a) => isoWeekStart(a.publishedAt) === wk).length;
    const x = 380 + i * (bw + 16);
    const stack = Array.from({ length: count }, (_, k) => `<rect x="${x + 12}" y="${baseY - (k + 1) * (unit + 3)}" width="${bw - 24}" height="${unit}" rx="3" fill="${t.lime}"/>`).join('');
    return `${stack}<text x="${x + bw / 2}" y="${baseY + 20}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${t.sec}">${esc(shortDay(wk))}</text><text x="${x + bw / 2}" y="${baseY - count * (unit + 3) - 8}" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${t.ink}">${count}</text>`;
  }).join('');
  const total = (value, label, y, lit) => `<text x="40" y="${y}" font-family="${FONT}" font-size="40" font-weight="700" letter-spacing="-1" fill="${lit ? t.lime : t.ink}">${esc(n(value))}</text><text x="40" y="${y + 24}" font-family="${FONT}" font-size="14" fill="${t.sec}">${esc(label)}</text>`;
  const asOf = shortDay(hand.asOf);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Security advisories that credit HEY Research Lab: ${hand.filed.advisories} filed privately on GitHub across ${hand.filed.projects} projects, ${acceptedOrPublished} accepted or published, ${publishedTotal} published`)}">
<style>.m{animation:glow 4s ease-in-out infinite}@keyframes glow{0%,100%{opacity:.72}50%{opacity:1}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="50" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">SECURITY ADVISORIES THAT CREDIT US</text>
<text x="40" y="78" font-family="${FONT}" font-size="15" fill="${t.sec}">One square per advisory we filed privately on GitHub. Filled: published with our credit. Outlined: accepted by the team, not yet published.</text>
${total(hand.filed.advisories, `filed, across ${n(hand.filed.projects)} projects`, top + 30, false)}
${total(acceptedOrPublished, 'accepted or published', top + 110, false)}
${total(publishedTotal, 'published with our credit', top + 190, true)}
<line x1="340" x2="340" y1="${top - 6}" y2="${h - 50}" stroke="${t.line}"/>
${squares}
<text x="380" y="${weeksTop + 6}" font-family="${FONT}" font-size="15" font-weight="600" fill="${t.ink}">Published, by week</text>
<line x1="380" x2="${w - 40}" y1="${baseY}" y2="${baseY}" stroke="${t.line}"/>
${weekBars}
<text x="40" y="${h - 20}" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(`Published: read daily from GitHub. Unpublished: counts only, as of ${asOf}. Policy: github.com/hey-research-lab/security`)}</text>
</svg>
`;
}

// ---------------------------------------------------------------- the hero, launchpads and the validator (2026-11-13)

/**
 * The profile's hero: HEY's line on the left, and on the right the last 14 days on Robinhood Chain as columns of squares,
 * one square for every five builders HEY read shipping that day (rounded up), today's column lighter while it is read.
 * Complete at rest: the squares only rise in.
 */
export function hero({ chain, builders, pages }, theme) {
  const t = THEMES[theme];
  const w = 1200, h = 380;
  const days = (chain.days ?? []).filter((d) => Number.isFinite(d.buildersShipping)).slice(-14);
  const today = days.at(-1)?.day;
  const per = 5, base = 286;
  const rowsMax = Math.max(1, ...days.map((d) => Math.ceil(d.buildersShipping / per)));
  const colW = Math.max(12, Math.min(20, Math.floor(186 / rowsMax))), gap = colW >= 16 ? 5 : 4, size = colW - gap;
  const gridRight = w - 56, gridLeft = gridRight - days.length * colW + gap;
  const cols = days.map((d, i) => {
    const count = Math.ceil(d.buildersShipping / per);
    const x = gridLeft + i * colW;
    const partial = d.day === today;
    const cells = Array.from({ length: count }, (_, k) => {
      const y = base - (k + 1) * colW + gap;
      const delay = (i * 0.06 + k * 0.035).toFixed(2);
      return `<rect class="q" style="animation-delay:${delay}s" x="${x}" y="${y}" width="${size}" height="${size}" rx="${(size / 4).toFixed(1)}" fill="${t.lime}" opacity="${partial ? 0.4 : k === count - 1 ? 1 : 0.82}"/>`;
    }).join('');
    const label = i === 0 || i === days.length - 1 ? `<text x="${x + size / 2}" y="${base + 22}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${t.sec}">${esc(shortDay(d.day))}</text>` : '';
    return `<g><title>${esc(`${d.day}: ${n(d.buildersShipping)} builders shipped${partial ? ' (day in progress)' : ''}`)}</title>${cells}</g>${label}`;
  }).join('');
  const chip = (x, label, sub, filled) => {
    const wch = 24 + label.length * 8.6 + sub.length * 7.2 + 16;
    return `<g><rect x="${x}" y="300" width="${wch.toFixed(0)}" height="36" rx="18" fill="${filled ? t.limeSoft : t.panel}" stroke="${filled ? t.lime : t.line}"/>
<circle cx="${x + 20}" cy="318" r="4.5" fill="${filled ? t.lime : t.sec}"/>
<text x="${x + 34}" y="323" font-family="${FONT}" font-size="15" font-weight="600" fill="${t.ink}">${esc(label)}<tspan font-weight="400" fill="${t.sec}">${esc(sub)}</tspan></text></g>`;
  };
  const homeW = 24 + 'Robinhood Chain'.length * 8.6 + ' · home'.length * 7.2 + 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`HEY Research Lab: the public record of building on Robinhood Chain, every ship with its source. ${n(builders)} teams proven building, ${n(pages)} project pages. Robinhood Chain is home; Base is the first chain added.`)}">
<style>.q{transform-box:fill-box;transform-origin:bottom;animation:rise .6s ease-out both}@keyframes rise{from{opacity:0;transform:scaleY(.2)}}.k{animation:blink 1.1s steps(1) infinite}@keyframes blink{50%{opacity:0}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="16" fill="${t.bg}"/>
<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="15.5" fill="none" stroke="${t.line}"/>
<rect x="48" y="50" width="14" height="14" rx="3" fill="${t.lime}"/>
<text x="72" y="63" font-family="${MONO}" font-size="14" letter-spacing="3" fill="${t.ink}">HEY RESEARCH LAB<tspan class="k" fill="${t.lime}"> _</tspan></text>
<text x="48" y="128" font-family="${FONT}" font-size="48" font-weight="800" letter-spacing="-1.6" fill="${t.ink}">The public record</text>
<text x="48" y="184" font-family="${FONT}" font-size="48" font-weight="800" letter-spacing="-1.6" fill="${t.ink}">of building on <tspan fill="${t.lime}">Robinhood Chain.</tspan></text>
<text x="48" y="226" font-family="${FONT}" font-size="19" fill="${t.sec}">Every ship with its source. Price is context, never the verdict.</text>
<text x="48" y="254" font-family="${FONT}" font-size="19" fill="${t.sec}">${esc(`${n(builders)} teams proven building · ${n(pages)} project pages · free, no wallet.`)}</text>
${chip(48, 'Robinhood Chain', ' · home', true)}
${chip(48 + homeW + 12, 'Base', ' · first chain added', false)}
<text x="${gridRight}" y="63" text-anchor="end" font-family="${MONO}" font-size="12" letter-spacing="2" fill="${t.lime}">BUILDERS SHIPPING · 14 DAYS</text>
<text x="${gridRight}" y="84" text-anchor="end" font-family="${FONT}" font-size="13" fill="${t.sec}">one square, five builders who shipped that day</text>
<line x1="${gridLeft - 4}" x2="${gridRight + 4}" y1="${base + 4}" y2="${base + 4}" stroke="${t.line}"/>
${cols}
<text x="${w - 48}" y="${h - 30}" text-anchor="end" font-family="${MONO}" font-size="12" fill="${t.sec}">heyresearch.xyz</text>
</svg>
`;
}

/**
 * The launchpads HEY credits by name, A to Z (never ordered by a count): what HEY reads from each, and how many published
 * project pages on HEY were launched there, read live; then the launch factories HEY indexes in all.
 */
export function launchpads({ pads, factories }, theme) {
  const t = THEMES[theme];
  const w = 1200, h = 340, top = 96, gap = 18, tw = (w - 80 - gap * (pads.length - 1)) / pads.length, th = 178;
  const tiles = pads.map((p, i) => {
    const x = 40 + i * (tw + gap);
    const lines = [];
    for (const word of p.reads.split(' ')) {
      const last = lines.at(-1);
      if (last !== undefined && `${last} ${word}`.length <= 40) lines[lines.length - 1] = `${last} ${word}`;
      else lines.push(word);
    }
    return `<g class="t" style="animation-delay:${(i * 0.15).toFixed(2)}s"><rect x="${x}" y="${top}" width="${tw}" height="${th}" rx="12" fill="${t.panel}" stroke="${t.line}"/>
<rect x="${x}" y="${top + 18}" width="4" height="28" rx="2" fill="${t.lime}"/>
<text x="${x + 22}" y="${top + 40}" font-family="${FONT}" font-size="22" font-weight="700" fill="${t.ink}">${esc(p.name)}</text>
<text x="${x + tw - 20}" y="${top + 39}" text-anchor="end" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(p.host)}</text>
${lines.map((line, j) => `<text x="${x + 22}" y="${top + 72 + j * 19}" font-family="${FONT}" font-size="14" fill="${t.sec}">${esc(line)}</text>`).join('')}
<line x1="${x + 22}" x2="${x + tw - 20}" y1="${top + 124}" y2="${top + 124}" stroke="${t.line}"/>
<text x="${x + 22}" y="${top + th - 20}" font-family="${FONT}" font-size="26" font-weight="700" letter-spacing="-0.5" fill="${t.lime}">${Number.isFinite(p.pages) ? esc(n(p.pages)) : 'not read'}</text>
<text x="${x + tw - 20}" y="${top + th - 22}" text-anchor="end" font-family="${FONT}" font-size="13" fill="${t.sec}">published pages on HEY launched here</text></g>`;
  }).join('\n');
  const tail = Number.isFinite(factories) ? `${n(factories)} launch factories indexed in all` : 'Launch factories indexed: not read';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`Launchpads HEY credits on Robinhood Chain, A to Z: ${pads.map((p) => `${p.name}, ${Number.isFinite(p.pages) ? n(p.pages) : 'not read'} published pages`).join('; ')}. ${tail}.`)}">
<style>.t{animation:in .7s ease-out both}@keyframes in{from{opacity:0;transform:translateY(6px)}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="48" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">LAUNCHPADS CREDITED · A TO Z</text>
<text x="40" y="74" font-family="${FONT}" font-size="15" fill="${t.sec}">Every token credits the launchpad that made it, with a Launched stamp in its Token Passport. Same rules for every launchpad.</text>
${tiles}
<text x="40" y="${h - 22}" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(`${tail} · heyresearch.xyz/passport`)}</text>
</svg>
`;
}

/**
 * HEY's ERC-8004 validator: the one claim it answers, and what it read and answered on each chain, live from
 * /api/agent/stats. A chain HEY reads but does not answer on says so.
 */
export function validator(stats, theme) {
  const t = THEMES[theme];
  const v = stats.erc8004Validations ?? {};
  const order = [4663, 8453, 1];
  const chains = order.map((id) => (v.chains ?? []).find((c) => c.chainId === id)).filter(Boolean);
  const w = 1200, h = 360;
  const steps = [
    ['1', 'An agent asks', 'it names a project and a window in the request itself'],
    ['2', 'HEY checks the tie', 'only an agent tied to the project by evidence HEY holds'],
    ['3', 'HEY answers on chain', 'from its counted ships; a response endorses nothing'],
  ];
  const flow = steps.map(([k, a, b], i) => {
    const y = 150 + i * 60;
    return `<g class="t" style="animation-delay:${(i * 0.25).toFixed(2)}s"><circle cx="58" cy="${y - 5}" r="13" fill="${t.limeSoft}" stroke="${t.lime}"/><text x="58" y="${y}" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" fill="${t.ink}">${k}</text>
<text x="84" y="${y - 8}" font-family="${FONT}" font-size="16" font-weight="600" fill="${t.ink}">${esc(a)}</text><text x="84" y="${y + 12}" font-family="${FONT}" font-size="13" fill="${t.sec}">${esc(b)}</text></g>`;
  }).join('') + `<path class="w" d="M58 159 L58 191 M58 219 L58 251" stroke="${t.lime}" stroke-width="2" fill="none"/>`;
  const tile = (c, i) => {
    const x = 560, y = 92 + i * 78, tw = 600;
    const answers = c.answers !== false;
    const fig = (value, label, dx, lit) => `<text x="${x + dx}" y="${y + 36}" text-anchor="end" font-family="${FONT}" font-size="24" font-weight="700" fill="${lit ? t.lime : t.ink}">${Number.isFinite(value) ? esc(n(value)) : '–'}</text><text x="${x + dx}" y="${y + 54}" text-anchor="end" font-family="${FONT}" font-size="12" fill="${t.sec}">${esc(label)}</text>`;
    return `<g><rect x="${x}" y="${y}" width="${tw}" height="64" rx="10" fill="${t.panel}" stroke="${t.line}"/>
<rect x="${x}" y="${y + 17}" width="4" height="30" rx="2" fill="${answers ? t.lime : t.faint}"/>
<text x="${x + 22}" y="${y + 29}" font-family="${FONT}" font-size="16" font-weight="600" fill="${t.ink}">${esc(c.chain)}</text>
<text x="${x + 22}" y="${y + 49}" font-family="${MONO}" font-size="12" fill="${t.sec}">${esc(answers ? `eip155:${c.chainId} · answers` : `eip155:${c.chainId} · read only`)}</text>
${fig(c.requestsRead, 'requests read', 300, false)}${fig(c.answered, 'answered on chain', 440, false)}${fig(c.responses?.shipped, 'of them "shipped"', 580, true)}</g>`;
  };
  const tiles = chains.length ? chains.map(tile).join('\n') : `<text x="560" y="130" font-family="${FONT}" font-size="15" fill="${t.sec}">Validator counts: not read</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(`HEY's ERC-8004 validator answers one claim, that a project shipped between two times, from its counted ships. ${chains.map((c) => `${c.chain}: ${c.requestsRead ?? 'not read'} requests read, ${c.answered ?? 'not read'} answered`).join('; ')}.`)}">
<style>.t{animation:in .7s ease-out both}@keyframes in{from{opacity:0;transform:translateX(-6px)}}.w{stroke-dasharray:4 5;animation:flow 1.4s linear infinite}@keyframes flow{to{stroke-dashoffset:-18}}${REDUCED}</style>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<text x="40" y="48" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${t.lime}">AGENTS CHECKING AGENTS · ERC-8004 VALIDATOR</text>
<text x="560" y="48" font-family="${FONT}" font-size="15" fill="${t.sec}">One claim, read from the Validation Registry on each chain</text>
<rect x="40" y="70" width="480" height="38" rx="8" fill="${t.panel}" stroke="${t.line}"/>
<text x="56" y="94" font-family="${MONO}" font-size="13" fill="${t.ink}">hey-ship-claim:1:<tspan fill="${t.lime}">&lt;slug&gt;</tspan>:<tspan fill="${t.lime}">&lt;since&gt;</tspan>:<tspan fill="${t.lime}">&lt;until&gt;</tspan></text>
${flow}
${tiles}
<text x="40" y="${h - 22}" font-family="${MONO}" font-size="12" fill="${t.sec}">How to ask: heyresearch.xyz/developers/agents#validate · counts: heyresearch.xyz/api/agent/stats</text>
</svg>
`;
}
