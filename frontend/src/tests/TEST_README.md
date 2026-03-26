# Test Suite

Vitest + React Testing Library tests covering utils, hooks, and components.

## Structure

```
test/
├── setup.ts                          # Global test setup (jest-dom, crypto polyfill)
├── utils/
│   ├── signUpValidators.test.ts      # All sign-up validation helpers
│   └── validateRecipePayload.test.ts # Recipe form validation
├── hooks/
│   ├── useAdminFilter.test.ts        # Admin list search + filter hook
│   ├── useRecipeFilter.test.ts       # Recipe list multi-filter hook
│   └── useEditProfileForm.test.ts    # Profile edit form state hook
└── components/
    ├── Notification.test.tsx         # NotificationContainer rendering & auto-dismiss
    └── Filters.test.ts               # DEFAULT_FILTERS shape
vitest.config.ts                      # Vitest + coverage config
```

## Install dependencies

```bash
npm install -D vitest @vitest/coverage-v8 \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom \
  @vitejs/plugin-react
```

## Run tests

```bash
# Run all tests once
npx vitest run

# Watch mode
npx vitest

# With coverage report
npx vitest run --coverage
```

## Add to package.json

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## What is tested

| File | Coverage focus |
|---|---|
| `signUpValidators.ts` | `isNonEmpty`, `isEmail`, `isMinLength`, `isValidIsoDate`, `isStrongPassword`, `getPasswordIssues`, `validateUserDetails`, `validateUserAttributes`, `validateUserGoals` |
| `validateRecipePayload.ts` | Every required field, invalid ingredient, image requirement flag |
| `useAdminFilter.ts` | Initial state, search (case-insensitive), filter toggling, combined search+filter, empty data |
| `useRecipeFilter.ts` | Search, tag filters (vegan/vegetarian/community), category, calorie range, time ranges, portions, reset, combined filters |
| `useEditProfileForm.ts` | Initial state from user, `set` for all field types, `reset` back to defaults |
| `Notification.tsx` | Renders messages, all four types, dismiss button, auto-dismiss timer, default 4 s duration |
| `Filters.ts` | Shape of `DEFAULT_FILTERS` |
