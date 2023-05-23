import { produce } from 'immer';
import { createStore, useStore } from 'zustand';
import { initialOption, initialOptionItem, initialProduct } from './constants';
import { Product, ProductStatus } from './types';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export type StateProduct = {
  product: Product;
  setProduct: (value: Product) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setSlug: (value: string) => void;
  setPrice: (value: number) => void;
  setCompareAtPrice: (value: number) => void;
  setStatus: (value: ProductStatus) => void;
  options: {
    addOption: () => void;
    addOptionValue: (id: string) => void;
    setOptionName: (id: string, value: string) => void;
    removeOption: (id: string) => void;
    handleDragEnd: (event: DragEndEvent) => void;
    values: {
      setLabel: (optionId: string, valueId: string, value: string) => void;
      setValue: (optionId: string, valueId: string, value: string) => void;
      removeValue: (optionId: string, valueId: string) => void;
      handleDragEnd: (optionId: string, event: DragEndEvent) => void;
    };
  };
};

export type ProductStore = ReturnType<typeof createProductStore>;
export const createProductStore = (product: Product) => {
  return createStore<StateProduct>((set) => ({
    product: product,
    setProduct: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product = value;
        }),
      ),
    setTitle: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product.title = value;
        }),
      ),
    setDescription: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product.description = value;
        }),
      ),
    setSlug: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product.slug = value;
        }),
      ),
    setPrice: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product.price = value;
        }),
      ),
    setCompareAtPrice: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product.compareAtPrice = value;
        }),
      ),
    setStatus: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.product.status = value;
        }),
      ),
    options: {
      addOption: () =>
        set((state) =>
          produce(state, (draft) => {
            draft.product.options.push(initialOption());
          }),
        ),
      addOptionValue: (id) =>
        set((state) =>
          produce(state, (draft) => {
            const idx = draft.product.options.findIndex((option) => option.id === id);
            if (idx >= 0) {
              draft.product.options[idx].values.push(initialOptionItem());
            }
          }),
        ),
      setOptionName: (id, value) =>
        set((state) =>
          produce(state, (draft) => {
            const idx = draft.product.options.findIndex((option) => option.id === id);
            if (idx >= 0) {
              draft.product.options[idx].name = value;
            }
          }),
        ),
      removeOption: (optionId) =>
        set((state) =>
          produce(state, (draft) => {
            const index = draft.product.options.findIndex((option) => option.id === optionId);
            if (index >= 0) draft.product.options.splice(index, 1);
          }),
        ),
      handleDragEnd: ({ over, active }) =>
        set((state) => {
          if (over && active.id !== over.id) {
            const options = state.product.options;

            const oldIndex = options.findIndex((x) => x.id === active.id);
            const newIndex = options.findIndex((x) => x.id === over.id);
            const newOptions = arrayMove(options, oldIndex, newIndex);
            return produce(state, (draft) => {
              draft.product.options = newOptions;
            });
          }
          return state;
        }),
      values: {
        setLabel: (optionId, valueId, value) =>
          set((state) =>
            produce(state, (draft) => {
              const index = draft.product.options.findIndex((option) => option.id === optionId);
              if (index >= 0) {
                const idx = draft.product.options[index].values.findIndex(({ id }) => id === valueId);
                if (idx >= 0) draft.product.options[index].values[idx].label = value;
              }
            }),
          ),
        setValue: (optionId, valueId, value) =>
          set((state) =>
            produce(state, (draft) => {
              const index = draft.product.options.findIndex((option) => option.id === optionId);
              if (index >= 0) {
                const idx = draft.product.options[index].values.findIndex(({ id }) => id === valueId);
                if (idx >= 0) draft.product.options[index].values[idx].value = value;
              }
            }),
          ),
        removeValue: (optionId, valueId) =>
          set((state) =>
            produce(state, (draft) => {
              const index = draft.product.options.findIndex((option) => option.id === optionId);
              if (index >= 0) {
                const idx = draft.product.options[index].values.findIndex(({ id }) => id === valueId);
                if (idx >= 0) draft.product.options[index].values.splice(idx, 1);
              }
            }),
          ),
        handleDragEnd: (optionId, { over, active }) =>
          set((state) => {
            if (over && active.id !== over.id) {
              const index = state.product.options.findIndex((option) => option.id === optionId);
              if (index < 0) return state;
              const option = state.product.options[index];

              const oldIndex = option.values.findIndex((x) => x.id === active.id);
              const newIndex = option.values.findIndex((x) => x.id === over.id);
              const values = arrayMove(option.values, oldIndex, newIndex);
              return produce(state, (draft) => {
                draft.product.options[index].values = values;
              });
            }
            return state;
          }),
      },
    },
  }));
};

export const productStore = createProductStore(initialProduct);
export function useProductStore<T>(selector: (state: StateProduct) => T) {
  return useStore(productStore, selector);
}
