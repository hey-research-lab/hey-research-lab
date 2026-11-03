<a href="https://heyresearch.xyz">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <img alt="Hey Research Lab: the public record of building on Robinhood Chain" src="assets/banner-light.svg" width="100%">
  </picture>
</a>

<p align="center">
  <a href="https://heyresearch.xyz"><img alt="Website" src="https://img.shields.io/badge/web-heyresearch.xyz-C2FB03?style=flat-square&color=0B0E11&labelColor=1F242B"></a>
  <a href="https://x.com/HeyResearch"><img alt="X" src="https://img.shields.io/badge/X-HeyResearch-C2FB03?style=flat-square&color=0B0E11&labelColor=1F242B&logo=x"></a>
  <a href="https://heyresearch.xyz/mcp"><img alt="MCP server" src="https://img.shields.io/badge/MCP-heyresearch.xyz%2Fmcp-C2FB03?style=flat-square&color=0B0E11&labelColor=1F242B"></a>
  <a href="https://www.npmjs.com/package/@hey-research-lab/sdk"><img alt="npm" src="https://img.shields.io/npm/v/@hey-research-lab/sdk?style=flat-square&color=0B0E11&labelColor=1F242B&label=sdk"></a>
  <a href="https://heyresearch.xyz/data"><img alt="Open data" src="https://img.shields.io/badge/open%20data-CC%20BY%204.0-C2FB03?style=flat-square&color=0B0E11&labelColor=1F242B"></a>
</p>

<p align="center">
  Robinhood Chain has more than a million token contracts. We prove which teams are actually building on it.<br>
  <b>Hey Research Lab</b> reads their code, releases and contract deployments and answers one question with evidence:<br>
  <b>who is still building, and what did they ship?</b> Every claim links to its source. Price is context, never the verdict.
</p>

<p align="center">
  <a href="#robinhood-chain-live">The chain, live</a> ·
  <a href="#for-builders">For builders</a> ·
  <a href="#for-ai-agents">For AI agents</a> ·
  <a href="#fixes-we-sent-upstream">Fixes we sent upstream</a> ·
  <a href="#use-it">Use it</a> ·
  <a href="#open-source">Open source</a>
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/stats-dark.svg">
  <img alt="Hey Research Lab in numbers" src="assets/stats-light.svg" width="100%">
</picture>

## Robinhood Chain, live

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/chain-dark.svg">
  <img alt="Every Robinhood Chain project HEY reads as shipping or active, newest ship at the centre" src="assets/chain-light.svg" width="100%">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/launches-dark.svg">
  <img alt="Token launches a day against builders who shipped that day, the last 14 days" src="assets/launches-light.svg" width="100%">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ships-dark.svg">
  <img alt="This week's newest ships on Robinhood Chain, each with its source on heyresearch.xyz" src="assets/ships-light.svg" width="100%">
</picture>

