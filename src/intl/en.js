export default {
  commons: {
    welcome: 'Hello',
    text: 'This is a first component',
    next: 'Next',
    login: 'Login',
    start: 'Start',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    logOut: 'Log Out',

    messages: {

      alert: {
        couponHunted: 'Coupon Hunted!',
        onlyOneCoupon: 'You can only hunted a coupon for this campaign',
      }
    }
  },

  startScreen: {
    signInEmail: 'Login with your email',
    newAccount: 'You do not have an account? ',
    fbButton: 'Connect with Facebook',
    twButton: 'Connect with Twitter',
  },

  loginScreen: {
    form: {
      fields: {
        email: {
          title: 'Enter an email address',
          message: 'To access you need write your email address with which you registered',
        },
        password: {
          title: 'Enter your password',
          message: 'Login with your Coupon password',
          placeholder: 'Your super secure password',
        }
      }
    }
  },

  registerScreen: {
    form: {
      fields: {
        email: {
          title: 'Enter an email address',
          message: 'Enter a valid email address to access your account later'
        },
        name: {
          title: 'What is your name',
          message: 'Write the name by which you will be recognized in the application'
        },
        password: {
          title: 'Enter your password',
          message: 'Create a password to keep your account secure',
          placeholder: 'Super secure password',
        },
      }
    }
  },

  todayScreen: {
    otherDays: 'Other Days',
    today: 'Today',
  },

  walletScreen: {
    titlePage: 'My Wallet'
  },

  component: {
    StepForm: {
      backStep: 'Back to the previous step',
    }
  },

  status: {
    'available': 'Available',
    'hunted': 'Hunted',
    'unavailable': 'Unavailable',
    'expired': 'Expired',
  }
}