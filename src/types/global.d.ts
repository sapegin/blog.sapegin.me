declare global {
	namespace JSX {
		interface IntrinsicElements {
			nobr: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}

// HACK: We must force tsc to interpret this file as a module, resolves
// "Augmentations for the global scope can only be directly nested in external
// modules or ambient module declarations." error
export {};
