# 🎵 Song Manager

A modern, full-stack React application for managing your music collection with advanced features like search, filtering, pagination, and performance optimizations.

---

## ✨ Features

### 🎯 Core Features
- **CRUD Operations**: Create, Read, Update, Delete songs
- **Advanced Search**: Search by title, artist, album, or year
- **Smart Filtering**: Filter by year range and sort by multiple criteria
- **Pagination**: Efficient handling of large song collections
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🚀 Performance Features
- **Code Splitting**: Automatic bundle splitting for faster loading
- **Lazy Loading**: Pages load only when needed
- **Virtual Scrolling**: Smooth performance with thousands of songs
- **React.memo**: Optimized re-rendering
- **Webpack Optimizations**: Vendor and common chunk splitting

### 🎨 UI/UX Features
- **Modern Design**: Clean, intuitive interface with Emotion styling
- **Loading States**: Smooth loading spinners and transitions
- **Error Handling**: Graceful error states and user feedback
- **Performance Monitor**: Real-time performance metrics (dev mode)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with simplified Redux
- **Redux-Saga** - Side effects and async operations
- **React Router** - Client-side routing and navigation
- **Emotion** - CSS-in-JS styling with theming
- **Webpack 5** - Custom build configuration with optimizations

### Development Tools
- **Babel** - Modern JavaScript compilation
- **Jest** - Unit and component testing
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting and formatting

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd song-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🚀 Available Scripts

| Script                | Description                                 |
|-----------------------|---------------------------------------------|
| `npm start`           | Start development server with hot reload     |
| `npm run build`       | Build production bundle with optimizations   |
| `npm run build:analyze` | Build with bundle analysis                |
| `npm test`            | Run test suite                              |
| `npm run test:watch`  | Run tests in watch mode                     |

---

## 📁 Project Structure

```
song-manager/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── store/               # Redux store configuration
│   ├── sagas/               # Redux-Saga side effects
│   ├── styles/              # Global styles and theming
│   ├── utils/               # Utility functions
│   ├── App.js               # Main app component with routing
│   └── index.js             # Application entry point
├── dist/                    # Production build output
├── webpack.config.cjs       # Webpack configuration
├── .babelrc                 # Babel configuration
├── jest.config.cjs          # Jest testing configuration
└── package.json             # Project dependencies and scripts
```

---

## 🎯 Key Concepts Explained

### React Hooks
- **useState**: Local component state management
- **useEffect**: Side effects and lifecycle management
- **useMemo**: Performance optimization for expensive calculations
- **useDispatch/useSelector**: Redux integration

### Redux Toolkit
- **createSlice**: Simplified Redux boilerplate
- **createAsyncThunk**: Async action creators
- **configureStore**: Enhanced store configuration

### Redux-Saga
- **takeEvery**: Handle async actions
- **call**: API calls and side effects
- **put**: Dispatch actions
- **select**: Access state

### Performance Optimizations
- **React.memo**: Prevent unnecessary re-renders
- **Lazy Loading**: Load components on demand
- **Code Splitting**: Split bundles for faster loading
- **Virtual Scrolling**: Render only visible items

---

## 🔧 Configuration

### Webpack Manual Configuration

- **No Create React App:** The project was set up from scratch without CRA, using a custom `webpack.config.cjs`.
- **Custom Rules:**  
  - JavaScript/JSX handled by Babel (`babel-loader`).
  - Images and fonts handled by Webpack’s `asset/resource` type.
- **Environment Variables:**  
  - Uses `dotenv-webpack` to inject variables like `API_BASE_URL` from `.env`.
- **Why Manual:**  
  - Manual setup demonstrates understanding of build tools, allows for custom optimizations, and meets assignment requirements.
- **Code Splitting:**  
  - Uses `optimization.splitChunks` for vendor/common chunk splitting and lazy loading for React pages.

### Environment Variables

Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://jsonplaceholder.typicode.com
NODE_ENV=development
```
---

## 📡 API Endpoints (Development)

The app uses MirageJS and static data to simulate a backend. The following endpoints are available in development:

- `GET /api/songs` — List all songs
- `POST /api/songs` — Add a new song
- `PUT /api/songs/:id` — Update a song
- `DELETE /api/songs/:id` — Delete a song

**Note:**  
In production, you can point `API_BASE_URL` to a real backend or JSONPlaceholder.

---

Absolutely! Here’s a more **specific and transparent statement** for the “Which parts (if any) were generated with AI” requirement, tailored to your project:

---

## 🤖 AI Usage & Code Verification

- **AI-Assisted Sections:**  
  - Initial project folder structure and setup instructions  
  - Webpack and Babel configuration (e.g., `webpack.config.cjs`, `.babelrc`)  
  - Redux Toolkit and Redux-Saga boilerplate (e.g., `store.js`, `songsSlice.js`, `sagas/`)  
  - Some React component scaffolding (e.g., `App.js`, routing, and lazy loading setup)  
  - Troubleshooting solutions for build, deployment, and routing issues  
  - Documentation templates and explanations in this README

- **Manual Work:**  
  - All business logic, UI design, and feature implementation were written, reviewed, and tested by me.
  - All code was understood and adapted to fit the project requirements.

- **Verification steps:**  
  - Run the app locally and checked all features.
  - Used Jest and React Testing Library for unit/component tests.
  - Manually tested UI for CRUD, filtering, and performance features.

---

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure
- **Unit Tests**: Redux slices and utility functions
- **Component Tests**: React components with React Testing Library
- **Integration Tests**: Component interactions

---

## 📊 Performance Metrics

### Bundle Analysis
The production build includes:
- **Main Bundle**: ~10.2 KiB (app logic)
- **Vendor Bundle**: ~270 KiB (React, Redux, etc.)
- **Common Bundle**: ~2.7 KiB (shared code)
- **Lazy Chunks**: 1.9-7.8 KiB each (pages)

### Performance Monitor
In development mode, a performance monitor shows:
- Render time
- Memory usage
- Bundle size estimates

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
1. **Netlify**: Drag and drop the `dist` folder
2. **Vercel**: Connect your GitHub repository
3. **GitHub Pages**: Use the `gh-pages` package
4. **AWS S3**: Upload the `dist` folder to S3

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy coding! 🎵✨**

