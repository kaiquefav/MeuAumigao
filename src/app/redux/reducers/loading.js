import * as Loading from '../actions/loading';

export default (
  state = false,
  action,
) => {
  switch (action.type) {
    case Loading.ACTION_LOADING_START:
      return true;
    case Loading.ACTION_LOADING_END:
      return false;
    default:
      return state;
  }
};

export function getLoading(state) {
  return state.loading;
}
