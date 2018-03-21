import axios from "axios"

const state = {
	temp_name:'',
	temp_email:'',
	temp_pwd:''
	
}
const mutations = {
	updateData(state,payload){
		switch(payload.name){
			case 'email':
				state.temp_email = payload.value;
				break;
			case 'pwd':
				state.temp_pwd   = payload.value;
				break;	
		}
	}
}

const actions ={
	login({commit},payload){
		// console.log(payload)
		return new Promise((resolve,reject)=>{

			axios.post('/test/WX/index.php/qibao/index/test',{
				email:payload.email,
				pwd:payload.pwd
			}).then(res=>{
				
				const data = res.data
				console.log(data)
			}).catch(error=>{
				console.log(error)
			})

		})
	}
}


export default {
	state,
	mutations,
	actions,
}