import Swal from 'sweetalert2'

export function SuccessMessage(message, title, callback) {
    Swal.fire({
        icon: 'success',
        title: title ? title : 'Uspešno',
        text: message,
        showConfirmButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            callback()
        }
    })
}

export function ErrorMessage(message, title, callback) {
    Swal.fire({
        icon: 'error',
        title: title ? title : 'Greška',
        text: message
    }).then((result) => {
        if (result.isConfirmed) {
            callback()
        }
    })
}

export function WarningMessage(message, title) {
    Swal.fire({
        title: title ? title : 'Obaveštenje',
        text: message,
        icon: 'warning',
        showConfirmButton: true
    }).then((result) => {
        if (result.isConfirmed) {

        }
    })
}

export function QuestionMessage(message) {
    Swal.fire(
        message,
        '',
        'question'
    )
}