export default {
    data () {
        return {
            selected: [],
            selectedItem: null,
        };
    },

    methods: {
        closePopup () {
            this.selectedItem = null;
        },

        handleSelected (itemId) {
            if (this.selected.indexOf(itemId) !== -1) {
                this.selected.splice(this.selected.indexOf(itemId), 1);
            } else {
                this.selected.push(itemId);
            }
        },

        openPopup (itemId, evt) {
            if (itemId === -1 || evt.target.classList.length === 0 || !evt.target.classList.contains('checkbox')) {
                if (itemId > 0) {
                    this.selectedItem = this.items.find(x => x.getId() === itemId);
                } else {
                    this.selectedItem = JSON.parse(JSON.stringify(this.newItem));
                }
            }
        },
    },
};
