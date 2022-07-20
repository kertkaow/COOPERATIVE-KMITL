
import { createRouter, createWebHistory } from 'vue-router'
import {getAuth ,onAuthStateChanged} from "firebase/auth"


const router = createRouter({
  history: createWebHistory(),
  routes:[
    {path:"/",component:()=>import("../views/HomeView.vue")},
    {path:"/login",component:()=>import("../views/LoginandRegister/LoginView.vue")},
    {path:"/register",component:()=>import("../views/LoginandRegister/RegisterPage.vue")},
   
   
    {path:"/ExportComponent/",
    component:()=>import("../views/ExportComponent.vue"),
    meta:{
      requiresAuth:true,
    } },
    //Company
    {path:"/createcompany",
    component:()=>import("../views/Company/CreatecompanyView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/showprojectcom",
    component:()=>import("../views/Company/ShowprojectcomView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/EditCompany/:companyDataId",
    component:()=>import("../views/Company/EditCompanyView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/CompanyDetails/:companyDataId",
    component:()=>import("../views/Company/ViewDetailsCompany.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/CreateFileCompany/:companyDataId",
    component:()=>import("../views/Company/CreateFileCompany.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/ShowFileCompany/:companyDataId",
    component:()=>import("../views/Company/ShowFileCompany.vue"),
    meta:{
      requiresAuth:true,
    } },

    //Teacher
    
    {path:"/AdminWatchMemo/:matchingDataId",
    component:()=>import("../views/Teacher/AdminWatchMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/AdminCompany",
    component:()=>import("../views/Teacher/AdminCompany.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/AllCompanyView",
    component:()=>import("../views/Teacher/AllCompanyView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/AllMatchingView",
    component:()=>import("../views/Teacher/AllMatchingView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/AdminStudent",
    component:()=>import("../views/Teacher/AdminStudent.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/AdminMatching",
    component:()=>import("../views/Teacher/AdminMatchingView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/EditMatchingDetails/:matchingDataId",
    component:()=>import("../views/Teacher/EditMatchingDetails.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/TeacherDirectorView",
    component:()=>import("../views/Teacher/TeacherDirectorView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/TeacherMentorView",
    component:()=>import("../views/Teacher/TeacherMentorView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/MatchingDetails/:matchingDataId",
    component:()=>import("../views/Teacher/ViewDetailsMatching.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/AdminEditStudent/:studentDataId",
    component:()=>import("../views/Teacher/AdminEditStudent.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/DirectorUpdateMemo/:matchingDataId",
    component:()=>import("../views/Teacher/DirectorUpdateMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/DirectorWatchMemo/:matchingDataId",
    component:()=>import("../views/Teacher/DirectorWatchMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/MentorUpdateMemo/:matchingDataId",
    component:()=>import("../views/Teacher/MentorUpdateMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/MentorWatchMemo/:matchingDataId",
    component:()=>import("../views/Teacher/MentorWatchMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    //Student
    {path:"/createstudent",
    component:()=>import("../views/Student/CreateStudentView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/MyStudentView",
    component:()=>import("../views/Student/MyStudentView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/EditStudent/:studentDataId",
    component:()=>import("../views/Student/EditStudent.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/StudentDetails/:studentDataId",
    component:()=>import("../views/Student/ViewDetailsStudent.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/Memo",
    component:()=>import("../views/Student/MemoView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/Editmemo/:matchingDataId",
    component:()=>import("../views/Student/EditmemoView.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/StudentUpdateMemo/:matchingDataId",
    component:()=>import("../views/Student/StudentUpdateMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    {path:"/StudentWatchMemo/:matchingDataId",
    component:()=>import("../views/Student/StudentWatchMemo.vue"),
    meta:{
      requiresAuth:true,
    } },
    //Public
    {path:"/PublicCompany",
    component:()=>import("../views/Public/PublicCompanyView.vue"),
    meta:{
      requiresAuth:true,
    } },
  ],
})

const getCurrentUser = () =>{
  return new Promise((resolve,reject) =>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user)=>{
      removeListener()
      resolve(user)
    },
    reject
    )
    
  })
}

router.beforeEach(async (to,from,next)=>{
  if(to.matched.some((record)=>record.meta.requiresAuth)){
    if (await getCurrentUser()){
      next()
    }else{
      this.$toast.success("คุณไม่มีสิทธิ์เข้าถึง", {
        timeout: 2500,
        position:'top-right',
      })
      next("/")
    }
  }else{
    next()
  }
})

export default router
