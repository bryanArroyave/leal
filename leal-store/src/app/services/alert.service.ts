/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  notify(message: string, timer = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary',
        cancelButton: 'btn btn-secondary',
      },
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  notifyError(message: string, timer = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary',
        cancelButton: 'btn btn-secondary',
      },
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  success(message = 'Operación completada satisfactoriamente') {
    const swalWithBootstrapButtons = Swal.mixin({});
    swalWithBootstrapButtons.fire('Éxito!', message, 'success');
  }

  async confirm(title: string, message: string, options: any = {}) {
    const alert = await Swal.fire({
      title,
      text: message,
      icon: 'question',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary mr-2',
        cancelButton: 'cox-btn cox-btn--secondary',
      },
      showCancelButton: true,
      confirmButtonText: options.confirm || 'Aceptar',
      cancelButtonText: options.cancel || 'Cancelar',
    });

    return alert.value && alert.dismiss !== Swal.DismissReason.cancel;
  }
}
