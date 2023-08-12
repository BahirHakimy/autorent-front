import { useSelector } from 'react-redux';
import Toast from './Toast';

function ToastContainer() {
  const toast = useSelector((state) => state.toast);
  return (
    <div>
      {toast.toasts.map((message) => (
        <Toast key={message} message={message} />
      ))}
    </div>
  );
}

export default ToastContainer;
