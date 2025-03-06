# SIMO - Solana Token Validation System

SIMO is a comprehensive security and validation system for Solana tokens designed to detect potentially unsafe tokens through a multi-phase pipeline. The system combines on-chain data analysis, market metrics, and social signals to provide a holistic token safety assessment.

![SIMO Landing Page](https://placeholder-for-screenshot.com)

## Core Functionality

- 🛡️ **Token Validation Pipeline**: Three-phase validation process (Safety, Market, Security)
- 🚫 **Advanced Detection Mechanisms**: Bundle analysis, insider trading detection, transfer pattern analysis
- 💼 **Market Analysis Tools**: Integration with Jupiter and DEX Screener for market metrics
- 🌐 **Social Media Validation**: Analysis of social metrics correlated with on-chain activities

## Technical Architecture

### Infrastructure
- WebSocket Monitoring with Syndica and Helius APIs
- Rate-Limited API Integration
- SQLite Database for historical data
- Real-time Web Dashboard with interactive visualization

### Performance Features
- Configurable retry mechanisms
- Caching to reduce redundant API calls
- Background workers for asynchronous processing

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LovroPodobnik/simo-lander.git
cd simo-lander
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
simo-lander/
├── src/                        # Source code
│   ├── index.html              # Main HTML file
│   ├── components/             # UI components
│   │   ├── waitlist-form.js    # Waitlist form modal
│   │   └── explore.js          # Feature exploration panels
│   ├── styles/                 # CSS styles
│   │   └── main.css            # Main stylesheet
│   ├── utils/                  # Utility functions
│   │   └── canvas.js           # Three.js canvas visualization
│   └── assets/                 # Static assets
│       └── favicon.svg         # Site favicon
├── public/                     # Public assets
├── dist/                       # Production build
├── package.json                # Project configuration
├── .gitignore                  # Git ignore file
├── README.md                   # Project documentation
└── start.sh                    # Startup script
```

## Development

- `npm start` - Start the development server
- `npm run build` - Create a production build

## Technologies Used

- TypeScript and Node.js
- Three.js for 3D visualization
- TailwindCSS for dashboard UI
- External API integrations (Helius, Syndica, Jupiter, DEX Screener)
- WebSocket support for real-time updates
- Modern CSS with variables
- Responsive design
- Optimized for performance

## Business Purpose

SIMO helps:
- Traders identify potential scam tokens before investing
- Projects demonstrate their legitimacy through objective validation
- Platforms verify the safety of tokens they support

The system addresses common vulnerabilities in the Solana token ecosystem, including rug pulls, artificial price manipulation, and fraudulent project structures.

## License

This project is licensed under the MIT License - see the LICENSE file for details.