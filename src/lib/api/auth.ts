import axios from 'axios';

// Логин пользователя
export async function login(email: string, password: string) {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data; // Возвращает данные пользователя и токен
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
}

// Получение текущего пользователя
export async function getCurrentUser() {
  try {
    const response = await axios.get('/api/auth/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Добавление токена в заголовок
      },
    });
    return response.data; // Возвращает данные текущего пользователя
  } catch (error: any) {
    console.error('Error fetching current user:', error);
    throw new Error(error.response?.data?.message || 'Failed to get current user');
  }
}


//Регистрация
export async function register(email: string, password: string, name?: string) {
  try {
    const response = await axios.post('/api/auth/register', { email, password, name });
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
}

// Выход пользователя
export async function logout() {
  try {
    await axios.post('/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Добавление токена в заголовок
      },
    });
    localStorage.removeItem('token'); // Очистка токена после выхода
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.response?.data?.message || 'Failed to logout');
  }
}
