import { createContext, useContext, useReducer, useEffect } from 'react';
import { userService } from '../services/api';

const AuthContext = createContext(null);

const initialState = {
  user: JSON.parse(localStorage.getItem('hostelcare_user')) || null,
  token: localStorage.getItem('hostelcare_token') || null,
  loading: false,
  isAuthenticated: !!localStorage.getItem('hostelcare_token'),
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('hostelcare_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('hostelcare_user');
    }
    if (state.token) {
      localStorage.setItem('hostelcare_token', state.token);
    } else {
      localStorage.removeItem('hostelcare_token');
    }
  }, [state.user, state.token]);

  const login = async (identifier, password, role) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const data = await userService.login(identifier, password, role);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return data;
    } catch (err) {
      dispatch({ type: 'STOP_LOADING' });
      throw err;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates) => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
