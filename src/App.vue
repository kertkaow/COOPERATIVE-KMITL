<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar-container" style="background-color: #FF6E30" >
      <a href="https://www.kmitl.ac.th/"><img src="https://www.kmitl.ac.th/themes/custom/kmitl/logo.svg" class="Kmitl-Logo"></a>
       <div class="container">
          <div v-if="this.userProfile.roles == 'Student' " class="row">
            <div class="col col-12 d-flex justify-content-end">
                  <router-link to="/ProjectView" v-show="isLoggedIn === true" class="nav-list">รายชื่อโครงการ</router-link>  
                <router-link to="/MyStudentView" v-show="isLoggedIn === true" class="nav-list">ดูข้อมูลลงทะเบียนนสหกิจ</router-link>   
                <router-link to="/Memo" v-show="isLoggedIn === true" class="nav-list">สหกิจของฉัน</router-link>  
          </div>
          </div>
          <div v-else-if="this.userProfile.roles == 'Teacher'" class="row">
          <div class="col col-12 d-flex justify-content-end">
                <router-link to="/AdminCompany" v-show="isLoggedIn === true" class="nav-list" >จัดการข้อมูลสหกิจ</router-link>   
                <router-link to="/AllMatchingView" v-show="isLoggedIn === true" class="nav-list" >โครงการสหกิจ</router-link>         
                </div>
          </div>
          <div v-else-if="this.userProfile.roles == 'Company'" class="nav-items">
                <router-link to="/createcompany" v-show="isLoggedIn === true" class="nav-list" >แบบฟอร์มบริษัท</router-link>     
                <router-link to="/showprojectcom" v-show="isLoggedIn === true" class="nav-list" >ดูข้อมูลโครงการสหกิจของฉัน</router-link>
          </div>
       </div>
       <div v-if="isLoggedIn === true" class="logIn-logOut-Position col col-1">
       <button class="logOut-button-pushable" role="button" @click="handleSignOut">
  <span class="logOut-button-shadow"></span>
  <span class="logOut-button-edge"></span>
  <span class="logOut-button-front text d-flex justify-content-center">
    LogOut
  </span>
  </button>
      </div>
      <div v-else class="logIn-logOut-Position">
  <button class="logIn-button-pushable" role="button"><router-link to="/Login" class="text-decoration-none">
  <span class="logIn-button-shadow"></span>
  <span class="logIn-button-edge"></span>
  <span class="logIn-button-front d-flex justify-content-center">
    LogIn
  </span>
  </router-link>
  </button>
  </div>
    </nav>
    <!-- Router view -->
    <div class="router">
       <router-view></router-view>
    </div>
  </div>
</template>


<script>
import {onMounted, ref } from 'vue'
import {getAuth , onAuthStateChanged ,signOut } from "firebase/auth"
import { useRouter } from 'vue-router';
import { usersProfileCollection } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
export default {
    data(){
        return{ 
                userDoc:'',
                userProfile:{
                  firstName:'',
                  lastName:'',
                  email:'',
                  roles:'',
                },
                userId:''
      }
    },
    mounted(){
      this.getUserData();
    },
    methods: {
      async getUserData() {
            let userId = sessionStorage.getItem("userId");
            let userRef = doc(usersProfileCollection, userId);
            this.userDoc = userRef;
            let userProfile = await getDoc(this.userDoc);
            let userData = userProfile.data();
            sessionStorage.setItem("userFirstName", userData.firstName);
            sessionStorage.setItem("userLastName", userData.lastName);
            sessionStorage.setItem("userEmail", userData.email);
            sessionStorage.setItem("userRole", userData.roles);
            this.userProfile.firstName = sessionStorage.getItem("userFirstName");
            this.userProfile.lastName = sessionStorage.getItem("userLastName");
            this.userProfile.email = sessionStorage.getItem("userEmail");
            this.userProfile.roles = sessionStorage.getItem("userRole");
},
    },
    async created() {
    }
}
</script>

<script setup>
const router = useRouter()
const isLoggedIn = ref(false);
let auth
onMounted(()=>{
  auth = getAuth()
  onAuthStateChanged(auth,(user)=>{
    if(user){
      isLoggedIn.value = true
    }else{
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () =>{
  if (window.confirm("ต้องการออกจากระบบใช่หรือไม่?")) {
  signOut(auth).then(()=>{
    sessionStorage.clear();
    router.push("/Login");
     this.$toast.success("ออกจากระบบสำเร็จ", {
                  timeout: 2500,
                })
  }
  )
  }
  return{
    handleSignOut
  }
}


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Orelega+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Prompt:wght@300&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navbar-container {
  width:100%;
  display: flex;
  height: 10vh;
  align-items: center;

}

.nav-items {
  display: flex;
  justify-content: right;
  margin-right: -15vh;
  column-gap: 10px;

}

.nav-list {
  border-radius:10px ;
  align-items: center;
  height: 20px;
  display: flex;
  padding: 20px;
  color: white;
  text-decoration: none;
  transition: 0.3s;
}

.nav-list:hover {
  justify-content: right;
  border: 0px;
  height: 20px;
  color: black;
  border-radius:10px ;
  background: red;
  color: black;
  padding: 20px;
  color: white;
  text-decoration: none;
}
.nav-list:focus {
  justify-content: right;
  border: 0px;
  height: 20px;
  color: black;
  border-radius:10px ;
  background: red;
  color: black;
  padding: 20px;
  color: white;
  text-decoration: none;
}

.router {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  width:100%;
  height: 100%;
}

.Kmitl-Logo {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 50%;
  margin-left: 2vh;
}
h4 {
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Orelega One', cursive;
}

.logIn-logOut-Position {
  margin-top: 0;
  justify-content: center;
}
.logOut-button-pushable {
  width:5rem;
  height: 2rem;
  float: right;
  margin-top: 3px;
  margin-right: 0.5rem;
  margin-bottom: auto;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.logOut-button-shadow {
  width:5rem;
  height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

.logOut-button-edge {
  width:5rem;
  height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}

.logOut-button-front {
  font-family: 'Prompt', sans-serif;
  align-items: center;
  width:5rem;
  height: 2rem;
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.logOut-button-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.logOut-button-pushable:hover .logOut-button-front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logOut-button-pushable:active .logOut-button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.logOut-button-pushable:hover .logOut-button-shadow {
  transform: translateY(4px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logOut-button-pushable:active .logOut-button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.logOut-button-pushable:focus:not(:focus-visible) {
  outline: none;
}







.logIn-button-pushable {
  width:5rem;
  height: 2rem;
  float: right;
  margin-top: 3px;
  margin-right: 0.5rem;
  margin-bottom: auto;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.logIn-button-shadow {
  width:5rem;
  height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

.logIn-button-edge {
  width:5rem;
  height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    rgb(14, 135, 27) 0%,
    rgb(38, 197, 54) 8%,
    rgba(14, 135, 27) 92%,
    rgb(38, 197, 54) 100%
  );
}

.logIn-button-front {
  font-family: 'Prompt', sans-serif;
  align-items: center;
   width:5rem;
  height: 2rem;
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: #0bc91e;
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.logIn-button-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.logIn-button-pushable:hover .logIn-button-front {
  transform: translateY(-6px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logIn-button-pushable:active .logIn-button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.logIn-button-pushable:hover .logIn-button-shadow {
  transform: translateY(4px);
  transition:
    transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

.logIn-button-pushable:active .logIn-button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.logIn-button-pushable:focus:not(:focus-visible) {
  outline: none;
}

</style>
