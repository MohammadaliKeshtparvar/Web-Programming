
const ModalManager = {
	_modal: null,
	_show: false,

	register(modal) {
		this._modal = modal;
	},

	unregister() {
		this._modal = null;
	},

	show(newState) {
		this._modal.push(newState);
	},

	hide(number) {
		this._modal.pop(number);
	},

	replace(newState) {
		this._modal.push(newState, true);
	},
};

export default ModalManager;
