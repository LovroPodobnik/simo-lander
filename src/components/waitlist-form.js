/**
 * Waitlist Form Component
 * 
 * A modal form that appears when the user clicks the "JOIN WAITLIST" button.
 * Handles form submission and validation.
 */

class WaitlistForm {
  constructor() {
    this.initialized = false;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // Create modal container
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal-container';
    this.modalContainer.style.display = 'none';
    this.modalContainer.setAttribute('role', 'dialog');
    
    // Create modal content
    this.modalContent = `
      <div class="modal-overlay"></div>
      <div class="modal-dialog">
        <button class="modal-close">&times;</button>
        <div class="modal-header">
          <h2 class="modal-title">Join SIMO Waitlist</h2>
          <p class="modal-subtitle">Be the first to access our advanced security layer</p>
        </div>
        <form class="waitlist-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="Your email address">
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="terms" name="terms" required>
            <label for="terms">I agree to the Terms and Privacy Policy</label>
          </div>
          <button type="submit" class="cosmic-button primary submit-button">Join Waitlist</button>
        </form>
        <div class="form-success" style="display: none;">
          <div class="success-icon">✓</div>
          <h3>You're on the list!</h3>
          <p>We'll let you know when SIMO is ready.</p>
        </div>
      </div>
    `;
    
    this.modalContainer.innerHTML = this.modalContent;
    document.body.appendChild(this.modalContainer);
    
    // Add event listeners
    this.addEventListeners();
    
    // Add styles
    this.addStyles();
    
    this.initialized = true;
  }
  
  addEventListeners() {
    // Get the waitlist button
    const waitlistButton = document.querySelector('.cosmic-button.primary');
    
    if (waitlistButton) {
      waitlistButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
    
    // Close button
    const closeButton = this.modalContainer.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Close on overlay click
    const overlay = this.modalContainer.querySelector('.modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Form submission
    const form = this.modalContainer.querySelector('.waitlist-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(form);
      });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  addStyles() {
    // The styles are defined in the main CSS file
  }
  
  open() {
    this.modalContainer.style.display = 'flex';
    this.modalContainer.classList.add('active');
    document.body.classList.add('modal-open');
    this.isOpen = true;
    
    // Animation
    setTimeout(() => {
      this.modalContainer.querySelector('.modal-dialog').classList.add('modal-dialog-show');
    }, 10);
  }
  
  close() {
    const dialog = this.modalContainer.querySelector('.modal-dialog');
    dialog.classList.remove('modal-dialog-show');
    this.modalContainer.classList.remove('active');
    
    // Animation before closing
    setTimeout(() => {
      this.modalContainer.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.isOpen = false;
      
      // Reset form if it was successful
      const successMessage = this.modalContainer.querySelector('.form-success');
      const form = this.modalContainer.querySelector('.waitlist-form');
      
      if (successMessage.style.display === 'block') {
        successMessage.style.display = 'none';
        form.style.display = 'block';
        form.reset();
      }
    }, 300);
  }
  
  handleSubmit(form) {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // In a real implementation, you would send this data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = this.modalContainer.querySelector('.form-success');
    if (successMessage) {
      form.style.display = 'none';
      successMessage.style.display = 'block';
      
      // Close after a few seconds
      setTimeout(() => {
        this.close();
      }, 3000);
    }
  }
}

// Initialize the waitlist form when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.waitlistForm = new WaitlistForm();
});