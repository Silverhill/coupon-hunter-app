export default {
  commons: {
    greetings: 'Hello, { name }',
    text: 'This is a first component',
    next: 'Next',
    login: 'Login',
    start: 'Start',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    logOut: 'Log Out',
    cancel: 'Cancel',
    edit: 'Edit',
    editProfile: 'Edit Profile',
    viewProfile: 'View Profile',
    name: 'Name',
    email: 'Email',
    avatar: 'Image Profile',
    personalInfo: 'Personal Information',
    done: 'Done',
    skip: 'Skip',
    thanks: 'Thanks',

    messages: {
      alert: {
        couponHunted: 'Coupon Hunted!',
        addedToWallet: 'The coupon has been added to your wallet correctly',
        onlyOneCoupon: 'You can only hunted a coupon for this campaign',
      }
    },

    titles: {
      today: 'Today',
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
    otherDays: 'All Campaigns',
    header: 'Campaign',
  },

  walletScreen: {
    titlePage: 'My Wallet',
    subTitle: 'Mis Hunted Campaigns',
    tabs: {
      hunted: 'Hunted',
      used: 'Used',
    }
  },

  notifications: {
    titlePage: 'Notifications',
  },

  profileScene: {
    titlePage: 'Profile',

    edit: {
      titlePage: 'Edit Profile'
    }
  },

  makerProfileScene: {
    titlePage: 'Maker Profile',
  },

  couponDetailScene: {
    couponAvailable: '{totalCoupons, plural, =0 {Not Available} one {# Available} other {# Available} }',
  },

  component: {
    StepForm: {
      backStep: 'Back to the previous step',
    }
  },

  status: {
    'available': 'Get Coupon',
    'hunted': 'Hunted',
    'unavailable': 'Unavailable',
    'expired': 'Expired',
    'redeemed': 'Redeemed',
  }
}