import React from 'react';
import {
	connect
} from 'dva';
import ViewIndex from './ViewIndex';

function View({
	dispatch,
	loading,
	data: list,
	arr2,
	code
}) {

	return ( < div >	

		< ViewIndex dispatch = {dispatch} list={list} arr={arr2}/> < /div >
	)

}



function mapStateToProps(state) {
	const {
		data,
		arr2,
		code
	} = state.system;

	return {
		loading: state.loading.models.system,
		data,
		arr2,
		code
	};
}

export default connect(mapStateToProps)(View);