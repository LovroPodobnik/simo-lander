/**
 * Interactive Canvas Background
 * 
 * A shader-based WebGL background with Half-Life inspired visual effects
 * for the landing page.
 */

class CryptoCanvas {
  constructor() {
    // Initialize core properties
    this.canvas = document.getElementById('crypto-canvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.clock = new THREE.Clock();
    
    // Mouse tracking variables
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    
    // Initialize uniforms for shader
    this.uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_texture: { value: new THREE.TextureLoader().load('https://replicate.delivery/xezq/fp7qHpcblMwkZSgG1PEArsfPFVeYXWWPNEHPTrsNleGnFxXRB/tmpfvb573dw.webp') }
    };
    
    // Initialize the canvas
    this.init();
  }
  
  init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create shader material
    this.createShaderMaterial();
    
    // Create plane
    this.createPlane();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Start animation loop
    this.animate();
    
    // Start counter updates
    this.setupCounters();
  }
  
  createShaderMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform sampler2D u_texture;
        
        varying vec2 vUv;
        
        // Random function for noise
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        // Function to create scanlines
        float scanline(vec2 uv, float lines) {
            return sin(uv.y * lines * 3.14159);
        }
        
        void main() {
            // Calculate pixel coordinates
            vec2 uv = vUv;
            
            // Normalized mouse position
            vec2 mouse = u_mouse / u_resolution;
            
            // Calculate distance from mouse
            float dist = distance(uv, mouse);
            
            // Create Half-Life inspired distortion pulse
            float strength = 0.03 / (dist + 0.5);
            vec2 dir = normalize(uv - mouse);
            
            // Apply distortion
            vec2 offset = dir * strength * sin(u_time * 2.0 + dist * 10.0) * 0.01;
            
            // Apply wave effect
            float wave = sin(dist * 30.0 - u_time * 2.0) * 0.01;
            offset += dir * wave;
            
            // Create scan effect (Half-Life inspired)
            float scan = 0.5 + 0.5 * scanline(uv, 200.0);
            
            // Sample the texture with the offset
            vec4 texColor = texture2D(u_texture, uv + offset);
            
            // Darken the image
            texColor.rgb *= 0.4 + 0.2 * sin(u_time + uv.x * 10.0);
            
            // Add scan effect
            texColor.rgb *= 0.8 + 0.2 * scan;
            
            // Add a subtle glow where the mouse is (Half-Life green/orange inspired)
            float glow = 0.05 / (dist + 0.05);
            vec3 glowColor = mix(
                vec3(0.0, 0.7, 0.2), // Half-Life green
                vec3(0.8, 0.4, 0.0), // Half-Life amber
                sin(u_time * 0.5) * 0.5 + 0.5
            ) * glow * 0.4;
            
            // Apply vignette
            float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.5);
            texColor.rgb *= vignette;
            
            // Apply grain effect
            float grain = random(uv * u_time * 0.1) * 0.1 - 0.05;
            
            // Half-Life pulse effect
            float pulse = 0.05 * sin(u_time * 2.0);
            float edgePulse = smoothstep(0.4, 0.5, abs(vignette - 0.5)) * pulse;
            
            // Final color with Half-Life inspired green/amber tint
            vec3 finalColor = texColor.rgb + glowColor + grain;
            finalColor += vec3(0.0, 0.04, 0.02) * edgePulse; // Subtle green pulse at edges
            
            // Add scan lines
            finalColor *= 0.95 + 0.05 * sin(uv.y * 200.0);
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
  
  createPlane() {
    // Create a plane that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(mesh);
  }
  
  setupEventListeners() {
    // Track mouse movement
    document.addEventListener('mousemove', (event) => {
      this.targetMouseX = event.clientX;
      this.targetMouseY = event.clientY;
    });
    
    // Track touch movement
    document.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        this.targetMouseX = event.touches[0].clientX;
        this.targetMouseY = event.touches[0].clientY;
        event.preventDefault();
      }
    }, { passive: false });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.uniforms.u_resolution.value.x = window.innerWidth;
      this.uniforms.u_resolution.value.y = window.innerHeight;
    });
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Smooth mouse movement
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    
    // Update uniforms
    this.uniforms.u_time.value += 0.01;
    this.uniforms.u_mouse.value.x = this.mouseX;
    this.uniforms.u_mouse.value.y = window.innerHeight - this.mouseY; // Flip Y for WebGL
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }
  
  setupCounters() {
    // Update TPS and Block counters
    function updateCounters() {
      const tpsElement = document.getElementById('tps-counter');
      const blockElement = document.getElementById('block-counter');
      
      if (tpsElement && blockElement) {
        // Randomize TPS between 3800-4500
        const tps = Math.floor(3800 + Math.random() * 700);
        tpsElement.textContent = tps.toLocaleString();
        
        // Increment block height
        const currentBlock = parseInt(blockElement.textContent.replace(/,/g, ''));
        blockElement.textContent = (currentBlock + 1).toLocaleString();
      }
    }
    
    setInterval(updateCounters, 2000);
  }
}

// Initialize the canvas when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CryptoCanvas();
});