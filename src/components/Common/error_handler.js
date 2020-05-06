import { toast } from 'react-toastify';

export function handleError(err) {
  console.error(JSON.stringify(err))
  if(err?.response?.data?.error) {
    if(Array.isArray(err.response.data.error)) {
      err.response.data.error.forEach(error => {
        toast.error(`Operation failed: ${error}`)
      });
    } else if (err.response.data.error.errmsg){
      toast.error(`Operation failed: ${err.response.data.error.errmsg}`)
    } else {
      toast.error(`Operation failed: ${err.response.data.error}`)
    }
    
  } else if(err.message) {
    toast.error(`Operation failed: ${err.message}`)
  } else {
    toast.error(`Operation failed: ${err}`)      
  }
}