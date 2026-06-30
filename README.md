# TaskFlow — Task Management Application

A production-quality React + TypeScript task manager built with Vite, Tailwind CSS, Axios, and Framer Motion. Demonstrates clean architecture, reusable components, custom hooks, CRUD operations, API integration, validation, and local-storage persistence.

## Features

- **Task CRUD** — add, edit, delete, mark complete, and undo complete.
- **Task form** with inline validation (title, description, assignee required) and a disabled submit button until valid.
- **Task list** — responsive cards showing title, description, assignee, status badge, and created date.
- **Instant search** by title or description (debounced at 300ms).
- **Filters** — All / Pending / Completed.
- **Sorting** — Latest First / Oldest First.
- **Dark mode** toggle, persisted to local storage.
- **Task counter** — total, pending, completed (auto-updating).
- **Local storage persistence** for tasks and theme (survives reloads).
- **API integration** via a dedicated service layer (`src/services/userService.ts`) using Axios, with loading spinner, error handling, and a retry button.
- **Toast notifications** for success / error / info actions.
- **Confirmation modal** before deleting a task.
- **Skeleton loaders**, empty states, and smooth Framer Motion animations.
- **Accessible** form controls (ARIA labels, keyboard-navigable modal).

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Axios
- Framer Motion
- lucide-react (icons)

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## API

Users are fetched from [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and used to populate the assignee dropdown.

## Folder Structure

```
src/
  components/
    ui/            # reusable primitives (Button, Input, Select, Badge, Card, Modal, Spinner, Toast)
    TaskForm.tsx
    TaskCard.tsx
    TaskList.tsx
    SearchBar.tsx
    FilterBar.tsx
    ThemeToggle.tsx
    TaskCounter.tsx
    ConfirmDialog.tsx
  hooks/
    useLocalStorage.ts
    useTasks.ts
    useDebounce.ts
    useTheme.ts
  services/
    userService.ts
  utils/
    validators.ts
    constants.ts
  pages/
    Home.tsx
  App.tsx
  main.tsx
  index.css
```

## React Concepts Demonstrated

- `useState`, `useEffect`, `useMemo`, `useCallback`, custom hooks
- `React.memo` for memoized components
- Conditional rendering, list rendering with stable `key` props
- Controlled forms with validation
- Service-layer API integration with error handling
- Local-storage persistence with cross-tab sync
"# task-management-" 
