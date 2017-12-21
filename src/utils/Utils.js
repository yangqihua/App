

export default class Utils {
	static splitArr(arr,subArrSize){
		let result = [];
		for(let i=0,len=arr.length;i<len;i+=subArrSize){
			result.push(arr.slice(i,i+subArrSize));
		}
		return result;
	}


	static formatBytes(bytes, decimals) {
		if (bytes === 0) {
			return '0 B';
		}
		const k = 1000;
		const dm = decimals + 1 || 3;
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}


    static objectIsValueEqual(object1, object2) {
        for (let _key in object1) {
            if (object1._key !== object2._key)return false;
        }
        return true;
    }
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(item,items) {
        for (let i = 0, len = items.length; i < len; i++) {
            if (item.id.toString() === items[i]) {
                return true;
            }
        }
        return false;
    }

	static formatDate(ts) {
		let currentTs = new Date().getTime();
		let diffTs = currentTs - ts;

		//year
		let years = diffTs / (365 * 24 * 3600 * 1000);

		if(years >= 1.0) {
			return Math.ceil(years) + '年前';
		}

		//days
		let days = diffTs / (24 * 3600 * 1000);
		if(days >= 1.0) {
			return Math.ceil(days) + '天前';
		}

		//hours
		let hours = diffTs / (3600 * 1000);
		if(hours >= 1.0) {
			return Math.ceil(hours) + '小时前';
		}

		//minutes
		let minutes = diffTs / (60 * 1000);
		if(minutes >= 1.0 ) {
			return Math.ceil(minutes) + '分钟前';
		}

		return '刚刚';

	}


}