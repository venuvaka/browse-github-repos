import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RepoListType } from '../types'

// Define a type for the slice state
interface RootReducerState {
  repoList: RepoListType[];
  expandedIds: Array<string | number>;
  pageCount: number;
}

// Define the initial state using that type
const initialState: RootReducerState = {
  repoList: [],
  expandedIds: 
    sessionStorage.getItem('expandedIds') 
        ? JSON.parse(sessionStorage.getItem('expandedIds') as string) 
        : [],
  pageCount: 1,
}

export const rootReducer = createSlice({
  name: 'gitRepos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.pageCount += 1
    },
    decrement: (state) => {
      state.pageCount -= 1
    },
    updateRepoList: (state, action: PayloadAction<RepoListType[]>) => {
        state.repoList = action.payload
    },
    updateExpandedIds: (state, action: PayloadAction<string | number>) => {
        const index = state.expandedIds.indexOf(action.payload);
        if(index > -1) {
            const updatedIds = [...state.expandedIds];
            updatedIds.splice(index, 1); // removes the id if already exists
            state.expandedIds = updatedIds;
        } else {
            state.expandedIds = [...state.expandedIds, action.payload]
        }
        // stores the expandedIds in browser storage
        sessionStorage.setItem('expandedIds', JSON.stringify(state.expandedIds ))
    },
  },
})

export const { increment, decrement, updateRepoList, updateExpandedIds } = rootReducer.actions

export default rootReducer.reducer