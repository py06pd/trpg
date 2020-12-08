export default {
    methods: {
        readFile (evt, callback) {
            let reader = new FileReader();
            let fileObj = evt.target;
            if (fileObj.files && fileObj.files[0]) {
                reader.onload = (evt2) => {
                    if (callback) {
                        callback(evt2.target.result);
                    } else {
                        this.fileOnLoad(evt2.target.result);
                    }
                };
                reader.readAsText(fileObj.files[0]);
            } else {
                return false;
            }

            return true;
        },
    },
};
