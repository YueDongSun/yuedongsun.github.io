# Tools page

The canonical software overview is https://yuedongsun.github.io/tools/.

It introduces three complementary projects: Tailnet Mesh for machine coordination, AI Agent Gateway for provider routing, and VibeMux for coding-agent workflows. AI Agent Gateway and VibeMux link to their public repositories; Tailnet Mesh has a contact entry.

Content is in `config/tools.ts`. The presentation is in `components/tools_showcase.tsx` with scoped styles in `components/tools_showcase.module.css`. The route and metadata are in `app/tools/page.tsx`.

The three product identifiers `tailnet_mesh`, `cc`, and `vibemux` are stable link targets. Current development stages appear beside each project. The page shares the warm palette, compact typography, navigation, and print behaviour of the personal homepage.

The former standalone Tools Site is configured separately to redirect its root to this route, preserving existing fragments in browser navigation. Update this repository to change the public software introductions.
