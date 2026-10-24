<a href="https://heyresearch.xyz">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <img alt="Hey Research Lab: the public record of building on Robinhood Chain" src="assets/banner-light.svg" width="100%">
  </picture>
</a>

<p>
  <a href="https://heyresearch.xyz"><img alt="Website" src="https://img.shields.io/badge/heyresearch.xyz-127a50?style=flat-square"></a>
  <a href="https://x.com/HeyResearch"><img alt="X" src="https://img.shields.io/badge/X-@HeyResearch-0a0d12?style=flat-square&logo=x"></a>
  <a href="https://heyresearch.xyz/mcp"><img alt="MCP server" src="https://img.shields.io/badge/MCP-heyresearch.xyz%2Fmcp-6454c8?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@hey-research-lab/sdk"><img alt="npm" src="https://img.shields.io/npm/v/@hey-research-lab/sdk?style=flat-square&label=sdk"></a>
  <a href="https://heyresearch.xyz/data"><img alt="Open data" src="https://img.shields.io/badge/open%20data-CC%20BY%204.0-4a5260?style=flat-square"></a>
</p>

Robinhood Chain has more than a million token contracts. We can prove about a thousand teams are building on it.
**Hey Research Lab** reads their code, releases and contract deployments and answers one question with evidence:
**who is still building, and what did they ship?** Every claim links to its source. Price is context, never the verdict.
Browsing needs no wallet, and nothing on HEY is for sale.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/stats-dark.svg">
  <img alt="Hey Research Lab in numbers" src="assets/stats-light.svg" width="100%">
</picture>

## 🛠️ Fixes we sent upstream

<!-- FIXES:START -->
**181 pull requests** sent to **147 repositories** we don’t own, **21 merged** so far. When we read a team’s code to check what they shipped and find a bug we can fix, we send the fix: dead explorer links, wrong chain config, block-time maths, stale contract addresses. Each one is the team’s call to take.

