/**
 * Explore Component
 * 
 * Handles the explore functionality when the user clicks the "EXPLORE" button.
 * Shows information panels about SIMO features.
 */

class Explore {
  constructor() {
    this.currentPanel = 0;
    this.totalPanels = 3;
    this.isActive = false;
    
    this.init();
  }
  
  init() {
    // Create explore container
    this.exploreContainer = document.createElement('div');
    this.exploreContainer.className = 'explore-container';
    this.exploreContainer.style.display = 'none';
    
    // Create panels
    this.panels = [
      {
        title: 'Token Validation Pipeline',
        description: 'Three-phase validation process checks token safety, analyzes market metrics, and performs deep security verification to identify potential risks.',
        icon: '🔍'
      },
      {
        title: 'Advanced Detection System',
        description: 'Identifies suspicious patterns like coordinated token launches, insider trading, and irregular transfer patterns that indicate potential scams.',
        icon: '⚠️'
      },
      {
        title: 'Real-Time Protection',
        description: 'Monitors blockchain activity in real-time via WebSocket integration, providing immediate alerts when potentially unsafe tokens are detected.',
        icon: '🛡️'
      }
    ];
    
    // Create panel HTML
    let panelsHTML = '';
    this.panels.forEach((panel, index) => {
      panelsHTML += `
        <div class="explore-panel ${index === 0 ? 'active' : ''}" data-index="${index}">
          <div class="panel-icon">${panel.icon}</div>
          <h3 class="panel-title">${panel.title}</h3>
          <p class="panel-description">${panel.description}</p>
        </div>
      `;
    });
    
    // Create navigation
    const navigationHTML = `
      <div class="explore-navigation">
        <button class="nav-prev" disabled>&larr;</button>
        <div class="nav-indicators">
          ${this.panels.map((_, index) => `
            <div class="nav-indicator ${index === 0 ? 'active' : ''}"></div>
          `).join('')}
        </div>
        <button class="nav-next">&rarr;</button>
      </div>
    `;
    
    // Create close button
    const closeHTML = `<button class="explore-close">&times;</button>`;
    
    // Compose HTML
    this.exploreContainer.innerHTML = `
      <div class="explore-overlay"></div>
      <div class="explore-content">
        ${closeHTML}
        <div class="explore-panels">
          ${panelsHTML}
        </div>
        ${navigationHTML}
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(this.exploreContainer);
    
    // Add event listeners
    this.addEventListeners();
  }
  
  addEventListeners() {
    // Get explore button
    const exploreButton = document.querySelector('.cosmic-button.explore');
    
    if (exploreButton) {
      exploreButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
    
    // Close button
    const closeButton = this.exploreContainer.querySelector('.explore-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Navigation buttons
    const prevButton = this.exploreContainer.querySelector('.nav-prev');
    const nextButton = this.exploreContainer.querySelector('.nav-next');
    
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        this.goToPrevPanel();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.goToNextPanel();
      });
    }
    
    // Indicators
    const indicators = this.exploreContainer.querySelectorAll('.nav-indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToPanel(index);
      });
    });
    
    // Close on overlay click
    const overlay = this.exploreContainer.querySelector('.explore-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isActive) {
        this.close();
      }
    });
  }
  
  open() {
    this.exploreContainer.style.display = 'flex';
    this.exploreContainer.classList.add('active');
    document.body.classList.add('explore-open');
    this.isActive = true;
    
    // Animation
    setTimeout(() => {
      this.exploreContainer.querySelector('.explore-content').classList.add('show');
    }, 10);
  }
  
  close() {
    const content = this.exploreContainer.querySelector('.explore-content');
    content.classList.remove('show');
    this.exploreContainer.classList.remove('active');
    
    // Animation before closing
    setTimeout(() => {
      this.exploreContainer.style.display = 'none';
      document.body.classList.remove('explore-open');
      this.isActive = false;
    }, 300);
  }
  
  goToPanel(index) {
    if (index < 0 || index >= this.totalPanels) return;
    
    // Update currentPanel
    this.currentPanel = index;
    
    // Update panels with delay for smoother transition
    const panels = this.exploreContainer.querySelectorAll('.explore-panel');
    
    // First remove active class from all panels
    panels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    // Add a slight delay before showing the new panel
    setTimeout(() => {
      panels[index].classList.add('active');
    }, 150);
    
    // Update indicators with a smooth transition
    const indicators = this.exploreContainer.querySelectorAll('.nav-indicator');
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Update navigation buttons
    const prevButton = this.exploreContainer.querySelector('.nav-prev');
    const nextButton = this.exploreContainer.querySelector('.nav-next');
    
    prevButton.disabled = index === 0;
    nextButton.disabled = index === this.totalPanels - 1;
  }
  
  goToNextPanel() {
    this.goToPanel(this.currentPanel + 1);
  }
  
  goToPrevPanel() {
    this.goToPanel(this.currentPanel - 1);
  }
}

// Initialize the explore component when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.explore = new Explore();
});