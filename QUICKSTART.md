# Quick Start Guide - Authentication System

## Running the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Quick Test Scenario

### Scenario 1: Create a New Account
1. Go to `http://localhost:3000/signup`
2. Fill in the form:
   ```
   Full Name: Alice Johnson
   Email: alice@example.com
   Password: SecurePass123
   Confirm Password: SecurePass123
   ✓ Accept Terms
   ```
3. Click "Create Account"
4. You'll be logged in and redirected to the dashboard

### Scenario 2: Sign In with Existing Account
1. Go to `http://localhost:3000/`
2. Enter credentials:
   ```
   Email: alice@example.com
   Password: SecurePass123
   ```
3. Click "Sign in"
4. You'll be redirected to the dashboard

### Scenario 3: Test Session Persistence
1. While logged in, press F5 to refresh the page
2. You should remain logged in (session persists)

### Scenario 4: Logout
1. Click the "Logout" button in the sidebar
2. You'll be redirected to the sign-in page

## Testing Error Cases

### Invalid Email
- Try signing in with: `invalidemail` (no @)
- Error: "Invalid email format"

### Short Password
- Try signing in with password: `123` (less than 6 chars)
- Error: "Password must be at least 6 characters"

### Mismatched Passwords (Sign-up)
- Enter different passwords in password fields
- Error: "Passwords do not match"

### Terms Not Accepted (Sign-up)
- Try submitting without checking the terms checkbox
- Error: "You must agree to the Terms and Privacy Policy"

## Key Features

✅ **Sign-Up Page**
- Full name, email, password validation
- Password confirmation
- Terms acceptance required
- Error messages for validation failures
- Loading state during account creation

✅ **Sign-In Page**
- Email and password authentication
- Form validation
- Error message display
- Loading state during login
- Social login buttons (UI only)

✅ **Dashboard Protection**
- Automatic redirect if not authenticated
- Logout button in sidebar
- User profile display
- Session persistence

✅ **Session Management**
- Persistent storage using localStorage
- Automatic session restoration on page refresh
- Secure logout functionality

## File Locations

- **Sign-In Page:** `app/page.tsx`
- **Sign-Up Page:** `app/signup/page.tsx`
- **Auth Store:** `app/store/authStore.ts`
- **Dashboard Layout:** `app/dashboard/layout.tsx`

## Documentation

- **Full Documentation:** See `AUTHENTICATION.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`

## Troubleshooting

### Issue: Not redirecting to dashboard after login
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache

### Issue: Session not persisting after refresh
- Check if localStorage is enabled in browser
- Check browser DevTools > Application > Local Storage
- Look for `auth-storage` key

### Issue: Logout button not working
- Ensure you're on the dashboard page
- Check browser console for errors
- Try refreshing the page

## Next Steps

To integrate with a real backend:

1. Update `app/store/authStore.ts`:
   - Replace mock API calls with real endpoints
   - Add JWT token handling
   - Implement proper error handling

2. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   ```

3. Update API calls in the store:
   ```typescript
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password })
   });
   ```

## Support

For issues or questions, refer to:
- `AUTHENTICATION.md` - Detailed API documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- Next.js Documentation: https://nextjs.org/docs
- Zustand Documentation: https://github.com/pmndrs/zustand
