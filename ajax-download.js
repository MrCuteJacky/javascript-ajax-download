/**
 * @name HTMLFormElement#ajaxDownload
 * 
 * @param {method} onSuccess: callback on success.
 * @param {method} onError: callback on error.
 * 
 * @description 非同步下載檔案。
 */
HTMLFormElement.prototype.ajaxDownload = function (onSuccess, onError) {
	var request = new XMLHttpRequest();
	request.open(this.method, this.action, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.responseType = "blob";
	request.onload = function (event) {
		if (request.status == 200) {
			var filename = "download.pdf";
			if (navigator.appVersion.toString().indexOf('.NET') > 0) {
				window.navigator.msSaveBlob(request.response, filename);
			} else {
				var a = document.createElement('a');
				a.href = window.URL.createObjectURL(request.response);
				a.download = filename;
				a.click();
			}
			if (onSuccess) {
				onSuccess();
			}
		} else if (onError) {
			onError();
		}
	};
	request.send($(this).serialize());
};
