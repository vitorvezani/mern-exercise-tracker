import { toast } from 'react-toastify';

export function handleError(err) {
  console.error(err)
  if(err?.response?.data?.error) {
    err.response.data.error.forEach(error => {
      toast.error(`Operation failed: ${error}`)
    });
  } else if(err.message) {
    toast.error(`Operation failed: ${err.message}`)
  } else {
    toast.error(`Operation failed: ${err}`)      
  }
}