Redrawn every day from [heyresearch.xyz](https://heyresearch.xyz)'s public API. Browsing HEY needs no wallet, and nothing on it is for sale.

## For builders

Building on Robinhood Chain? Everything here is free, and none of it buys a place: what you ship decides.

| | |
| --- | --- |
| **A page that shows your work** | every release, deployment and code week we read, each linked to its source: find yours on [heyresearch.xyz](https://heyresearch.xyz) or [submit it](https://heyresearch.xyz/submit) |
| **Fixes, not just findings** | we read your public code; when we find a bug we can fix, we send a pull request, and anything security-related goes to you privately first |
| **A live badge** | your HEY badge for your site or README, updated from public evidence: [heyresearch.xyz/badges](https://heyresearch.xyz/badges) |
| **Funding for shipping** | backers can fund you in $WIF through [Proof of Ship](https://github.com/hey-research-lab/proof-of-ship), an escrow that pays only when HEY counts real ships |
| **Your data, open** | the API, the embed and the open dataset are free for your own product: [heyresearch.xyz/developers](https://heyresearch.xyz/developers) |
| **Counted in Electric Capital's developer data** | we added Robinhood Chain to [Open Dev Data](https://github.com/electric-capital/open-dev-data/pull/3115) as its own ecosystem (1,183 repositories) and send it a monthly update, so builders here show up in the industry's developer numbers |

## For AI agents

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/agent-dark.svg">
  <img alt="HEY Research Lab, one ERC-8004 agent on Robinhood Chain, Ethereum and Base" src="assets/agent-light.svg" width="100%">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/agents-dark.svg">
  <img alt="AI agents registered on Robinhood Chain over the last 30 days" src="assets/agents-light.svg" width="100%">
</picture>

The hosted MCP server is listed as a community connector in [Claude's Connectors Directory](https://claude.ai/directory/hey-research-lab).
Skills and plugins: [hey-agent-skills](https://github.com/hey-research-lab/hey-agent-skills), an Agent Skill and Claude Code plugin.

## Fixes we sent upstream

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/fixes-dark.svg">
  <img alt="One square per repository we sent a fix to: merged, open or closed" src="assets/fixes-light.svg" width="100%">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/fixes-timeline-dark.svg">
  <img alt="Pull requests sent upstream and merged, day by day" src="assets/fixes-timeline-light.svg" width="100%">
</picture>

<details>
<summary><b>The latest fixes merged</b></summary>

<!-- FIXES:START -->
**287 pull requests** sent to **229 repositories** we don’t own, **50 merged** so far. When we read a team’s code to check what they shipped and find a bug we can fix, we send the fix: dead explorer links, wrong chain config, block-time maths, stale contract addresses. Each one is the team’s call to take.

| Merged into | The fix |
| --- | --- |
| [0xfnzero/FnzSafe](https://github.com/0xfnzero/FnzSafe/pull/9) | extension: skip discovered tokens whose decimals are null instead of reading them as 0 |
| [0xfnzero/FnzSafe](https://github.com/0xfnzero/FnzSafe/pull/7) | evm-services: fix Robinhood Chain explorer URL (robinscan.io does not resolve) |
| [ahmet/awesome-web3](https://github.com/ahmet/awesome-web3/pull/863) | Add HEY Research Lab |
| [1Shot-API/embedded-wallet](https://github.com/1Shot-API/embedded-wallet/pull/154) | Fix the Ethereum BTC/USD and PAXG/USD addresses in the trusted Chainlink feed list |
| [DefiLlama/chainlist](https://github.com/DefiLlama/chainlist/pull/3309) | fix(4663): remove OrdoFi RPC, whose domain no longer resolves |
| [blockscout/chainscout](https://github.com/blockscout/chainscout/pull/319) | Robinhood Chain Testnet: settlement layer is Sepolia (11155111), not Ethereum mainnet |
| [Hookr-fun/hookr-contracts](https://github.com/Hookr-fun/hookr-contracts/pull/22) | Add a security policy for private vulnerability reports |
| [nirholas/robinhood-chain-trading-bot](https://github.com/nirholas/robinhood-chain-trading-bot/pull/7) | fix(agent): do not book a live swap whose transaction reverted |
| [nirholas/robinhood-chain-alert-bot](https://github.com/nirholas/robinhood-chain-alert-bot/pull/9) | fix(engine): deliver an event once per subscriber when several subscriptions match |
| [nirholas/robinhood-chain-launcher](https://github.com/nirholas/robinhood-chain-launcher/pull/9) | fix(auto): do not mark a proposal executed when its launch was blocked at preflight |
| [nirholas/robinhood-chain-launcher](https://github.com/nirholas/robinhood-chain-launcher/pull/8) | fix(auto): store proposals whose preflight and config carry bigints |
| [nirholas/loxley](https://github.com/nirholas/loxley/pull/1) | fix(chain): point the testnet explorer at explorer.testnet.chain.robinhood.com |

Every fix, open, merged or closed: **[heyresearch.xyz/contributions](https://heyresearch.xyz/contributions)** · <sub>refreshed daily</sub>
<!-- FIXES:END -->

</details>

<details>
<summary><b>Fixes teams shipped in their own commits</b></summary>

Some teams take a fix into their own commit instead of merging ours. These count the same to us:

| Shipped by | What landed |
| --- | --- |
| [Gloam](https://github.com/cryptoduke01/gloam/pull/124) | all six fixes from [#117](https://github.com/cryptoduke01/gloam/pull/117) to [#122](https://github.com/cryptoduke01/gloam/pull/122): MCP version pins, cash-out address guard, payment settlement, API key rename, MCP spend limits, access-key generation |
| [HoodFi](https://github.com/RWA-ID/hoodfi-eth) | [#12](https://github.com/RWA-ID/hoodfi-eth/pull/12), [#13](https://github.com/RWA-ID/hoodfi-eth/pull/13) and [#14](https://github.com/RWA-ID/hoodfi-eth/pull/14) merged with our commits in #17, #19 and #20; [#15](https://github.com/RWA-ID/hoodfi-eth/pull/15) shipped as a narrower fix in #18 |

</details>

Merged one of our fixes and liked it? A shout-out on X helps a small team keep sending them: tag
[x.com/HeyResearch](https://x.com/HeyResearch) and say what we fixed. That's the only thank-you we ask for.

## Security credits

When we find something that could put funds at risk, it goes to the team privately first, through their own channel.
We publish nothing until they do.

<details>
<summary><b>Published advisories we found (5)</b></summary>

| Project | Advisory | Severity | Our credit |
| --- | --- | --- | --- |
| [Priors](https://github.com/priors-agents/priors) | [GHSA-4w7q-8vph-j5mr](https://github.com/priors-agents/priors/security/advisories/GHSA-4w7q-8vph-j5mr): a PT-USDG price tape resumed after the feed dropped its rounds held credit for about 15 days and seized the whole deposit on default | Low | Finder |
| [Priors](https://github.com/priors-agents/priors) | [GHSA-jjxq-7r68-44m5](https://github.com/priors-agents/priors/security/advisories/GHSA-jjxq-7r68-44m5): Score v2 kept a market sale made after a plain transfer, carrying the intermediary's income | Low | Finder |
| [Priors](https://github.com/priors-agents/priors) | [GHSA-qcrq-x8xg-25vg](https://github.com/priors-agents/priors/security/advisories/GHSA-qcrq-x8xg-25vg): the stock vault's `borrowRoom` quoted room the vault and pool refuse | Low | Finder · fixed in Priors' readers, listed as [SV-21](https://github.com/priors-agents/priors/blob/main/docs/SECURITY-v2.md) |
| [Priors](https://github.com/priors-agents/priors) | [GHSA-xccq-5ghg-w7mq](https://github.com/priors-agents/priors/security/advisories/GHSA-xccq-5ghg-w7mq): a V5 borrow over 10 days sent a transaction before it was refused | Low | Finder · fixed in @priors/x402 0.8.3 and @priors/mcp 0.12.1, listed as [P-49](https://github.com/priors-agents/priors/blob/main/docs/SECURITY-v2.md) |
| [Priors](https://github.com/priors-agents/priors) | [GHSA-3vg6-2f3m-j5qm](https://github.com/priors-agents/priors/security/advisories/GHSA-3vg6-2f3m-j5qm): a new PT-USDG price tape started at round 1 once the feed had dropped its old rounds | Low | Finder · fixed on chain, listed as [SV-20](https://github.com/priors-agents/priors/blob/main/docs/SECURITY-v2.md) |

</details>

Maintain a Robinhood Chain project and want a second pair of eyes? Turn on
[private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/working-with-repository-security-advisories/configuring-private-vulnerability-reporting-for-a-repository)
on your repository, and we report there.

## Use it

| | |
| --- | --- |
| **Check any token or project** | [heyresearch.xyz](https://heyresearch.xyz) · from a terminal: `npx @hey-research-lab/check '$TICKER'` |
| **Weekly builder report** | who shipped on Robinhood Chain this week, each ship with its source: [heyresearch.xyz/reports/weekly](https://heyresearch.xyz/reports/weekly) |
| **Public API** | one call per token: `GET /api/v1/builder?chain=4663&token=0x…` · [docs](https://heyresearch.xyz/developers) · [changelog](https://heyresearch.xyz/developers/changelog) |
| **Embed** | a live builder card on any site: `<hey-project contract="0x…">` · [embeds](https://heyresearch.xyz/developers) |
| **Token Passport** | a token's page credits the Robinhood Chain protocols whose facts HEY reads (a HoodLock lock, the launchpad that minted it, its Uniswap v4 hooks), each with a link: [heyresearch.xyz/passport](https://heyresearch.xyz/passport) |
| **Badge** | a project's live HEY badge for its site or README; projects showing one are thanked on [heyresearch.xyz/badges](https://heyresearch.xyz/badges) |
| **Open data** | daily snapshots, CC BY 4.0: [heyresearch.xyz/data](https://heyresearch.xyz/data) |

## Working with

| Project | How |
| --- | --- |
| [Chit](https://x.com/usechit) | Chit's bot shows HEY's builder card for a token, where people trade |
| [RHTools](https://x.com/RHToolsXYZ) | RHTools draws the chart, HEY answers who built the token; each links to the other |
| [HoodLock](https://x.com/HoodLockRH) | HEY reads HoodLock's locks on chain and shows each on the token's page |
| [Orus](https://x.com/Orus_agent) | Orus's trading agents can use HEY's builder evidence as an optional entry filter |
| [Axon](https://x.com/axon402) | shows its live HEY badge on its own site |
| [PFWA](https://x.com/pfwafun) | shows HEY's builder card on every Robinhood Chain token market, our badge in its footer and HEY in its "Powered by" strip |

Building on Robinhood Chain and want builder context in your product? The API, the embed and the badge are free:
[heyresearch.xyz/developers/partners](https://heyresearch.xyz/developers/partners). Running a protocol on Robinhood Chain with
public on-chain data or a public API? Ask to join the [Token Passport](https://heyresearch.xyz/passport); nobody pays for a stamp.

## Open source

<details>
<summary><b>Our public repositories</b></summary>

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

</details>

Every public repository, including data snapshots, embeds and agent-framework plugins:
[github.com/hey-research-lab](https://github.com/hey-research-lab?tab=repositories&type=source).
Small, well-described issues are labelled
[good first issue](https://github.com/search?q=user%3Ahey-research-lab+label%3A%22good+first+issue%22+state%3Aopen&type=issues).
Found a security issue in one of our repositories? Write to hi@heyresearch.xyz or [x.com/HeyResearch](https://x.com/HeyResearch).

<p align="center"><sub>Community-run by Hey Research Lab · not affiliated with or endorsed by Robinhood · a HEY badge is verified from
public evidence, not a Robinhood certification · not investment advice.</sub></p>
