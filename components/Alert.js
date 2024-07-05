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
   text: 'Maximo Stock',
  icon: 'error',
  showConfirmButton: false,
  timer: 1000
})
}
export  {showAlert,showError};
