# DevKey Vault 🔐

A secure, developer-focused API key management dashboard for storing, organizing, and managing your API keys across multiple services.

## Features

- **Secure Storage** - Safely store and encrypt your API keys
- **Dashboard Interface** - Clean, intuitive React-based UI for managing keys
- **Real-time Traffic Monitoring** - Track API usage and traffic in real-time
- **Service Organization** - Categorize keys by service/project
- **Quick Copy** - One-click copy functionality for easy access
- **Supabase Backend** - Reliable and scalable database storage

## Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React (Vite) | Supabase | PostgreSQL |
| JavaScript/JSX | Node.js | - |
| CSS | REST API | - |

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
git clone https://github.com/Lxnson7/dev_vault.git
cd dev_vault


2. Install dependencies

3. Set up environment variables
cp .env.example .env

Add your Supabase credentials:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key


4. Start the development server


## Usage

1. Sign up or log in to your account
2. Add a new API key by clicking the "Add Key" button
3. Enter the service name, API key, and optional notes
4. Access your keys from the dashboard anytime

## Project Structure

```
dev_vault/
├── src/
│ ├── components/ # React components
│ ├── pages/ # Page components
│ ├── services/ # API services
│ ├── utils/ # Utility functions
│ └── App.jsx # Main app component
├── public/ # Static assets
└── package.json
```


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

Lxnson7
check
