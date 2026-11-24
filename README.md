# Responsive To-Do App

A responsive to-do app with priorities, due dates, search, progress tracking and a dark mode, built step by step with React, Redux Toolkit and Tailwind CSS.

## 🔗 Live link

**[https://YOUR-LIVE-LINK-HERE]**

## 📸 Screenshots

| Desktop (light) | Desktop (dark) |
| --- | --- |
| ![Desktop light](screenshots/desktop-light.png) | ![Desktop dark](screenshots/desktop-dark.png) |

| Mobile |
| --- |
| <img src="screenshots/mobile-light.png" alt="Mobile" width="320" /> |

## ✨ Features

- Add a todo with a **priority** (High / Medium / Low) and an optional **due date**
- **Validation** with clear error messages: task can't be empty, minimum 3 characters, no duplicate tasks, due date can't be in the past
- Tick a todo as done (strikethrough), **delete** it, **edit** the text by double-clicking, or open its **details page** to edit everything
- **All / Active / Completed** pages, each with its own URL (`/`, `/active`, `/completed`)
- **Search** todos and **sort by due date**
- **Overdue** todos show the date in red
- **Progress bar** and "tasks left" counter
- **Clear completed** removes all finished todos
- **/stats** page: total, completed, pending, % done and count by priority
- **Light / dark theme**, saved in the browser so it stays after a refresh
- Loading, error and empty states on every screen
- Fully responsive: full-screen layout on desktop, card layout on mobile
- Custom **404 page**

## 🛠️ Tech stack

- **React** (Vite)
- **Redux Toolkit** + React Redux (`createSlice`, `createAsyncThunk`, selectors)
- **React Router** (`NavLink`, `useParams`, `useNavigate`)
- **Tailwind CSS** (responsive breakpoints and `dark:` classes)
- **TypeScript** – practice mini app in [`ts-react-practice/`](ts-react-practice) (typed props, hooks, events and a typed Redux Toolkit counter)
- **API:** [json-server](https://github.com/typicode/json-server) – a local REST API (`http://localhost:3001/todos`) that saves the todos in `db.json`
  - The TypeScript practice app loads users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)

## 🚀 How to run locally

You need [Node.js](https://nodejs.org/) installed.

```bash
# 1. get the code
git clone https://github.com/Poojashri7124/Responsive-To-Do-App.git
cd Responsive-To-Do-App

# 2. install the packages
npm install
```

The app saves its data with json-server, so you need **two terminals**:

```bash
# Terminal 1 - the API (keep it running)
npx json-server db.json --port 3001

# Terminal 2 - the React app
npm run dev
```

Open the address that `npm run dev` prints (usually http://localhost:5173).

`db.json` is the database. It starts empty:

```json
{ "todos": [] }
```

> If json-server is not running, the app shows the message "Could not load todos. Is json-server running on port 3001?"

### TypeScript practice app

```bash
cd ts-react-practice
npm install
npm run dev
```

## 📂 Project structure

```
src/
  api.js                 all API calls (fetch)
  store/store.js         Redux store
  features/todos/        todosSlice: thunks, reducers, selectors
  context/               ThemeContext (light / dark)
  hooks/                 useLocalStorage, useTodo
  utils/                 validateTodo, date helpers, priority colours
  components/            Header, FilterTabs, Progress, TaskForm, TaskList, ...
  pages/                 TodoPage, Stats, TodoDetail, NotFound
ts-react-practice/       React + TypeScript mini app
db.json                  json-server database
```

## 📚 What I learned in each phase

- **Phase 1 – Static UI:** Built the layout with React components and props, and made it responsive with Flexbox, Grid and media queries.
- **Phase 2 – State and events:** Used `useState` to add, toggle, delete, filter and search todos, and learned never to mutate state and to calculate filtered lists while rendering.
- **Phase 3 – API with json-server:** Used `fetch` with `async/await` inside `useEffect`, handled loading, error and empty states, and updated the screen only after the server answered.
- **Phase 4 – React Router:** Split the app into pages with their own URLs, used `NavLink`, `useParams` and `useNavigate`, filtered by URL, and added a detail page and a 404 page.
- **Phase 5 – Context and custom hooks:** Removed prop drilling with Context and `useReducer`, and wrote custom hooks like `useLocalStorage` for the saved dark mode.
- **Phase 6 – Validation and Tailwind:** Built form validation (controlled inputs, errors in state, `onBlur`, trimmed values) and converted all CSS to Tailwind with mobile-first breakpoints and `dark:` classes.
- **Phase 7 – Redux Toolkit:** Moved the todos into a Redux store with `createSlice`, `createAsyncThunk` and `createSelector`, and checked every action in Redux DevTools.
- **TypeScript practice:** Typed component props, `useState<T>`, form events and a Redux Toolkit slice with `PayloadAction`, `RootState`, `AppDispatch` and typed hooks.