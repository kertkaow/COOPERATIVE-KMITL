<template>
  <div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-md-6 bgbd">
      <!-- แบบ Forms -->
      <h1 class="d-flex justify-content-center formtitle-1">Profile</h1>
      <form>
        <div class="form-group">
          <label for="thaiName">ชื่อ</label>
          <input type="text" class="form-control" v-model="userProfile.firstName" disabled>
        </div>
        <div class="form-group">
          <label for="engName">นามสกุล</label>
          <input type="text" class="form-control" v-model="userProfile.lastName" disabled>
        </div>
        <div class="form-group">
          <label for="address">Email</label>
          <input type="text" class="form-control" v-model="userProfile.email" disabled>
        </div>
        <div class="form-group">
          <label for="email">Status</label>
          <input type="email" class="form-control" v-model="userProfile.roles" disabled>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "./LoadingComponent.vue"
  export default {
    components: {
      // ExportComponent,
      LoadingComponent
    },
    data() {
      return {
        loading:true,
        userDoc: '',
        userProfile: {
          firstName: '',
          lastName: '',
          email: '',
          roles: '',
        },
        userId: ''
      }
    },
    methods: {
      async getUserData() {
        this.userProfile.firstName = sessionStorage.getItem("userFirstName")
        this.userProfile.lastName = sessionStorage.getItem("userLastName")
        this.userProfile.email = sessionStorage.getItem("userEmail")
        this.userProfile.roles = sessionStorage.getItem("userRole")
      },
      settimeOut() {
        if(this.userProfile.firstName === '') {
        setTimeout(() => {
          this.loading = false;
        }, "1000")
        }
        else if(this.userProfile.firstName !== null) {
          this.$router.push('/')
        }
      },
    },
    async created() {
      this.settimeOut();
      this.getUserData();
    }
  }
</script>
<script setup>
  import {
    onMounted,
    ref
  } from 'vue' // used for conditional rendering
  import {
    getAuth,
    onAuthStateChanged
  } from "firebase/auth"


  const isLoggedIn = ref(false);
  let auth
  onMounted(() => {
    auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    })
  })
</script>


<style scoped>
  .student-form,
  .company-form {
    font-weight: bolder;
  }

  .student-form {
    animation: expandLeft 0.5s ease-in-out forwards 0s;
  }

  .company-form {
    animation: expandRight 0.5s ease-in-out forwards 0s;
  }

  div#border {
    border-radius: 30px;

    border: 3px solid #FF6E30;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    background: white;
  }

  h5 {
    text-align: center;
    margin-top: 8rem;
    margin-bottom: 2rem;

  }

  div.bgbd {
    border-radius: 30px;
    background: white;
    border: 0.3rem solid #FF6E30;
    width: 40rem;
    height: 30rem;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    animation: expand 0.5s ease-in-out forwards 0s;

  }

  .button-71 {
    margin: 0 auto;
    background-color: #FF6E30;
    border: 0;
    border-radius: 56px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 600;
    outline: 0;
    padding: 16px 21px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    animation: wiggle
  }

  .button-71:before {
    background-color: initial;
    background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
    border-radius: 125px;
    content: "";
    height: 50%;
    left: 4%;
    opacity: .5;
    position: absolute;
    top: 0;
    transition: all .3s;
    width: 92%;
  }

  .button-71:hover {
    box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
    transform: scale(1.05);
  }

  .formtitle-1 {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    background-color: #FF6E30;
    border: 0;
    border-radius: 56px;
    color: #fff;
    display: inline-block;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 600;
    outline: 0;
    padding: 16px 21px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
  }

  .formtitle-1:before {
    background-color: initial;
    background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
    border-radius: 125px;
    content: "";
    height: 50%;
    left: 4%;
    opacity: .5;
    position: absolute;
    top: 0;
    transition: all .3s;
    width: 92%;
  }

  @media (min-width: 768px) {
    .button-71 {
      padding: 16px 48px;
    }
  }

  @keyframes expandLeft {
    0% {
      transform: translateX(-500px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  @keyframes expandRight {
    0% {
      transform: translateX(500px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  /* .wing {
  animation: wiggle 2s linear infinite;
} */
  @keyframes wiggle {

    0%,
    7% {
      transform: rotateZ(0);
    }

    15% {
      transform: rotateZ(-15deg);
    }

    20% {
      transform: rotateZ(10deg);
    }

    25% {
      transform: rotateZ(-10deg);
    }

    30% {
      transform: rotateZ(6deg);
    }

    35% {
      transform: rotateZ(-4deg);
    }

    40%,
    100% {
      transform: rotateZ(0);
    }
  }
</style>