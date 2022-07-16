<template>

  <div class="d-flex justify-content-center form">
    <div class="col-md-6 bgbd ">
      <!-- Content goes here -->
      <h1 class="d-flex justify-content-left mb-3 ">Register</h1>
      <form class="col-9" @submit.prevent="register">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="ชื่อ" v-model="firstName" required>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="นามสกุล" v-model="lastName" required>
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="email" required>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password" required>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Confirm Password" v-model="confirmPassword" required>
        </div>
        <div class="button-login fade-in d-flex justify-content-center">
          <input class="btn btn-success formtitle-1 mt-3" type="submit" value="REGISTER" @click="register">
        </div>
      </form>
      <div class="register-button fade-in">
        <h5>Already got account</h5>
        <router-link to="/Login" class="text-decoration-none">
          <h5 class="register-link mt-2">Login</h5>
        </router-link>
      </div>
      <div>
        <h5 class="warn-login">{{ errMsg }}</h5>
      </div>


    </div>
  </div>

</template>

<script>
  import {
    getAuth,
    createUserWithEmailAndPassword,
  } from "firebase/auth"
  import {
    doc,
    setDoc
  } from "firebase/firestore";
  import {
    usersProfileCollection
  } from "@/firebase";
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: '',
        errMsg: ''
      }
    },
    methods: {
      register() {
        function containsNumber(email) {
          return /(\d{8})/.test(email);
        }
        if (this.email.includes("@kmitl.ac.th") && containsNumber(this.email)) {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              setDoc(doc(usersProfileCollection, userCredential.user.uid), {
                firstName: this.firstName,
                lastName: this.lastName,
                roles: 'Student',
                email: this.email,
                userId: userCredential.user.uid
              });
              alert("ลงทะเบียนนักศึกษาเรียบร้อย");
              this.$router.push("/");
            })
        } else if (this.email.includes("@kmitl.ac.th")) {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              setDoc(doc(usersProfileCollection, userCredential.user.uid), {
                firstName: this.firstName,
                lastName: this.lastName,
                roles: 'Teacher',
                email: this.email,
                userId: userCredential.user.uid
              });
              alert("ลงทะเบียนอาจารย์เรียบร้อย");
              this.$router.push("/");
            })

        } else {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
              setDoc(doc(usersProfileCollection, userCredential.user.uid), {
                 firstName: this.firstName,
                  lastName: this.lastName,
                  roles: 'Company',
                  email: this.email,
                  userId: userCredential.user.uid
              });
              alert("ลงทะเบียนบริษัทเรียบร้อย");
              this.$router.push("/");
            })
            .catch((error) => {
              const errorCode = error.code;
              console.log(errorCode);
              const errorMessage = error.message;
              console.log(errorMessage);
              switch (errorCode) {
                case 'auth/email-already-in-use':
                  this.errMsg = "อีเมลล์นี้ถูกใช้ไปแล้ว"
                  break
                case 'auth/invalid-email':
                  this.errMsg = "อีเมลล์ไม่ถูกต้อง"
                  break
                case 'auth/operation-not-allowed':
                  this.errMsg = "ไม่อนุญาตให้ดำเนินการต่อ"
                  break
                case 'auth/weak-password':
                  this.errMsg = "รหัสผ่านง่ายเกินไป"
                  break
                default:
                  alert("มีบางอย่างผิดพลาด")
              }
            });
        }
      }
    }

  }
</script>



<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  div.form {
    display: block;
    text-align: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  form {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    transform: translateY(100px);
    animation: slideUp 1s ease-in-out forwards 0s
  }

  h5 {
    padding: 5px;
    margin: 0 auto;
    display: inline-block;
    justify-content: center;

  }

  .register-link {
    font-size: 1.5rem;
    color: #FF6E30;
    margin: 0;
    font-family: 'Orelega One', cursive;
    transition: all .3s;
  }

  .register-link:hover {
    color: green;
    transition: all .3s;
  }

  .warn-login {
    font-size: 1.5rem;
    color: red;
    margin: 0;
    font-family: 'Orelega One', cursive;
  }

  h1 {
    font-family: 'Orelega One', cursive;
    margin-left: 0.5rem;
    justify-content: center;
    text-align: center;
    margin-bottom: 2rem;
  }

  div.bgbd {
    border-radius: 30px;
    margin: 0;
    justify-content: center;
    background: white;
    border: 0.3rem solid #FF6E30;
    width: 40rem;
    height: 50;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    /* animation: expand 1s ease-in-out forwards */
  }

  input {
    line-height: 28px;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    display: inline-block;
    justify-content: center;

  }

  section.forms {
    margin: 0 auto;
    justify-content: center;
    width: 50rem;
    height: 15rem;
  }


  .formtitle-1 {
    width: 20rem;
    height: 4rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    background-color: white;
    border: 2px solid #FF6E30;
    border-radius: 56px;
    color: black;
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
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 5px 5px;

  }

  .formtitle-1:hover {
    width: 20rem;
    height: 4rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    background-color: #FF6E30;
    border: 2px solid #FF6E30;
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
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 5px 5px;

  }

  .fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 1s;
  }

  /* Animation */
  @keyframes slideIn {
    0% {
      transform: translateX(500px) scale(.2);
    }

    100% {
      transform: translateX(0px) scale(1);
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(200px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes expand {
    0% {
      transform: translateX(1400px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  /* Animation property */
  .wing {
    animation: wiggle 2s linear infinite;
  }

  /* Keyframes */
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

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  button {
    position: absolute;
    left: calc(50% - 3em);
    top: calc(50% - 2em);

    height: 4em;
    width: 7em;

    background: #444;
    background: linear-gradient(top, #555, #333);
    border: none;
    border-top: 3px solid orange;
    border-radius: 0 0 0.2em 0.2em;
    color: #fff;
    font-family: Helvetica, Arial, Sans-serif;
    font-size: 1em;
    transform-origin: 50% 5em;
  }
</style>