| Merged into | The fix |
| --- | --- |
| [vfat-io/vfat-tools](https://github.com/vfat-io/vfat-tools/pull/2481) | Keep Robinhood Morpho and Equilibra log reads within the RPC block limit |
| [vfat-io/vfat-tools](https://github.com/vfat-io/vfat-tools/pull/2492) | TETRAVAULT: read a wallet's bond vesting from its positions |
| [1xGiraffe/hydration-neckwork](https://github.com/1xGiraffe/hydration-neckwork/pull/8) | fix(mcp): bound tool input size and bump the MCP SDK to 1.32 (GHSA-46jr-4wx8-v453) |
| [DefiLlama/dimension-adapters](https://github.com/DefiLlama/dimension-adapters/pull/10386) | catnip: count the 1/3 protocol fee the pairs mint to the NIP maker |
| [cryptoduke01/gloam](https://github.com/cryptoduke01/gloam/pull/6) | Point the issue chooser at SECURITY.md for vulnerability reports |
| [cordialsys/crosschain](https://github.com/cordialsys/crosschain/pull/281) | evm: report the fee from the receipt's effectiveGasPrice |
| [ethereum-lists/chains](https://github.com/ethereum-lists/chains/pull/8891) | Remove unreachable ArrowRPC endpoint from Robinhood Chain (eip155-4663) |
| [chainstacklabs/robinhood-chain-sequencer-feed](https://github.com/chainstacklabs/robinhood-chain-sequencer-feed/pull/19) | fix: void the whole l2Msg when arbos rejects one batch entry |
| [sherwoodagent/sherwood-protocol](https://github.com/sherwoodagent/sherwood-protocol/pull/396) | docs(adapter): document UniswapSwapAdapter extraData as abi.encodePacked(uint8 mode, route) |
| [sherwoodagent/sherwood-protocol](https://github.com/sherwoodagent/sherwood-protocol/pull/395) | docs: match the bondOf and pendingCertificationOf cast return tuples to TierRegistry |
| [EqualFiLabs/statics-oracle](https://github.com/EqualFiLabs/statics-oracle/pull/22) | Record the live 3-of-5 sequencer quorum in the asset manifest |
| [DefiLlama/chainlist](https://github.com/DefiLlama/chainlist/pull/3266) | fix(4663): remove Robinscan, whose domain no longer resolves |

Every fix, open, merged or closed: **[heyresearch.xyz/contributions](https://heyresearch.xyz/contributions)** · <sub>refreshed daily</sub>
<!-- FIXES:END -->

## 🔎 Use it

| | |
| --- | --- |
| **Check any token or project** | [heyresearch.xyz](https://heyresearch.xyz) · from a terminal: `npx github:hey-research-lab/hey-check '$TICKER'` |
| **Weekly builder report** | who shipped on Robinhood Chain this week, each ship with its source: [heyresearch.xyz/updates](https://heyresearch.xyz/updates) |
| **Public API** | one call per token: `GET /api/v1/builder?chain=4663&token=0x…` · [docs](https://heyresearch.xyz/developers) · [changelog](https://heyresearch.xyz/developers/changelog) |
| **Embed** | a live builder card on any site: `<hey-project contract="0x…">` · [embeds](https://heyresearch.xyz/developers) |
| **Badge** | a project's live HEY badge for its site or README; projects showing one are thanked on [heyresearch.xyz/badges](https://heyresearch.xyz/badges) |
| **Open data** | daily snapshots, CC BY 4.0: [heyresearch.xyz/data](https://heyresearch.xyz/data) |

## 🤖 For AI agents

- **Hosted MCP server:** `https://heyresearch.xyz/mcp`, no key. Listed as a community connector in
  [Claude's Connectors Directory](https://claude.ai/directory/hey-research-lab).
- **On chain:** HEY is registered as an ERC-8004 agent on Robinhood Chain (agent #8783), with an A2A card at
  [`/.well-known/agent-card.json`](https://heyresearch.xyz/.well-known/agent-card.json).
- **Skills and plugins:** [hey-agent-skills](https://github.com/hey-research-lab/hey-agent-skills) (an Agent Skill and Claude Code plugin).

## 🤝 Working with

| Project | How |
| --- | --- |
| [Chit](https://x.com/usechit) | Chit's bot shows HEY's builder card for a token, where people trade |
| [RHTools](https://x.com/RHToolsXYZ) | RHTools draws the chart, HEY answers who built the token; each links to the other |
| [HoodLock](https://x.com/HoodLockRH) | HEY reads HoodLock's locks on chain and shows each on the token's page |
| [Orus](https://x.com/Orus_agent) | Orus's trading agents can use HEY's builder evidence as an optional entry filter |
| [Axon](https://x.com/axon402) | shows its live HEY badge on its own site |
| [PFWA](https://x.com/pfwafun) | shows HEY's builder card on every Robinhood Chain token market, our badge in its footer and HEY in its "Powered by" strip |

Building on Robinhood Chain and want builder context in your product? The API, the embed and the badge are free:
[heyresearch.xyz/developers/partners](https://heyresearch.xyz/developers/partners).

## 📦 Open source

| Repository | What it is |
| --- | --- |
| [awesome-robinhood-chain](https://github.com/hey-research-lab/awesome-robinhood-chain) | Projects building on Robinhood Chain, regenerated weekly from the open dataset |
| [hey-check](https://github.com/hey-research-lab/hey-check) | Dev check for any Robinhood Chain token: is anyone building it? A terminal answer and a shareable card |
| [chainprint](https://github.com/hey-research-lab/chainprint) | Offline scan of a source tree for evidence that the code targets Robinhood Chain, with a confidence anyone can recompute |
| [rhchain-registry](https://github.com/hey-research-lab/rhchain-registry) | A CI-validated registry of Robinhood Chain infrastructure, a public source for every entry |
| [hey-cli](https://github.com/hey-research-lab/hey-cli) | HEY's research from the terminal |
| [hey-ship-action](https://github.com/hey-research-lab/hey-ship-action) | A GitHub Action that writes evidence linking a commit or release to a Robinhood Chain deployment |
| [hey-agent-skills](https://github.com/hey-research-lab/hey-agent-skills) | An Agent Skill and Claude Code plugin for builder research |
| [hey-research-open](https://github.com/hey-research-lab/hey-research-open) | The open part of the platform: SDK, MCP server, scoring and source adapters |

Every public repository, including data snapshots, embeds and agent-framework plugins:
[github.com/hey-research-lab](https://github.com/hey-research-lab?tab=repositories&type=source).

**Contribute:** small, well-described issues are labelled
[good first issue](https://github.com/search?q=user%3Ahey-research-lab+label%3A%22good+first+issue%22+state%3Aopen&type=issues).
Found a security issue in one of our repositories? Write to hi@heyresearch.xyz or [x.com/HeyResearch](https://x.com/HeyResearch).

<sub>Community-run by Hey Research Lab · not affiliated with or endorsed by Robinhood · a HEY badge is verified from
public evidence, not a Robinhood certification · not investment advice.</sub>
