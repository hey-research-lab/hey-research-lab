// Refreshes the live parts of this profile: the stats card (light and dark) and the "fixes sent upstream" table.
// Reads only public sources: GitHub's search API (pull requests this account opened in repositories it does not own)
// and HEY's public /api/status. No dependency; Node 22.
//   GITHUB_TOKEN=... node scripts/refresh.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const ACCOUNT = 'hey-research-lab';
const HEY = 'https://heyresearch.xyz';
// Listings of HEY itself in other people's lists, not fixes (the same ones heyresearch.xyz/contributions leaves out).
const NOT_FIXES = new Set(['punkpeye/awesome-remote-mcp-servers', 'punkpeye/awesome-mcp-servers']);
const headers = { accept: 'application/vnd.github+json', 'user-agent': 'hey-research-lab-profile' };
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function search(q) {
  const items = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub search ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const body = await res.json();
    items.push(...body.items);
    if (items.length >= body.total_count || body.items.length < 100) break;
  }
  return items;
}

const repoOf = (item) => item.repository_url.replace('https://api.github.com/repos/', '');
const prs = (await search(`is:pr author:${ACCOUNT} -user:${ACCOUNT}`)).filter((item) => !NOT_FIXES.has(repoOf(item)));
const merged = prs.filter((item) => item.pull_request?.merged_at).sort((a, b) => b.pull_request.merged_at.localeCompare(a.pull_request.merged_at));
const repos = new Set(prs.map(repoOf));

const status = await (await fetch(`${HEY}/api/status`, { headers: { 'user-agent': 'hey-internal/profile-refresh' } })).json();
const catalog = status.catalog ?? {};
const pages = catalog.published;
const builders = catalog.verifiedBuildersOnChain;
const records = typeof catalog.hidden === 'number' && typeof pages === 'number' ? catalog.hidden + pages : undefined;
if (![pages, builders, records].every((n) => Number.isFinite(n))) throw new Error('HEY status did not answer with the catalogue counts');

const n = (v) => v.toLocaleString('en-US');
const today = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------- the stats card
function card(theme) {
  const t = theme === 'dark'
    ? { bg: '#0d1117', panel: '#161b22', line: '#30363d', ink: '#e6edf3', sec: '#8b949e', green: '#3fb950' }
    : { bg: '#ffffff', panel: '#f6f8fa', line: '#d0d7de', ink: '#1f2328', sec: '#59636e', green: '#127a50' };
  const tiles = [
    [n(records), 'Robinhood Chain projects and tokens on record'],
    [n(pages), 'project pages, every claim linked to its source'],
    [n(builders), 'teams proven to be building on Robinhood Chain'],
    [n(prs.length), `fixes sent to ${n(repos.size)} repositories we don’t own`],
    [n(merged.length), 'of those fixes merged by their teams'],
  ];
  const w = 1200, h = 170, gap = 14, tw = (w - 48 - gap * (tiles.length - 1)) / tiles.length;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const body = tiles.map(([value, label], i) => {
    const x = 24 + i * (tw + gap);
    const words = label.split(' ');
    const lines = [''];
    for (const word of words) (lines[lines.length - 1] + ' ' + word).trim().length > 26 ? lines.push(word) : (lines[lines.length - 1] = (lines[lines.length - 1] + ' ' + word).trim());
    return `<g><rect x="${x}" y="24" width="${tw}" height="${h - 48}" rx="10" fill="${t.panel}" stroke="${t.line}"/>
<text x="${x + 18}" y="72" font-size="34" font-weight="700" fill="${i >= 3 ? t.green : t.ink}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif" letter-spacing="-1">${esc(value)}</text>
${lines.map((line, j) => `<text x="${x + 18}" y="${98 + j * 17}" font-size="13" fill="${t.sec}" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">${esc(line)}</text>`).join('\n')}</g>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Hey Research Lab in numbers">
<rect width="${w}" height="${h}" rx="12" fill="${t.bg}"/>
${body}
</svg>
`;
}
writeFileSync('assets/stats-light.svg', card('light'));
writeFileSync('assets/stats-dark.svg', card('dark'));

// ---------------------------------------------------------------- the README's live sections
const md = (s) => s.replace(/\|/g, '\\|').replace(/[<>]/g, '');
const shown = merged.slice(0, 12);
const fixes = [
  `**${n(prs.length)} pull requests** sent to **${n(repos.size)} repositories** we don’t own, **${n(merged.length)} merged** so far. `
    + 'When we read a team’s code to check what they shipped and find a bug we can fix, we send the fix: dead explorer links, '
    + 'wrong chain config, block-time maths, stale contract addresses. Each one is the team’s call to take.',
  '',
  '| Merged into | The fix |',
  '| --- | --- |',
  ...shown.map((item) => `| [${md(repoOf(item))}](${item.html_url}) | ${md(item.title)} |`),
  '',
  `Every fix, open, merged or closed: **[heyresearch.xyz/contributions](${HEY}/contributions)** · <sub>refreshed ${today}</sub>`,
].join('\n');

let readme = readFileSync('README.md', 'utf8');
const between = (name, content) => {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(readme)) throw new Error(`README has no ${name} markers`);
  readme = readme.replace(re, `$1\n${content}\n$2`);
};
between('FIXES', fixes);
writeFileSync('README.md', readme);
console.log(`prs=${prs.length} repos=${repos.size} merged=${merged.length} pages=${pages} builders=${builders} records=${records}`);
