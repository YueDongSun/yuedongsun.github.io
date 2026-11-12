export const publication_visuals: Record<
  string,
  {
    src: string;
    alt: string;
    caption: string;
    source_url: string;
    source_label?: string;
    width: number;
    height: number;
  }
> = {
  cui_metropolitan_network_node: {
    src: "/papers/hybrid-multiplexing-2026-fig1.webp",
    alt: "Complete Figure 1 showing a conceptual multiplexed trapped-ion network, the implemented ion–photon node highlighted within it, the time-bin protocol, and multiplexing enhancement scaling.",
    caption:
      "Fig. 1 · Implemented ion–photon node within a network concept; timing and scaling. Cui et al. (2026), CC BY-NC-ND 4.0.",
    source_url: "https://www.nature.com/articles/s41467-025-67311-5/figures/1",
    source_label: "Published figure · Nature Communications (2026)",
    width: 1991,
    height: 791,
  },
  zhang_12km_atom_photon: {
    src: "/papers/fast-delivery-2024-fig1.webp",
    alt: "Complete Figure 1 showing the quantum-repeater concept and the implemented multiplexed atom–photon heralding protocol over 12 km of fiber.",
    caption:
      "Fig. 1 · Repeater concept and the implemented atom–photon protocol. Zhang et al. (2024), CC BY 4.0.",
    source_url: "https://www.nature.com/articles/s41467-024-54691-3/figures/1",
    source_label: "Published figure · Nature Communications (2024)",
    width: 999,
    height: 755,
  },
  sun_sample_efficient_entanglement: {
    src: "/papers/cnn-bilstm-2026-fig1.webp",
    alt: "Complete Figure 1 comparing two CNN–BiLSTM architectures: convolutional features are either flattened or reshaped into a sequence before entanglement classification.",
    caption:
      "Preprint Fig. 1 · Two ways to connect convolutional features with BiLSTM classification. Q. Sun, Y. Sun et al. (2026), CC BY 4.0.",
    source_url: "https://arxiv.org/html/2601.22562v1#S3.F1",
    source_label: "Preprint figure · arXiv (2026)",
    width: 747,
    height: 446,
  },
};
