// modalManager.js
class ModalManager {
  constructor() {
    this.listeners = new Map();
  }

  // Register a modal when it mounts
  register(id, callback) {
    this.listeners.set(id, callback);
    return () => this.listeners.delete(id); // Cleanup function
  }

  // Call this anywhere to open a specific modal (e.g., globalModal.open('delete_modal'))
  open(id, data = null) {
    const listener = this.listeners.get(id);
    if (listener) {
      listener(true, data);
    } else {
      console.warn(`Modal with ID "${id}" is not registered.`);
    }
  }

  // Call this to close a specific modal
  close(id) {
    const listener = this.listeners.get(id);
    if (listener) {
      listener(false, null);
    }
  }
}

export const globalModal = new ModalManager();
