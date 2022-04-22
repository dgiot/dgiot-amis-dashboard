import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    interface Window { Konva: any; }
  }
}
