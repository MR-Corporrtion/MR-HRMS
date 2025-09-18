import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TextField, Button, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { employeelogin, login } from '../redux/actions/authActions';
import { logo_pic } from '../assets/admin/adminicon';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(true); // Toggle state
  const [localError, setLocalError] = useState<string>(''); // Local error state

  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { user, error } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.user.role === 'sup-admin') {
        router.push('/super-admin/dashboard');
      } else if (['admin', 'sub-admin', 'parent'].includes(user.user.role)) {
        router.push('/admin/admin-dashboard');
      } else if (['manager', 'hr', 'ceo'].includes(user.user.role)) {
        router.push('/user/dashboard');
      }
    }
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Incorrect username or password',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [user, error, router]);

  const handleAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const handleEmployeeLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((!email && !username && !phoneNumber) || !password) {
      setLocalError('Email/Username/Phone number and password are mandatory!');
      return;
    }

    try {
      setLocalError('');
      await dispatch(employeelogin({ email, username, phone_number: phoneNumber, password }));
      alert('Login successful!');
    } catch (err) {
      setLocalError('Invalid login credentials. Please try again.');
    }
  };

  const toggleLoginMode = () => {
    setIsAdminLogin(!isAdminLogin);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      {/* Left Section */}
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-t from-[#ee7623] to-[#282461] text-white p-8">
        <div className="text-center">
          <div className="w-40 h-40 max-w-xs mx-auto mb-4">
            <img
              src={logo_pic.src}
              alt="Rocket Illustration"
              className="w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">Welcome to MR Plus Payroll</h1>
          <p className="text-lg mb-6">
            Manage your payroll seamlessly with a modern and user-friendly platform.
          </p>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-t from-[#ee7623] to-[#282461] text-white p-10">
        <div className="w-full max-w-md bg-opacity-70 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
          <div className="flex justify-between mb-6">
            <button
              onClick={toggleLoginMode}
              className={`py-2 px-4 rounded-lg font-bold ${
                isAdminLogin ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Admin Login
            </button>
            <button
              onClick={toggleLoginMode}
              className={`py-2 px-4 rounded-lg font-bold ${
                !isAdminLogin ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Employee Login
            </button>
          </div>

          <h2 className="text-4xl font-bold text-center mb-6">
            {isAdminLogin ? 'Admin Login' : 'Employee Login'}
          </h2>

          {/* Show local or Redux error */}
          {localError && <p className="text-red-500 text-sm mb-4">{localError}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form
            className="space-y-6"
            onSubmit={isAdminLogin ? handleAdminSubmit : handleEmployeeLogin}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{
                style: { color: '#FFFFFF', backgroundColor: '#282461' },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#FFFFFF' } }}
              InputProps={{
                style: { color: '#FFFFFF', backgroundColor: '#282461' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      style={{ color: '#FFFFFF' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className="flex justify-between items-center">
              <FormControlLabel
                control={<Checkbox className="text-[#F7F7F7]" />}
                label="Remember me"
                className="text-[#F7F7F7]"
              />
              <Link href="#">
                <span className="text-[#F7F7F7] hover:underline">Forgot password?</span>
              </Link>
            </div>

            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#B36DFF', color: '#F7F7F7' }}
              className="w-full py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-300"
            >
              {isAdminLogin ? 'Log In as Admin' : 'Log In as Employee'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
