import instance from './baseAxios'
// const BASEURL = 'http://app.xesv5.com/terraserver'
let mock = false
const BASEURL =mock ? 'http://127.0.0.1:7001' : 'http://app.xesv5.com/terraserver'
export function saveComponentsMessage(params){
	return instance.post(`${BASEURL}/components/add`, params)
}
export function getComDetail(params) {
	return instance.get(`${BASEURL}/components/getComDetail`, {params})
}
