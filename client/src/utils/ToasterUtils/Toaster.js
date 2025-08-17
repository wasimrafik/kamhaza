let _toastRef = null;

export const setToastRef = (ref) => { _toastRef = ref; };
export const getToastRef = () => _toastRef;

export const showToast = ({ severity = "info", summary = "", detail = "", life = 3000 }) => {
  if (_toastRef && _toastRef.show) {
    _toastRef.show({ severity, summary, detail, life });
  } else {
    // Fallback: console if Toast not mounted yet
    console.log(`[TOAST:${severity}] ${summary} - ${detail}`);
  }
};
 

export const hideToast = () => {
  if (_toastRef && _toastRef.clear) {
    _toastRef.clear();
  }
};