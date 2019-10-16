const _web_worker = {}

function webWorker(func, data, scripts=[]) {
    if (!window.Worker){
        console.log("Your browser doesn't support web workers.");
        return;
    }

    if (!_web_worker[func]){
        let blob = new Blob([
            (scripts.length==0 ? "" : "importScripts(['" + scripts.join("','") + "'])\n"),
			"_func = " + func.toString() + "\n",
			"onmessage = function(e){postMessage(_func(e.data));}"
		], {
            type: "text/javascript"
        });

        _web_worker[func] = new Worker(window.URL.createObjectURL(blob));
    }    

    return new Promise(function(resolve, reject) {
        let worker = _web_worker[func]
        worker.onmessage = function(e) {
            resolve(e.data);
        }
        worker.postMessage(data);
    });
}