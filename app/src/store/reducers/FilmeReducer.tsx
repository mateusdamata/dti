const FilmeReducer = (state, action) => {
	state = state || null
	if (action.type === 'TOGGLE_FILME') {
		return { ...state, filme: action.filme}
	}

	return state
}

export default FilmeReducer