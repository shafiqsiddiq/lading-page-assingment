

export default function useUpdatePaginationHook(state, setState) {
  const currentState = state;
  const setStateFunction = setState;

  const updatePagination = (key, value) => {
    setStateFunction({
      ...currentState,
      pagination: { ...currentState.pagination, [key]: value },
    });
  };
  return updatePagination;
}
