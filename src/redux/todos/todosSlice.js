import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getTodosList,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../../api/api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', getTodosList);

export const addTodo = createAsyncThunk('todos/addTodo', createTodo);

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  await deleteTodo(id);
  return id;
});

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async ({ id, payload }) => {
    const updated = await updateTodo(id, payload);
    return updated;
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не вдалося завантажити todos';
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не вдалося додати todo';
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не вдалося видалити todo';
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не вдалося оновити todo';
      });
  },
});

export default todosSlice.reducer;
