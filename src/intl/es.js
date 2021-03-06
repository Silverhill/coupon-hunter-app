export default {
  commons: {
    greetings: 'Hola, { name }',
    text: 'Este es el primer componente',
    next: 'Siguiente',
    login: 'Iniciar Sesión',
    start: 'Inicio',
    signIn: 'Registrarse',
    createAccount: 'Crear Cuenta',
    logOut: 'Cerrar Sesión',
    cancel: 'Cancelar',
    edit: 'Editar',
    editProfile: 'Editar Perfil',
    viewProfile: 'Ver Perfil',
    name: 'Nombre',
    email: 'Email',
    avatar: 'Imagen de Perfil',
    personalInfo: 'Información Personal',
    done: 'Listo!',
    skip: 'Saltar',
    thanks: 'Gracias',
    pickPhoto: 'Escojer una Foto',
    takePhoto: 'Tomar una Foto',
    updateProfile: 'Actualizar Perfil',

    messages: {
      alert: {
        couponHunted: 'Cupones Capturados!',
        addedToWallet: 'El cupón ha sido agregado a tu wallet correctamente',
        onlyOneCoupon: 'Solo puedes capturar un cupón de esta campaña',
      }
    },

    titles: {
      today: 'Hoy',
    }
  },

  startScreen: {
    signInEmail: 'Ingresa con tu email',
    newAccount: '¿No tienes una cuenta?',
    fbButton: 'Conectate con Facebook',
    twButton: 'Conectate con Twitter',
  },

  loginScreen: {
    loading: 'Iniciando Sesión...',
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
    otherDays: 'Todas las Promociones',
    header: 'Promociones',
    loading: 'Cargando Promociones',
  },

  walletScreen: {
    titlePage: 'Mi Wallet',
    subTitle: 'Mis Promociones',
    loading: 'Cargando mis promociones...',
    emptyStates: {
      hunted: 'Cada vez que obtengas una promoción se guardará aquí en tu wallet, hasta que las puedas reclamar o que la campaña expire.',
      used: 'Cada vez que una promoción se utiliza de manera exitosa se guardara como canjeada en esta sección de tu wallet.',
    },
    tabs: {
      hunted: 'Capturados',
      used: 'Usados',
    }
  },

  notifications: {
    titlePage: 'Notificaciones',
    emptyState: {
      placeholder: 'No tienes notificaciones por el momento',
    },
  },

  profileScene: {
    titlePage: 'Mi Perfil',

    edit: {
      titlePage: 'Editar Perfil',
      updatingProfile: 'Actualizando Perfil...',
    }
  },

  makerProfileScene: {
    titlePage: 'Perfil Maker',
  },

  couponDetailScene: {
    couponAvailable: '{totalCoupons, plural, =0 {Disponibles} one {# Disponible} other {# Disponibles} }',
    termsAndConditions: 'Terminos y Condiciones',
    description: 'Descripción',
    address: 'Dirección',
  },

  component: {
    StepForm: {
      backStep: 'Regresar al paso anterior',
    }
  },

  status: {
    'available': 'Obtener',
    'hunted': 'Capturado',
    'unavailable': 'No Disponible',
    'expired': 'Expirado',
    'redeemed': 'Entregado',
  }
}