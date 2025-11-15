import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
})

export const workoutAPI = {
  getWorkouts: () => api.get('/workouts'),
  createWorkout: (data: any) => api.post('/workouts', data),
  updateWorkout: (id: string, data: any) => api.put(`/workouts/${id}`, data),
  deleteWorkout: (id: string) => api.delete(`/workouts/${id}`),
}

export const progressAPI = {
  getProgress: () => api.get('/progress'),
  createProgress: (data: any) => api.post('/progress', data),
  getProgressChart: () => api.get('/progress/chart'),
}

export const equipmentAPI = {
  getEquipment: () => api.get('/equipment'),
  createEquipment: (data: any) => api.post('/equipment', data),
  deleteEquipment: (id: string) => api.delete(`/equipment/${id}`),
}

export const quotesAPI = {
  getRandomQuote: () => api.get('/quotes/random'),
  getAllQuotes: () => api.get('/quotes'),
  createQuote: (data: any) => api.post('/quotes', data),
}

export default api
