import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultConfig = {
	position: toast.POSITION.TOP_RIGHT,
	transition: Slide,
	autoClose: 5000,
	bodyClassName: 'custom-toast',
	hideProgressBar: false,
	newestOnTop: false,
	draggable: false,
	pauseOnHover: false,
};

const ToastManager = {

	show(text, type = 'dark', config = {}) {
		switch (type) {
			case 'success':
				toast.success(text, { ...defaultConfig, ...config });
				break;

			case 'error':
				toast.error(text, { ...defaultConfig, ...config });
				break;

			case 'info':
				toast.info(text, { ...defaultConfig, ...config });
				break;

			case 'warning':
				toast.warning(text, { ...defaultConfig, ...config });
				break;

			default:
				toast.dark(text, { ...defaultConfig, ...config });
				break;
		}
	},
};

export default ToastManager;
