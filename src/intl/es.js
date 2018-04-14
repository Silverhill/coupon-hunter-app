export default {
  commons: {
    welcome: 'Hola',
    text: 'Este es el primer componente',
    next: 'Siguiente',
    login: 'Iniciar Sesión',
    start: 'Inicio',
    signIn: 'Registrarse',
    createAccount: 'Crear Cuenta',
    logOut: 'Cerrar Sesión',

    messages: {

      alert: {
        couponHunted: 'Cupones Capturados!',
        onlyOneCoupon: 'Solo puedes capturar un cupón de esta campaña',
      }
    }
  },

  startScreen: {
    signInEmail: 'Ingresa con tu email',
    newAccount: '¿No tienes una cuenta?',
    fbButton: 'Conectate con Facebook',
    twButton: 'Conectate con Twitter',
  },

  loginScreen: {
    form: {
      fields: {
        email: {
          title: 'Escribe la dirección de email',
          message: 'Para acceder necesitas la dirección de email con la que te registraste',
        },
        password: {
          title: 'Escribe tu contraseña',
          message: 'Inicia sesión con tu contraseña de Coupon',
          placeholder: 'Tu contraseña super segura',
        }
      }
    }
  },

  registerScreen: {
    form: {
      fields: {
        email: {
          title: 'Escribe una dirección de email',
          message: 'Necesitas registar una dirección de correo electronico para acceder más tarde a tu cuenta'
        },
        name: {
          title: '¿Cual es tu nombre?',
          message: 'Dinos cual es tu nombre completo'
        },
        password: {
          title: 'Ingresa tu contraseña',
          message: 'Crea una contraseña segura para tu cuenta',
          placeholder: 'Contraseña super segura',
        },
      }
    }
  },

  todayScreen: {
    otherDays: 'Días Anteriores',
    today: 'Hoy',
  },

  walletScreen: {
    titlePage: 'Mi Wallet'
  },

  component: {
    StepForm: {
      backStep: 'Volver al paso anterior',
    }
  },

  status: {
    'available': 'Disponible',
    'hunted': 'Cazado',
    'unavailable': 'No Disponible',
    'expired': 'Expirado',
  }
}