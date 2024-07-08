import Swal from 'sweetalert2';

const showAlert = (message) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: message ,
    showConfirmButton: false,
    timer: 1200
  });
};
const showError = (message) => {
Swal.fire({
  text: message,
  icon: 'error',
  showConfirmButton: false,
  timer: 1500
})
}
export  {showAlert,showError};
