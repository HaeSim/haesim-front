import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { AppBackdropSlice } from './createAppBackdropSlice';
import createAppBackdropSlice from './createAppBackdropSlice';
import type { AppModalSlice } from './createAppModalSlice';
import createAppModalSlice from './createAppModalSlice';

export type MyState = AppModalSlice & AppBackdropSlice;

const useClientStore = create<MyState>()(
  devtools((...a) => ({
    ...createAppBackdropSlice(...a),
    ...createAppModalSlice(...a),
  }))
);

export default useClientStore;
