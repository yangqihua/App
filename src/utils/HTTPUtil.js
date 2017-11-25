/**
 * Created by yangqihua on 2017/11/25.
 */

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params {}
 * @param headers
 * @returns {Promise}
 */
class HTTPUtil {
	static promiseGet(url, params, headers) {
		if (params) {
			let paramsArray = [];
			Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
			if (url.search(/\?/) === -1) {
				url += '?' + paramsArray.join('&')
			} else {
				url += '&' + paramsArray.join('&')
			}
		}
		return new Promise(function (resolve, reject) {
			fetch(url, {
				method: 'GET',
				headers: headers,
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						reject({status: response.status})
					}
				})
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject({status: -1});
				})
		})
	}


	/**
	 * 基于 fetch 封装的 POST请求  FormData 表单数据
	 * @param url
	 * @param requestData
	 * @param headers
	 * @returns {Promise}
	 */
	static promisePost(url, requestData, headers) {
		return new Promise(function (resolve, reject) {
			fetch(url, {
				method: 'POST',
				headers: headers,
				body: requestData,
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						reject({status: response.status})
					}
				})
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject({status: -1});
				})
		})
	}

	static get(url,params={},scb,ecb){
		HTTPUtil.get(url,params,null).then((json) => {
			//处理 请求success
			if (json.code === 200) {
				scb&&scb(json.data)
			}else{
				ecb&&ecb(json);
			}
		},(err)=>{
			ecb&&ecb(err);
		})
	}

	static post(url,params={},scb,ecb){
		HTTPUtil.get(url,params,null).then((json) => {
			//处理 请求success
			if (json.code === 200) {
				scb&&scb(json.data)
			}else{
				ecb&&ecb(json);
			}
		},(err)=>{
			ecb&&ecb(err);
		})
	}
}

export default HTTPUtil;