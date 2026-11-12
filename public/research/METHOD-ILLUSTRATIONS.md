# Research method illustrations

These original, code-authored SVGs explain the methods described in this site's `config/profile.json`. They are qualitative schematics, not published-paper figures, measured data, simulated results, or photographs. Each graphic contains a visible **METHOD SCHEMATIC** label and an accessible SVG title and description.

All three files are **1200 × 760**, use self-contained vector shapes and text, and contain no external images, font requests, stylesheets, or scripts. The warm ivory, copper, sage and blue-gray palette groups concepts; its colours do not encode measured values.

Created on 12 November 2026. Suggested website source label: **Schematic · research methods**.

| File | Project ID | Description and limits |
|---|---|---|
| `oam_mode_workflow.svg` | `slm_oam_multiplexing` | SLM phase preparation, optical mode analysis with AOD routing and alignment, then coupling and crosstalk characterisation. The phase-mask grid, mode rings, and overlap icon are qualitative illustrations; no measured coupling efficiencies, crosstalk matrix, or reconstructed mode profiles are supplied. |
| `rare_earth_model_workflow.svg` | `rare_earth_memory_modeling` | Local crystal environment → microscopic Hamiltonian terms → effective low-energy spin model → transition, ZEFOZ and memory-protocol comparisons. The local coordination drawing is an abstract environment icon, not an asserted crystallographic unit cell. The transition symbol is unnumbered and does not reproduce an energy spectrum. |
| `er3_optical_microwave_interface.svg` | `er3_yso_single_ion_node` | An optical mode couples through a grating/photonic interface towards an Er³⁺:YSO ion; microwave/CPW control forms the second interface. The lower workflow covers electromagnetic design and simulation, fabrication, and SEM inspection. Device geometry is conceptual and not to scale; the SEM icon is not a micrograph. |

## Source descriptions

### OAM multimode multiplexing

Based on the project's existing account of complementary AOD beam routing and SLM-generated OAM modes, optical alignment, mode characterisation, and Python analysis of coupling and crosstalk. The diagram complements `oam_multiplexing.png` by showing the research workflow.

### Rare-earth quantum-memory modelling

Based on the existing description of full Hamiltonians containing free-ion, crystal-field, Zeeman and hyperfine terms, reduction to low-energy spin Hamiltonians, ZEFOZ analysis, and comparison of AFC, spin-wave storage, NLPE-DLCZ and single-ion repeater schemes. `S`, `I` and `B` are symbolic model degrees of freedom and a field parameter; no fitted constants or numerical model outputs are provided. The diagram complements `rare_earth_hamiltonian.png` by organising the model hierarchy.

### Er³⁺:YSO optical–microwave interface

Based on the existing description of optical and microwave interface design, electromagnetic simulation, grating couplers, coplanar waveguides, and nanofabrication workflows. The diagram complements `er3_yso_nanofabrication.png` with a conceptual interface and process view, preserving the distinction between a method schematic and actual SEM imagery.

## Production and review

The SVGs were drawn directly with code, without image generation. Temporary PNGs were rendered with Sharp and visually inspected at their native 1200 × 760 dimensions for text overlap, clipping, and arrow/diagram readability. Only the SVG assets and this source note belong in the website repository.
