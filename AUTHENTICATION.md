# Authentication System Documentation

## Overview
The TaskMaster application now has a fully functional authentication system with sign-in and sign-up pages. The system uses Zustand for state management with persistent storage.

## Features

### Sign-In Page (`/`)
- Email and password authentication
- Form validation
- Error handling and display
- Loading state during authentication
- Redirect to dashboard on successful login
- Link to sign-up page for new users
- Social login buttons (UI only, not functional)

### Sign-Up Page (`/signup`)
- Full name, email, and password fields
- Password confirmation validation
- Terms and conditions checkbox
- Form validation with error messages
- Loading state during account creation
- Redirect to dashboard on successful signup
- Link back to sign-in page

### Dashboard Protection
- Automatic redirect to sign-in if not authenticated
- Logout button in sidebar
- User profile display with email
- Session persistence using localStorage

## Authentication Store (`app/store/authStore.ts`)

### State
- `user`: Current authenticated user object
- `isAuthenticated`: Boolean flag for auth status
- `isLoading`: Loading state during auth operations
- `error`: Error message from auth operations

### Methods

#### `login(email: string, password: string)`
Authenticates a user with email and password.

**Validation:**
- Email and password are required
- Email must contain '@'
- Password must be at least 6 characters

**Returns:** Promise that resolves on success or rejects with error

#### `signup(fullName: string, email: string, password: string)`
Creates a new user account.

**Validation:**
- All fields are required
- Email must contain '@'
- Password must be at least 6 characters
- Full name must be at least 2 characters

**Returns:** Promise that resolves on success or rejects with error

#### `logout()`
Clears user session and redirects to sign-in page.

#### `clearError()`
Clears any error messages from the store.

## Data Persistence

The authentication state is persisted to localStorage using Zustand's persist middleware. This means:
- User sessions survive page refreshes
- Users remain logged in until they explicitly logout
- Storage key: `auth-storage`

## Usage Examples

### Sign In
```typescript
const { login } = useAuthStore();

try {
  await login('user@example.com', 'password123');
  // User is now authenticated
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### Sign Up
```typescript
const { signup } = useAuthStore();

try {
  await signup('John Doe', 'john@example.com', 'password123');
  // Account created and user is authenticated
} catch (error) {
  console.error('Signup failed:', error.message);
}
```

### Logout
```typescript
const { logout } = useAuthStore();
logout(); // User is logged out and redirected to sign-in
```

### Check Authentication Status
```typescript
const { isAuthenticated, user } = useAuthStore();

if (isAuthenticated) {
  console.log('User:', user.fullName, user.email);
}
```

## File Structure

```
app/
├── page.tsx                 # Sign-in page
├── signup/
│   └── page.tsx            # Sign-up page
├── dashboard/
│   ├── layout.tsx          # Dashboard layout with logout button
│   └── page.tsx            # Dashboard home
└── store/
    └── authStore.ts        # Authentication store
```

## Testing the Authentication

1. **Sign Up:**
   - Navigate to `/signup`
   - Fill in the form with valid data
   - Accept terms and conditions
   - Click "Create Account"
   - You should be redirected to the dashboard

2. **Sign In:**
   - Navigate to `/`
   - Enter the email and password from signup
   - Click "Sign in"
   - You should be redirected to the dashboard

3. **Logout:**
   - Click the "Logout" button in the sidebar
   - You should be redirected to the sign-in page

4. **Session Persistence:**
   - Sign in to the application
   - Refresh the page
   - You should remain logged in

## Error Handling

The system provides clear error messages for:
- Missing required fields
- Invalid email format
- Password too short
- Passwords don't match
- Terms not accepted

## Future Enhancements

- Integration with real backend API
- OAuth/Social login implementation
- Email verification
- Password reset functionality
- Two-factor authentication
- Remember me functionality
- Rate limiting for login attempts
