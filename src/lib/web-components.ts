import AudioPlayer from './audio/AudioPlayer.wc.svelte'
import type { SvelteComponent } from 'svelte'

customElements.define(
  // I recommend prefixing your custom elements, but for this example
  // I'm keeping it simple.
  'xtaocode-audio-player',
  class extends HTMLElement {
    _element: SvelteComponent;
    
    constructor() {
      super()
  
      // Create the shadow root.
      const shadowRoot = this.attachShadow({ mode: 'open' })
  
      // Instantiate the Svelte Component
      this._element = new AudioPlayer({
        // Tell it that it lives in the shadow root
        target: shadowRoot,
        // Pass any props
        // props: {
        //   // This is the place where you do any conversion between
        //   // the native string attributes and the types you expect
        //   // in your svelte components
        //   items: this.getAttribute('items').split(','),
        // },
      })
    }
    disconnectedCallback(): void {
      // Destroy the Svelte component when this web component gets
      // disconnected. If this web component is expected to be moved
      // in the DOM, then you need to use `connectedCallback()` and
      // set it up again if necessary.
      this._element?.$destroy();
    }
  }
)