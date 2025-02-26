# ClinicApp Development Guidelines

## Commands
- Backend server: `cd backend && npm start`
- Frontend development: `cd frontend && npm start`
- Build frontend: `cd frontend && npm run build`
- Tests: `cd frontend && npm test`
- Run specific test: `cd frontend && npm test -- --testNamePattern="test name"`

## Code Style
- **Formatting:** Indent with 2 spaces
- **Naming:** camelCase for variables/functions, PascalCase for React components/classes
- **Imports:** Group imports (React, third-party libs, local components, styles)
- **Error handling:** Always use try/catch for async operations with specific error messages
- **Modules:** Export at end of file using module.exports (backend) or export default (frontend components)
- **Comments:** Document complex functions and provide section organization using comment blocks
- **State management:** Use React hooks (useState, useEffect) for component state
- **Backend controllers:** Follow pattern with try/catch blocks and standard response formats
- **API responses:** Maintain consistent formats (message property for errors, HTTP status codes)
- **Models:** Define proper data validation in class methods