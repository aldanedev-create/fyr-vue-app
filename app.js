// app.js
import { Fyr } from '@aldane-dev-create/fyr';
import { toast } from '@aldane-dev-create/fyr/ui';

// ==========================================
// FYR CONTROLLER - Main App
// ==========================================
Fyr.controller('main', {
  state: {
    // Navigation
    activeTab: 'fyr',

    // Fyr state
    fyrCount: 0,
    fyrItems: ['Fyr Item 1', 'Fyr Item 2'],
    fyrNewItem: '',

    // Shared state (synced with Vue)
    sharedMessage: 'Hello from Fyr!',

    // Vue count (will be updated from Vue)
    vueCount: 0
  },

  methods: {
    // === Tab switching ===
    switchTab(tab) {
      this.state.activeTab = tab;
    },

    // === Fyr items ===
    addFyrItem() {
      const text = this.state.fyrNewItem.trim();
      if (text) {
        this.state.fyrItems.push(text);
        this.state.fyrNewItem = '';
      }
    },

    removeFyrItem(item) {
      this.state.fyrItems = this.state.fyrItems.filter(i => i !== item);
    },

    // === Shared state ===
    updateFyrMessage() {
      // Just a placeholder - fyr-model already updates it
      toast.success('Fyr message updated!');
    },

    // Called when Vue sends a message
    receiveFromVue(message) {
      this.state.sharedMessage = message;
      toast.info('Message from Vue: ' + message);
    },

    // Called when Vue updates its count
    updateVueCount(count) {
      this.state.vueCount = count;
    }
  },

  mounted() {
    console.log('🔥 Fyr controller mounted!');

    // Listen for events from Vue
    document.addEventListener('vue-to-fyr', (e) => {
      if (e.detail.type === 'message') {
        this.receiveFromVue(e.detail.payload);
      }
      if (e.detail.type === 'count') {
        this.updateVueCount(e.detail.payload);
      }
    });

    // Expose state to Vue via global
    window.__fyrState = this.state;

    toast.info('Fyr + Vue app ready!');
  }
});

// ==========================================
// VUE APP
// ==========================================

// Vue App 1 - Counter (on Vue tab)
const vueApp = Vue.createApp({
  data() {
    return {
      vueCount: 0,
      vueTodos: ['Vue Todo 1', 'Vue Todo 2'],
      vueNewTodo: '',
      sharedMessage: ''
    };
  },

  methods: {
    addVueTodo() {
      const text = this.vueNewTodo.trim();
      if (text) {
        this.vueTodos.push(text);
        this.vueNewTodo = '';
      }
    },

    removeVueTodo(index) {
      this.vueTodos.splice(index, 1);
    },

    sendToFyr() {
      // Send message to Fyr
      const event = new CustomEvent('vue-to-fyr', {
        detail: {
          type: 'message',
          payload: this.sharedMessage || 'Hello from Vue!'
        }
      });
      document.dispatchEvent(event);
    },

    syncCountToFyr() {
      const event = new CustomEvent('vue-to-fyr', {
        detail: {
          type: 'count',
          payload: this.vueCount
        }
      });
      document.dispatchEvent(event);
    }
  },

  watch: {
    vueCount(newVal) {
      this.syncCountToFyr();
    }
  },

  mounted() {
    console.log('💚 Vue app mounted!');

    // Watch for Fyr state changes
    setInterval(() => {
      if (window.__fyrState) {
        this.sharedMessage = window.__fyrState.sharedMessage;
      }
    }, 200);
  }
});

// Mount Vue app
vueApp.mount('#vue-app');

// ==========================================
// VUE APP 2 - Both Together Tab
// ==========================================
const vueBothApp = Vue.createApp({
  data() {
    return {
      vueMessage: '',
      sharedMessage: '',
      vueTodos: ['Vue Todo A', 'Vue Todo B']
    };
  },

  methods: {
    sendToFyr() {
      const event = new CustomEvent('vue-to-fyr', {
        detail: {
          type: 'message',
          payload: this.vueMessage || 'Hello from Vue!'
        }
      });
      document.dispatchEvent(event);
      this.vueMessage = '';
    }
  },

  mounted() {
    // Watch for Fyr state changes
    setInterval(() => {
      if (window.__fyrState) {
        this.sharedMessage = window.__fyrState.sharedMessage;
      }
    }, 200);

    // Also update the display in the footer
    setInterval(() => {
      const display = document.getElementById('vue-count-display');
      if (display && window.__fyrState) {
        display.textContent = window.__fyrState.vueCount;
      }
    }, 200);
  }
});

vueBothApp.mount('#vue-both-app');

// ==========================================
// START FYR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  Fyr.start('fyr-vue');
});

console.log('⚡ Fyr + Vue.js loaded!');